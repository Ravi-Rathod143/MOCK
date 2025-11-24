import React from 'react';

export default function ProductList({ products, onAdd }) {
  return (
    <section className="products">
      <h2>Products</h2>
      <div className="grid">
        {products.map(p => (
          <div key={p.id} className="card">
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
            <button onClick={() => onAdd(p.id)}>Add to cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}
