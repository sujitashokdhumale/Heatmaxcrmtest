import React, { useState } from 'react';
import './styles.css';

const products = [
  { sku: 'TSH-RED-M', name: 'T-Shirt Red M', price: 12 },
  { sku: 'MUG-WHT', name: 'White Mug', price: 5 },
  { sku: 'PAPER-A4', name: 'Heat Press Paper A4', price: 18 }
];

export default function App() {
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

  const getMessage = () => {
    let msg = `Customer: ${customer}\n\nQuote:\n`;
    cart.forEach(item => {
      msg += `${item.name} x${item.qty} = QAR ${item.qty * item.price}\n`;
    });
    msg += `\nTotal: QAR ${cart.reduce((sum, i) => sum + i.qty * i.price, 0)}`;
    return msg;
  };

  const downloadPDF = () => {
    const blob = new Blob([getMessage()], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'quote.txt';
    link.click();
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Heatmax</h2>
        <ul>
          <li>Dashboard</li>
          <li>New Quote</li>
          <li>Quote History</li>
        </ul>
      </aside>
      <div className="main">
        <header className="topbar">
          <h1>New Quote</h1>
        </header>
        <div className="content">
          <div className="quote-header">
            <label>Customer:</label>
            <input value={customer} onChange={(e) => setCustomer(e.target.value)} />
          </div>
          <div className="product-grid">
            {products.map(p => (
              <div className="product-card" key={p.sku}>
                <h3>{p.name}</h3>
                <p>QAR {p.price}</p>
                <button onClick={() => addToCart(p)}>Add</button>
              </div>
            ))}
          </div>
          <div className="quote-cart">
            <h2>Quote Cart</h2>
            {cart.map(item => (
              <div key={item.sku}>
                {item.name} × {item.qty} = QAR {item.qty * item.price}
              </div>
            ))}
            <h3>Total: QAR {cart.reduce((sum, i) => sum + i.qty * i.price, 0)}</h3>
            <button onClick={downloadPDF}>Download PDF</button>
            <button onClick={() => setShowPreview(!showPreview)}>Copy to WhatsApp</button>
            {showPreview && (
              <div>
                <textarea readOnly rows="6" value={getMessage()} />
                <button onClick={() => navigator.clipboard.writeText(getMessage())}>Copy</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
