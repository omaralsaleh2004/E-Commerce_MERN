import { Box, Container, Grid } from "@mui/material";
import ProductCard from "../Components/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { BASE_URL } from "../Constants/BaseUrt";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);
        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <Box>Someting went wrong ! , Please try Again !</Box>;
  }

  return (
    <Container sx={{ mt: 2, minWidth: "85%" }}>
      <Grid container spacing={6}>
        {products.map(({ title, image, _id, price }) => (
          <Grid size={{ md: 4 }}>
            <ProductCard title={title} image={image} _id={_id} price={price} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
