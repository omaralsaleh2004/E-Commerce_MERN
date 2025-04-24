import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useCart } from "../Context/Cart/CartContext";
import { useRef } from "react";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();
  const addressRef = useRef<HTMLInputElement>(null);
  return (
    <Container sx={{ mt: 4, display: "flex", flexDirection: "column", gap:3}}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4">Checkout</Typography>
      </Box>
      <TextField
        fullWidth
        inputRef={addressRef}
        label="Delivery Address"
        name="address"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          border: 1,
          borderColor: "#f2f2f2",
          borderRadius: 5,
          padding: 2,
        }}
      >
        {cartItems.map((item) => (
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            <Box
              width={"100%"}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <img width={100} src={item.image} alt="product image" />
              <Box
                width={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5">{item.title}</Typography>
                <Typography>
                  {item.quantity} x ${item.unitPrice}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
        <Box>
          <Typography variant="body1" sx={{ textAlign: "right" }}>
            Total Amount : ${totalAmount}
          </Typography>
        </Box>
      </Box>
      <Button fullWidth variant="contained">
        Pay Now
      </Button>
    </Container>
  );
};

export default CheckoutPage;
