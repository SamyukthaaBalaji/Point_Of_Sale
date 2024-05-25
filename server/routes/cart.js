const express = require("express");
const router = express.Router();
const pool = require("../db");

// Add an item to the cart
router.post("/addtocart", async (req, res) => {
  try {
    const { product_id, product_name, price, image, quantity } = req.body;
    const newCartItem = await pool.query(
      "INSERT INTO cart (product_id, product_name, price, image, quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [product_id, product_name, price, image, quantity]
    );
    res.status(201).json(newCartItem.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get all cart items
router.get("/cartitems", async (req, res) => {
  try {
    const cartItems = await pool.query("SELECT * FROM cart");
    res.json(cartItems.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get a specific cart item by ID
router.get("/cartitem/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await pool.query("SELECT * FROM cart WHERE cart_id = $1", [id]);
    if (cartItem.rows.length === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json(cartItem.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update a specific cart item by ID
router.put("/updatecart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, product_name, price, image, quantity } = req.body;
    const updatedCartItem = await pool.query(
      "UPDATE cart SET product_id = $1, product_name = $2, price = $3, image = $4, quantity = $5 WHERE cart_id = $6 RETURNING *",
      [product_id, product_name, price, image, quantity, id]
    );
    if (updatedCartItem.rows.length === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json(updatedCartItem.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete a specific cart item by ID
router.delete("/delcart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delCartItem = await pool.query("DELETE FROM cart WHERE cart_id = $1 RETURNING *", [id]);
    if (delCartItem.rows.length === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json({ message: "Item deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
