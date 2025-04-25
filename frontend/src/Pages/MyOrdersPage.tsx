import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../Context/Auth/AuthContext";
import { useEffect } from "react";

const MyOrdersPage = () => {
  const { getMyOrders, myOrders } = useAuth();

  useEffect(() => {
    getMyOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(myOrders);
  return (
    <Container
      fixed
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        mb: 4,
      }}
    >
      <Typography variant="h4">My Orders</Typography>
      {myOrders.map(({ address, total, orderItems }) => (
        <Box
          sx={{
            border: 1,
            padding: 2,
            borderRadius: 2,
            borderColor: "gray",
          }}
        >
          <Typography variant="h6">Address:{address}</Typography>
          <Typography variant="h6">Total:{total}</Typography>
          <Typography variant="h6" mt={1}>
            Items:
          </Typography>
          {orderItems.map(({ productTitle , unitPrice , quantity}) => (
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={4}>
              <Typography>{productTitle}</Typography>
              <Typography>${unitPrice} x {quantity}</Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Container>
  );
};

export default MyOrdersPage;
