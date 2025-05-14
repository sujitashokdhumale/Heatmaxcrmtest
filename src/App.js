import React, { useState } from 'react';

const productsList = [
  { name: 'T-Shirt - Red M', sku: 'TSH-RD-M', price: 12 },
  { name: 'Mug - White', sku: 'MUG-WHT', price: 5 },
  { name: 'Heat Press Paper - A4', sku: 'PAPER-A4', price: 18 },
];

function App() {
  const [customer, setCustomer] = useState('');
  const [cart, setCart] = useState([]);

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
    setCart(cart.map(item =>
      item.sku === sku ? { ...item, qty: parseInt(qty) || 0 } : item
    ));
  };

  const removeItem = (sku) => {
    setCart(cart.filter(item => item.sku !== sku));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Heatmax CRM – Step 3</h1>
      <div>
        <label>Customer: </label>
        <input value={customer} onChange={(e) => setCustomer(e.target.value)} />
      </div>
      <hr />
      <h2>Products</h2>
      {productsList.map(product => (
        <div key={product.sku}>
          <strong>{product.name}</strong> – QAR {product.price}
          <button onClick={() => addToCart(product)} style={{ marginLeft: 10 }}>
            Add
          </button>
        </div>
      ))}
      <hr />
      <h2>Quote</h2>
      {cart.map(item => (
        <div key={item.sku}>
          {item.name} – QAR {item.price} ×
          <input
            type="number"
            value={item.qty}
            onChange={(e) => updateQty(item.sku, e.target.value)}
            style={{ width: 50, margin: '0 10px' }}
          />
          = QAR {item.price * item.qty}
          <button onClick={() => removeItem(item.sku)} style={{ marginLeft: 10 }}>
            Remove
          </button>
        </div>
      ))}
      <h3>Total: QAR {total}</h3>
    </div>
  );
}

export default App;
