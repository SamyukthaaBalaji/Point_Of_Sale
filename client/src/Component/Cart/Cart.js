// import React, { useState, useMemo } from "react";
// import { useAuth } from "../../AuthContext";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Container,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Button,
//   Box,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   DialogContentText,
//   TextField,
//   MenuItem,
// } from "@mui/material";

// const TAX_RATE = 0.1;

// const Cart = () => {
//   const { cart, setCart } = useAuth();
//   const [open, setOpen] = useState(false);
//   const [invoiceOpen, setInvoiceOpen] = useState(false); // State for Invoice Dialog
//   const [customerName, setCustomerName] = useState("");
//   const [customerNumber, setCustomerNumber] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("");

//   const handleDelete = async (itemId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:9000/cart/delcart/${itemId}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       // Remove the item from the cart in the frontend
//       const updatedCart = cart.filter((item) => item.id !== itemId);
//       setCart(updatedCart);
//     } catch (error) {
//       console.error("Error deleting item from cart:", error);
//     }
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = () => {
//     // Handle form submission logic here
//     setInvoiceOpen(true); // Open the Invoice Dialog
//     setOpen(false); // Close the Billing Dialog
//   };

//   const handlePayment = () => {
//     // Handle payment logic here
//     console.log("Payment clicked");
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const subtotal = useMemo(() => {
//     return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   }, [cart]);

//   const tax = useMemo(() => {
//     return subtotal * TAX_RATE;
//   }, [subtotal]);

//   const grandTotal = useMemo(() => {
//     return subtotal + tax;
//   }, [subtotal, tax]);
//   const makePayment = async () => {
//     const stripe = await loadStripe(
//       "pk_test_51PJ61TSGSIFhkOghFlr0Q5mUoiGIuq1T0oXGMzODdE2TyCJ16v0u5apovnUMHKcTJH1ncTtutJqkL2VPREvbJ7No00d8BVflgg"
//     );
//     const body = {
//       products: cart,
//     };
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     const apiURL = "http://localhost:3000";
//     try {
//       const response = await fetch(`create-checkout-session`, {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify(body),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create checkout session");
//       }

//       const session = await response.json();

//       // Redirect to Checkout
//       const result = await stripe.redirectToCheckout({
//         sessionId: session.id,
//       });

//       if (result.error) {
//         throw new Error(result.error.message);
//       }

//       console.log(result);
//     } catch (error) {
//       console.error("Error creating checkout session:", error);
//     }
//   };

//   return (
//     <Container component={Paper} sx={{ mt: 5, position: "relative" }}>
//       <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
//         <Button variant="contained" color="error" onClick={makePayment}>
//           Bill
//         </Button>
//         <Button variant="contained" color="primary" onClick={handlePayment}>
//           Payment
//         </Button>
//       </Box>
//       <Typography variant="h4" gutterBottom>
//         Your Cart
//       </Typography>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <b>Image</b>
//               </TableCell>
//               <TableCell>
//                 <b>Name</b>
//               </TableCell>
//               <TableCell>
//                 <b>Price</b>
//               </TableCell>
//               <TableCell>
//                 <b>Quantity</b>
//               </TableCell>
//               <TableCell>
//                 <b>Total</b>
//               </TableCell>
//               <TableCell>
//                 <b>Delete</b>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {cart.map((item) => (
//               <TableRow key={item.id}>
//                 <TableCell>
//                   <img
//                     src={`http://localhost:9000${item.image}`}
//                     alt={item.name}
//                     style={{ width: "50px" }}
//                   />
//                 </TableCell>
//                 <TableCell>{item.name}</TableCell>
//                 <TableCell>${item.price}</TableCell>
//                 <TableCell>{item.quantity}</TableCell>
//                 <TableCell>${item.price * item.quantity}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="error"
//                     onClick={() => handleDelete(item.id)}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Billing Information</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Please enter customer information and select the payment method.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Customer Name"
//             fullWidth
//             value={customerName}
//             onChange={(e) => setCustomerName(e.target.value)}
//           />
//           <TextField
//             margin="dense"
//             label="Customer Number"
//             fullWidth
//             value={customerNumber}
//             onChange={(e) => setCustomerNumber(e.target.value)}
//           />
//           <TextField
//             select
//             margin="dense"
//             label="Payment Method"
//             fullWidth
//             value={paymentMethod}
//             onChange={(e) => setPaymentMethod(e.target.value)}
//           >
//             <MenuItem value="card">Card</MenuItem>
//             <MenuItem value="cash">Cash</MenuItem>
//           </TextField>
//           <Box mt={2}>
//             <Typography variant="body1" gutterBottom>
//               Date: {new Date().toLocaleDateString()}
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Time: {new Date().toLocaleTimeString()}
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Bank Name: Your Bank Name
//             </Typography>
//           </Box>
//           <Box mt={2}>
//             <Typography variant="h6" gutterBottom>
//               Subtotal: ${subtotal.toFixed(2)}
//             </Typography>
//             <Typography variant="h6" gutterBottom>
//               Tax: ${tax.toFixed(2)}
//             </Typography>
//             <Typography variant="h6" gutterBottom>
//               Grand Total: ${grandTotal.toFixed(2)}
//             </Typography>
//           </Box>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} color="primary">
//             Submit
//           </Button>
//           <Button onClick={handlePrint} color="primary">
//             Print
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };
// export default Cart;
import React, { useState, useMemo, useRef } from "react";
import { useAuth } from "../../AuthContext";
import { loadStripe } from "@stripe/stripe-js";
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
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  MenuItem,
} from "@mui/material";

const TAX_RATE = 0.1; // Example tax rate (10%)

const Cart = () => {
  const { cart, setCart } = useAuth();
  const [open, setOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const receiptRef = useRef();
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(
        `http://localhost:9000/cart/delcart/${itemId}`,
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

  const handleSubmit = () => {
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

    // Open the receipt dialog and close the billing information dialog
    setInvoiceOpen(true);
    setOpen(false);
  };

  const handlePayment = () => {
    setOpen(true);
  };

  const handleBill = () => {
    setCustomerName("");
    setCustomerNumber("");
    setCustomerAddress("");

    setInvoiceOpen(true);
  };

  const handlePrint = () => {
    const printContent = receiptRef.current.innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write("<html><head><title>Print</title>");
    printWindow.document.write(
      "<style>@media print {body { -webkit-print-color-adjust: exact; }}</style>"
    );
    printWindow.document.write("</head><body >");
    printWindow.document.write(printContent);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const makePayment = async () => {
    // Handle payment logic here
    console.log("Payment clicked");
  };

  return (
    <Container component={Paper} sx={{ mt: 5, position: "relative" }}>
      <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
        <Button variant="contained" color="error" onClick={handleBill}>
          Bill
        </Button>
        <Button variant="contained" color="primary" onClick={handlePayment}>
          Payment
        </Button>
      </Box>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <TableContainer>
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
                    src={`http://localhost:9000${item.image}`}
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

      <Dialog open={open} onClose={handleClose}>
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

      <Dialog open={invoiceOpen} onClose={() => setInvoiceOpen(false)}>
        <DialogTitle>Receipt</DialogTitle>
        <DialogContent>
          <div ref={receiptRef}>
            <Typography variant="h6">Customer Information:</Typography>
            <Typography>Name: {customerName}</Typography>
            <Typography>Number: {customerNumber}</Typography>
            <Typography>Address: {customerAddress}</Typography>
            <Typography variant="h6">Total:</Typography>
            <Typography>Subtotal: ${subtotal.toFixed(2)}</Typography>
            <Typography>Tax: ${tax.toFixed(2)}</Typography>
            <Typography>Grand Total: ${grandTotal.toFixed(2)}</Typography>
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
