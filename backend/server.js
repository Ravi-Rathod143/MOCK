const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

let products = [
  { id: 1, name: 'Basic T-Shirt', price: 399 },
  { id: 2, name: 'Sneakers', price: 2499 },
  { id: 3, name: 'Jeans', price: 1499 },
  { id: 4, name: 'Sunglasses', price: 799 },
  { id: 5, name: 'Cap', price: 299 },
  { id: 6, name: 'Backpack', price: 1999 }
];

let cart = []; // { id, productId, qty }

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/cart', (req, res) => {
  const items = cart.map(c => {
    const p = products.find(x => x.id === c.productId) || {};
    return { id: c.id, productId: c.productId, qty: c.qty, name: p.name, price: p.price || 0 };
  });
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);
  res.json({ items, total });
});

app.post('/api/cart', (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || !qty) return res.status(400).json({ error: 'productId and qty required' });
  const existing = cart.find(c => c.productId === productId);
  if (existing) existing.qty += qty;
  else {
    cart.push({ id: Date.now(), productId, qty });
  }
  res.json({ success: true });
});

app.delete('/api/cart/:id', (req, res) => {
  const id = Number(req.params.id);
  cart = cart.filter(c => c.id !== id);
  res.json({ success: true });
});

app.post('/api/cart/checkout', (req, res) => {
  const { cartItems, name, email } = req.body;
  if (!Array.isArray(cartItems)) return res.status(400).json({ error: 'cartItems required' });
  const total = cartItems.reduce((sum, it) => {
    const p = products.find(x => x.id === it.productId) || { price: 0 };
    return sum + (p.price * (it.qty || 0));
  }, 0);
  const receipt = { name: name || 'Guest', email: email || null, total, timestamp: new Date().toISOString() };
  cart = []; // clear cart
  res.json({ receipt });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Backend running on port', PORT));
