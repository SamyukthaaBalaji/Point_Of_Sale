import React, { useState, useRef } from "react";
import { useAuth } from "../../AuthContext";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import "./cart.css"; // Import custom styles

const TAX_RATE = 0.1; // Example tax rate (10%)

const Cart = () => {
  const { cart, setCart } = useAuth();
  const [open, setOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const receiptRef = useRef();
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(
        `https://posapp1-hg6w-kpues2kdx-samyukthaas-projects.vercel.app/cart/delcart/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Remove the item from the cart in the frontend
      const updatedCart = cart.filter((item) => item.id !== itemId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    // Calculate subtotal, tax, and grand total
    const subTotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const taxAmount = subTotal * TAX_RATE;
    const grandTotalAmount = subTotal + taxAmount;

    setSubtotal(subTotal);
    setTax(taxAmount);
    setGrandTotal(grandTotalAmount);

    // Prepare order data
    const orderData = {
      customerName,
      customerNumber,
      customerAddress,
      paymentMethod,
      cart,
      subtotal: subTotal,
      tax: taxAmount,
      grandTotal: grandTotalAmount,
    };

    try {
      const response = await fetch(
        "https://posapp1-hg6w-kpues2kdx-samyukthaas-projects.vercel.app/order/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle response (e.g., show a success message, clear the cart, etc.)
      console.log("Order created successfully");
    } catch (error) {
      console.error("Error creating order:", error);
    }

    // Open the receipt dialog and close the billing information dialog
    setInvoiceOpen(true);
    setOpen(false);
  };

  const handlePrint = () => {
    const printContent = receiptRef.current.innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write("<html><head><title>Print</title>");
    printWindow.document.write(
      "<style>@media print {body { -webkit-print-color-adjust: exact; }}</style>"
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write(printContent);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <Container className="mt-5">
      <div className="fixed-bottom mb-4 mr-4">
        <Button variant="contained" color="error" onClick={handleClickOpen}>
          Payment
        </Button>
      </div>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Image</b>
              </TableCell>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Price</b>
              </TableCell>
              <TableCell>
                <b>Quantity</b>
              </TableCell>
              <TableCell>
                <b>Total</b>
              </TableCell>
              <TableCell>
                <b>Delete</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img
                    src={`https://posapp1-hg6w-kpues2kdx-samyukthaas-projects.vercel.app${item.image}`}
                    alt={item.name}
                    style={{ width: "50px" }}
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.price * item.quantity}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Billing Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter customer information.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Customer Name"
            fullWidth
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Customer Number"
            fullWidth
            value={customerNumber}
            onChange={(e) => setCustomerNumber(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Customer Address"
            fullWidth
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Payment Method</InputLabel>
            <Select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value="card">Card</MenuItem>
              <MenuItem value="cash">Cash</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={invoiceOpen}
        onClose={() => setInvoiceOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Receipt</DialogTitle>
        <DialogContent>
          <div ref={receiptRef}>
            <Typography variant="h6">Customer Information:</Typography>
            <Typography>Name: {customerName}</Typography>
            <Typography>Number: {customerNumber}</Typography>
            <Typography>Address: {customerAddress}</Typography>
            <Typography>Payment Method: {paymentMethod}</Typography>
            <Typography variant="h6">Order Details:</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Product</b>
                  </TableCell>
                  <TableCell>
                    <b>Quantity</b>
                  </TableCell>
                  <TableCell>
                    <b>Price</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography>Subtotal: ${subtotal.toFixed(2)}</Typography>
            <Typography>Tax: ${tax.toFixed(2)}</Typography>
            <Typography>Grand Total: ${grandTotal.toFixed(2)}</Typography>
            <Typography>Date: {currentDate}</Typography>
            <Typography>Time: {currentTime}</Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInvoiceOpen(false)} color="primary">
            Close
          </Button>
          <Button onClick={handlePrint} color="primary">
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;
