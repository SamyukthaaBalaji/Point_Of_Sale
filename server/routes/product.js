const express = require("express");
const router = express.Router();
const pool = require("../db");
const multer = require('multer');
const path = require('path');

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('invalid image type');
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    const filename = file.originalname.replace(' ', '-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${filename}-${Date.now()}.${extension}`);
  }
});

const uploadOptions = multer({ storage: storage });

// Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM products");
    res.json(products.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get a single product by ID
router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    if (product.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Add a new product
router.post("/postproduct", uploadOptions.single('image'), async (req, res) => {
    try {
      const { name, brand, description, price, quantity } = req.body;
      const image = req.file ? `/public/uploads/${req.file.filename}` : null;
  
      const newProduct = await pool.query(
        "INSERT INTO products (name, brand, description, price, quantity, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [name, brand, description, price, quantity, image]
      );
  
      res.status(201).json(newProduct.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });
  

// Update a product by ID
router.put("/updateproducts/:id", uploadOptions.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, description, price, quantity } = req.body;
    const image = req.file ? `/public/uploads/${req.file.filename}` : req.body.image;

    const updatedProduct = await pool.query(
      "UPDATE products SET name = $1, brand = $2, description = $3, price = $4, quantity = $5, image = $6 WHERE id = $7 RETURNING *",
      [name, brand, description, price, quantity, image, id]
    );
    if (updatedProduct.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete a product by ID
router.delete("/delproducts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
    if (deletedProduct.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
