// import React from "react";
// import {
//   Box,
//   Typography,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
  
// } from "@mui/material";


// const Invoice = ({ open, onClose, cart, subtotal, tax, grandTotal, customerName, customerNumber, paymentMethod }) => {
//   const currentDate = new Date();

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Invoice</DialogTitle>
//       <DialogContent>
//         <Box id="invoice" sx={{ p: 2 }}>
//           <Typography variant="h4" gutterBottom>
//             Swift Shell
//           </Typography>
//           <Typography variant="subtitle1" gutterBottom>
//             {currentDate.toDateString()} {currentDate.toLocaleTimeString()}
//           </Typography>
//           <Typography variant="subtitle1" gutterBottom>
//             Customer Name: {customerName}
//           </Typography>
//           <Typography variant="subtitle1" gutterBottom>
//             Customer Number: {customerNumber}
//           </Typography>
//           <Typography variant="subtitle1" gutterBottom>
//             Payment Method: {paymentMethod}
//           </Typography>
//           <Box mt={2}>
//             <Typography variant="h6" gutterBottom>
//               Purchased Products:
//             </Typography>
//             {cart.map((item) => (
//               <Box key={item.id} display="flex" justifyContent="space-between" my={1}>
//                 <Typography>{item.name}</Typography>
//                 <Typography>{item.quantity} x ${item.price.toFixed(2)}</Typography>
//               </Box>
//             ))}
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
//         </Box>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Close
//         </Button>
//         <Button onClick={handlePrint} color="primary">
//           Print
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default Invoice;
