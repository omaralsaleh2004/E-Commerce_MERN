import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Constants/BaseUrt";
import { useAuth } from "../Context/Auth/AuthContext";
import { useCart } from "../Context/Cart/CartContext";

const CartPage = () => {
  const { cartItems, totalAmount } = useCart();
  const [error, setError] = useState("");
  const { token } = useAuth();

  // useEffect(() => {
  //   if (!token) {
  //     return;
  //   }
  //   const fetchCart = async () => {
  //     const response = await fetch(`${BASE_URL}/cart`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (!response.ok) {
  //       setError("Failed to fetch user cart !");
  //     }
  //     const data = await response.json();
  //     setCart(data);
  //   };
  //   fetchCart();
  // }, [token]);

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
