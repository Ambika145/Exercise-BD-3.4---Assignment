const express = require('express');
const { resolve } = require('path');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// Endpoint 1: Add an item to the cart
app.get('/cart/add', (req, res) => {
  const { productId, name, price, quantity } = req.query;
  const newItem = {
    productId: parseInt(productId),
    name,
    price: parseFloat(price),
    quantity: parseInt(quantity),
  };
  cart.push(newItem);
  res.json({ cartItems: cart });
});

// Endpoint 2: Edit quantity of an item in the cart
app.get('/cart/edit', (req, res) => {
  const { productId, quantity } = req.query;
  cart = cart.map((item) =>
    item.productId === parseInt(productId)
      ? { ...item, quantity: parseInt(quantity) }
      : item
  );
  res.json({ cartItems: cart });
});

// Endpoint 3: Delete an item from the cart
app.get('/cart/delete', (req, res) => {
  const { productId } = req.query;
  cart = cart.filter((item) => item.productId !== parseInt(productId));
  res.json({ cartItems: cart });
});

// Endpoint 4: Read items in the cart
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

// Endpoint 5: Calculate total quantity of items in the cart
app.get('/cart/total-quantity', (req, res) => {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  res.json({ totalQuantity });
});

// Endpoint 6: Calculate total price of items in the cart
app.get('/cart/total-price', (req, res) => {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  res.json({ totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
