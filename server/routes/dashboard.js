const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all products
router.get("/allusers", async (req, res) => {
  try {
    const products = await pool.query("SELECT count(*) FROM users");
    res.json(products.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get a single product by ID
router.get("/allproducts", async (req, res) => {
  try {
    const product = await pool.query("SELECT count(*) FROM products ");

    res.json(product.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Add a new product

router.get("/category-counts", async (req, res) => {
  try {
    const categoryCounts = await pool.query(
      "SELECT category, COUNT(*) as count FROM products GROUP BY category"
    );
    res.json(categoryCounts.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get the total count of categories
router.get("/total-categories", async (req, res) => {
  try {
    const totalCategories = await pool.query(
      "SELECT COUNT(DISTINCT category) as total FROM products"
    );
    res.json(totalCategories.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
