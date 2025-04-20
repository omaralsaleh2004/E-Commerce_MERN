import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../Context/Auth/AuthContext";
import { useCart } from "../Context/Cart/CartContext";

const CartPage = () => {
  const { cartItems, totalAmount } = useCart();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">My Cart</Typography>
      {cartItems.map((item) => (
        <Box>{item.title}</Box>
      ))}
    </Container>
  );
};

export default CartPage;
