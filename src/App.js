import React, { useState, useEffect } from 'react';

const productList = [
  { name: 'T-Shirt Red M', price: 12, sku: 'TS-RD-M' },
  { name: 'White Mug', price: 5, sku: 'MG-WHT' },
  { name: 'Heat Press Paper A4', price: 18, sku: 'HP-A4' }
];

function App() {
  const [customer, setCustomer] = useState('');
  const [cart, setCart] = useState([]);
  const [quotes, setQuotes] = useState(() => JSON.parse(localStorage.getItem('quotes')) || []);
  const [showPreview, setShowPreview] = useState(false);

  const addProduct = (product) => {
    const exists = cart.find(p => p.sku === product.sku);
    if (exists) {
      setCart(cart.map(p => p.sku === product.sku ? { ...p, qty: p.qty + 1 } : p));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (sku, qty) => {
    setCart(cart.map(p => p.sku === sku ? { ...p, qty: parseInt(qty) || 0 } : p));
  };

  const removeItem = (sku) => {
    setCart(cart.filter(p => p.sku !== sku));
  };

  const total = cart.reduce((sum, p) => sum + p.qty * p.price, 0);
  const quoteID = `EST-${quotes.length + 1}`.padStart(8, '0');

  const getMessage = () => {
    let msg = `Quote ID: ${quoteID}\nCustomer: ${customer}\n\nItems:\n`;
    cart.forEach(p => {
      msg += `${p.name} x${p.qty} = QAR ${p.price * p.qty}\n`;
    });
    msg += `\nTotal: QAR ${total}`;
    return msg;
  };

  const saveQuote = () => {
    const newQuote = {
      id: quoteID,
      customer,
      items: cart,
      total,
      date: new Date().toLocaleString()
    };
    const updatedQuotes = [newQuote, ...quotes];
    localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
    setQuotes(updatedQuotes);
    alert('Quote saved.');
    setCart([]);
    setCustomer('');
  };

  return (
    <div className="container">
      <h1>Heatmax CRM – Step 6</h1>
      <div>
        <label>Customer:</label>
        <input value={customer} onChange={(e) => setCustomer(e.target.value)} />
      </div>
      <h2>Products</h2>
      <div className="grid">
        {productList.map(prod => (
          <div key={prod.sku} className="card">
            <h3>{prod.name}</h3>
            <p>QAR {prod.price}</p>
            <button onClick={() => addProduct(prod)}>Add</button>
          </div>
        ))}
      </div>
      <h2>Quote</h2>
      {cart.map(p => (
        <div key={p.sku} className="cart-item">
          {p.name} – QAR {p.price} ×
          <input type="number" value={p.qty} onChange={(e) => updateQty(p.sku, e.target.value)} />
          = QAR {p.qty * p.price}
          <button onClick={() => removeItem(p.sku)}>Remove</button>
        </div>
      ))}
      <h3>Total: QAR {total}</h3>
      <button onClick={saveQuote}>Save Quote</button>
      <button onClick={() => setShowPreview(!showPreview)}>Preview WhatsApp</button>
      {showPreview && (
        <div>
          <textarea rows="6" value={getMessage()} readOnly style={{ width: '100%' }} />
          <button onClick={() => navigator.clipboard.writeText(getMessage())}>Copy</button>
        </div>
      )}
      <h2>Quote History</h2>
      {quotes.map(q => (
        <div key={q.id}>
          <strong>{q.id}</strong> – {q.customer} – QAR {q.total} – {q.date}
        </div>
      ))}
    </div>
  );
}

export default App;
