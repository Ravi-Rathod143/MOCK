import React from 'react';

export default function CartView({ cart, onRemove, onCheckout }) {
  return (
    <aside className="cart">
      <h2>Cart</h2>
      {cart.items.length === 0 ? <p>Cart is empty</p> : (
        <>
          <ul>
            {cart.items.map(item => (
              <li key={item.id} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                  <div>Qty: {item.qty}</div>
                  <div>Price: ₹{item.price}</div>
                </div>
                <div>
                  <div>Subtotal: ₹{item.qty * item.price}</div>
                  <button onClick={() => onRemove(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">Total: ₹{cart.total}</div>
          <button onClick={onCheckout}>Checkout</button>
        </>
      )}
    </aside>
  );
}
