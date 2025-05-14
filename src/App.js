import React, { useState } from 'react';

function App() {
  const [customer, setCustomer] = useState('');
  const [products, setProducts] = useState([{ name: 'T-Shirt', price: 12, qty: 1 }]);

  const handleQtyChange = (index, value) => {
    const updated = [...products];
    updated[index].qty = parseInt(value) || 0;
    setProducts(updated);
  };

  const total = products.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <div style={{ padding: 20 }}>
      <h1>Heatmax CRM - Quote Builder</h1>
      <div>
        <label>Customer: </label>
        <input value={customer} onChange={(e) => setCustomer(e.target.value)} />
      </div>
      <div>
        <h2>Products</h2>
        {products.map((p, i) => (
          <div key={i}>
            {p.name} – QAR {p.price} ×
            <input
              type="number"
              value={p.qty}
              onChange={(e) => handleQtyChange(i, e.target.value)}
              style={{ width: 50, marginLeft: 10 }}
            />
          </div>
        ))}
      </div>
      <h3>Total: QAR {total}</h3>
    </div>
  );
}

export default App;
