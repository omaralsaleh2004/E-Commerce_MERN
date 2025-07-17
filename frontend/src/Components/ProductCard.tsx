import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCart } from "../Context/Cart/CartContext";
import { useAuth } from "../Context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  price: number;
  image: string;
  _id: string;
}

export default function ProductCard({ _id, image, price, title }: Props) {
  const { addItemToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleAddItemToCart = (id: string) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    addItemToCart(id);
  };
  return (
    <Card>
      <CardMedia sx={{ height: 200 }} image={image} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontSize: "22px" }}
        >
          ${price}
        </Typography>
      </CardContent>
      <CardActions sx={{ pt: "25px" }}>
        <Button
          variant="contained"
          size="medium"
          onClick={() => handleAddItemToCart(_id)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
