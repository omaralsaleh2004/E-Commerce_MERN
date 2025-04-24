import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  return (
    <Container
      fixed
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <CheckCircleOutline sx={{ color: "green", fontSize: "120px" }} />
      <Typography variant="h4">Thanks for your order.</Typography>
      <Typography>
        We started processing it,and we will get back to you soon
      </Typography>
      <Button onClick={handleHome} variant="contained">
        Go to Home
      </Button>
    </Container>
  );
};

export default OrderSuccessPage;
