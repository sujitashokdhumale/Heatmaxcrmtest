import React, { useState } from 'react';

const productsList = [
  { name: 'T-Shirt - Red M', sku: 'TSH-RD-M', price: 12 },
  { name: 'Mug - White', sku: 'MUG-WHT', price: 5 },
  { name: 'Heat Press Paper - A4', sku: 'PAPER-A4', price: 18 },
];

function App() {
  const [customer, setCustomer] = useState('');
  const [cart, setCart] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const addToCart = (product) => {
    const existing = cart.find(i => i.sku === product.sku);
    if (existing) {
      setCart(cart.map(i => i.sku === product.sku ? { ...i, qty: i.qty + 1 } : i));
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
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Heatmax CRM – Quote Builder</h1>
      <div>
        <label>Customer: </label>
        <input value={customer} onChange={(e) => setCustomer(e.target.value)} />
      </div>
      <h2>Products</h2>
      {productsList.map(p => (
        <div key={p.sku}>
          {p.name} – QAR {p.price}
          <button onClick={() => addToCart(p)} style={{ marginLeft: 10 }}>Add</button>
        </div>
      ))}
      <h2>Quote</h2>
      {cart.map(i => (
        <div key={i.sku}>
          {i.name} – QAR {i.price} ×
          <input type="number" value={i.qty} onChange={(e) => updateQty(i.sku, e.target.value)} style={{ width: 50 }} />
          = QAR {i.qty * i.price}
          <button onClick={() => removeItem(i.sku)} style={{ marginLeft: 10 }}>Remove</button>
        </div>
      ))}
      <h3>Total: QAR {total}</h3>
      <button onClick={downloadPDF} style={{ marginRight: 10 }}>Download Quote (.txt)</button>
      <button onClick={() => setShowPreview(!showPreview)}>Preview WhatsApp Message</button>
      {showPreview && (
        <div style={{ marginTop: 20 }}>
          <textarea rows={8} value={getMessage()} readOnly style={{ width: '100%' }} />
          <button onClick={copyToClipboard}>Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
}

export default App;
