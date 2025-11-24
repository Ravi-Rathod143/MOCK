const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function fetchProducts() {
  const res = await fetch(`${API}/api/products`);
  return res.json();
}

export async function fetchCart() {
  const res = await fetch(`${API}/api/cart`);
  return res.json();
}

export async function addToCart(productId, qty = 1) {
  const res = await fetch(`${API}/api/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, qty }),
  });
  return res.json();
}

export async function removeFromCart(id) {
  const res = await fetch(`${API}/api/cart/${id}`, { method: 'DELETE' });
  return res.json();
}

export async function checkout(cartItems, name, email) {
  const res = await fetch(`${API}/api/cart/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cartItems, name, email }),
  });
  return res.json();
}
