import React, { useState } from 'react';

export default function CheckoutModal({ onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function submit(e) {
    e.preventDefault();
    onSubmit({ name, email });
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Checkout</h3>
        <form onSubmit={submit}>
          <label>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} required />
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
          <div className="modal-actions">
            <button type="submit">Place order</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
