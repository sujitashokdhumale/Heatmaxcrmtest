import React, { useState } from 'react';

const productsList = [
  { name: 'T-Shirt - Red M', sku: 'TSH-RD-M', price: 12 },
  { name: 'Mug - White', sku: 'MUG-WHT', price: 5 },
  { name: 'Heat Press Paper - A4', sku: 'PAPER-A4', price: 18 },
  { name: 'T-Shirt - Blue L', sku: 'TSH-BL-L', price: 12 },
  { name: 'Bottle - Black', sku: 'BOTTLE-BLK', price: 8 }
];

function App() {
  const [customer, setCustomer] = useState('');
  const [cart, setCart] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const addToCart = (product) => {
    const exists = cart.find(item => item.sku === product.sku);
    if (exists) {
      setCart(cart.map(item =>
        item.sku === product.sku ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (sku, qty) => {
    setCart(cart.map(i => i.sku === sku ? { ...i, qty: parseInt(qty) || 0 } : i));
  };

  const removeItem = (sku) => {
    setCart(cart.filter(i => i.sku !== sku));
  };

  const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  const getMessage = () => {
    let msg = `Customer: ${customer}\n\nQuote:\n`;
    cart.forEach(item => {
      msg += `${item.name} x${item.qty} = QAR ${item.qty * item.price}\n`;
    });
    msg += `\nTotal: QAR ${total}`;
    return msg;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getMessage());
    alert('Message copied to clipboard');
  };

  const downloadPDF = () => {
    const blob = new Blob([getMessage()], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'quote.txt';
    link.click();
  };

  return (
    <div className="container">
      <h1>Heatmax CRM – Step 5 UI</h1>
      <div className="customer-box">
        <label>Customer: </label>
        <input value={customer} onChange={(e) => setCustomer(e.target.value)} />
      </div>
      <h2>Products</h2>
      <div className="grid">
        {productsList.map(product => (
          <div key={product.sku} className="card">
            <h3>{product.name}</h3>
            <p>QAR {product.price}</p>
            <button onClick={() => addToCart(product)}>Add</button>
          </div>
        ))}
      </div>
      <h2>Quote</h2>
      {cart.map(item => (
        <div key={item.sku} className="quote-line">
          {item.name} – QAR {item.price} ×
          <input
            type="number"
            value={item.qty}
            onChange={(e) => updateQty(item.sku, e.target.value)}
          />
          = QAR {item.qty * item.price}
          <button onClick={() => removeItem(item.sku)}>Remove</button>
        </div>
      ))}
      <h3>Total: QAR {total}</h3>
      <div className="actions">
        <button onClick={downloadPDF}>Download Quote (.txt)</button>
        <button onClick={() => setShowPreview(!showPreview)}>Preview WhatsApp Message</button>
      </div>
      {showPreview && (
        <div className="whatsapp-box">
          <textarea rows={8} value={getMessage()} readOnly />
          <button onClick={copyToClipboard}>Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
}

export default App;
