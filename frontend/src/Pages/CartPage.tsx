import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import { useCart } from "../Context/Cart/CartContext";

const CartPage = () => {
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemInCart,
    clearCart,
  } = useCart();

  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      return;
    }
    updateItemInCart(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItemInCart(productId);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4">My Cart</Typography>
        <Button onClick={clearCart} variant="contained">
          Clear Cart
        </Button>
      </Box>
      {cartItems.length ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
          {cartItems.map((item) => (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{
                border: 1,
                borderColor: "#f2f2f2",
                borderRadius: 5,
                padding: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <img width={130} src={item.image} alt="product image" />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h5">{item.title}</Typography>
                  <Typography>
                    {item.quantity} x ${item.unitPrice}
                  </Typography>
                  <Button onClick={() => handleRemoveItem(item.productId)}>
                    Remove Item
                  </Button>
                </Box>
              </Box>
              <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button
                  onClick={() =>
                    handleQuantity(item.productId, item.quantity - 1)
                  }
                >
                  -
                </Button>
                <Button
                  onClick={() =>
                    handleQuantity(item.productId, item.quantity + 1)
                  }
                >
                  +
                </Button>
              </ButtonGroup>
            </Box>
          ))}
          <Box>
            <Typography variant="h4" textAlign={"center"}>
              Total Amount : ${totalAmount}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Typography>
          Cart is empty . Please start shopping and add items first.
        </Typography>
      )}
    </Container>
  );
};

export default CartPage;
