import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchCart, addToCart, removeFromCart, checkout } from './api';
import ProductList from './components/ProductList';
import CartView from './components/CartView';
import CheckoutModal from './components/CheckoutModal';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => { loadProducts(); loadCart(); }, []);

  async function loadProducts() {
    const p = await fetchProducts();
    setProducts(p);
  }

  async function loadCart() {
    const c = await fetchCart();
    setCart(c);
  }

  async function handleAdd(productId) {
    await addToCart(productId, 1);
    await loadCart();
  }

  async function handleRemove(cartId) {
    await removeFromCart(cartId);
    await loadCart();
  }

  async function handleCheckout(data) {
    const cartItems = cart.items.map(i => ({ productId: i.productId, qty: i.qty }));
    const res = await checkout(cartItems, data.name, data.email);
    setReceipt(res.receipt);
    setShowCheckout(false);
    await loadCart();
  }

  return (
    <div className="container">
      <header>
        <h1>Vibe Commerce — Mock Cart</h1>
      </header>
      <main>
        <ProductList products={products} onAdd={handleAdd} />
        <CartView cart={cart} onRemove={handleRemove} onCheckout={() => setShowCheckout(true)} />
      </main>

      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} onSubmit={handleCheckout} />}

      {receipt && (
        <div className="receipt">
          <h3>Receipt</h3>
          <p>Name: {receipt.name}</p>
          <p>Total: ₹{receipt.total}</p>
          <p>Time: {new Date(receipt.timestamp).toLocaleString()}</p>
          <button onClick={() => setReceipt(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
