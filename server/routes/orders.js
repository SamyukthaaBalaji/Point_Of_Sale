const express = require("express");
const router = express.Router();
const pool = require("../db");
router.post("/create", async (req, res) => {
  const {
    customerName,
    customerNumber,
    customerAddress,
    paymentMethod,
    cart,
    subtotal,
    tax,
    grandTotal,
  } = req.body;

  // Extract product details
  const productNames = cart.map((item) => item.name);
  const quantities = cart.map((item) => item.quantity);
  const prices = cart.map((item) => item.price);

  try {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const insertOrderQuery = `
        INSERT INTO orders (
          customer_name, customer_number, customer_address, payment_method,
          subtotal, tax, grand_total, product_names, quantities, prices
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id
      `;
      const result = await client.query(insertOrderQuery, [
        customerName,
        customerNumber,
        customerAddress,
        paymentMethod,
        subtotal,
        tax,
        grandTotal,
        productNames,
        quantities,
        prices,
      ]);

      await client.query("COMMIT");
      res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Error creating order" });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection error" });
  }
});
module.exports = router;
