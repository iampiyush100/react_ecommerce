// import { useEffect, useState } from "react";
// import ResponsiveAppBar from "../navbar/Navbar";

// const Products = () => {

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(user);
//   };

//   const handleChange = (e) => {
//     setUser((prevUser) => ({
//       ...prevUser,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   return <></>;
// };

// export default Products;

import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import axios from "axios";
import { Link } from "react-router-dom";
// import ResponsiveAppBar from "../navbar/Navbar";

export default function Products() {
  const [products, setProducts] = useState([
    {
      id: 11,
      title: "perfume Oil",
      description: "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
      price: 13,
      discountPercentage: 8.4,
      rating: 4.26,
      stock: 65,
      brand: "Impression of Acqua Di Gio",
      category: "fragrances",
      thumbnail: "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/11/1.jpg",
        "https://i.dummyjson.com/data/products/11/2.jpg",
        "https://i.dummyjson.com/data/products/11/3.jpg",
        "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
      ],
    },
  ]);

  const [error, setError] = useState({ isError: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const apiCalling = async () => {
    let config = {
      method: "get",
      url: " https://dummyjson.com/products?limit=90&skip=10",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.request(config);
      console.log({ response });
      setProducts(response?.data?.products);
      setIsLoading(false);
    } catch (error) {
      console.log("error>>>", error);
      setIsLoading(false);
      setError({
        isError: true,
        message: error?.response?.data?.message || "something went wrong",
      });
    }
  };

  useEffect(() => {
    apiCalling();
  }, []);

  return (
    <div
      style={{
        margin: "2% 10%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {products.map((product) => (
        <Card key={product.id} sx={{ width: 320, marginBottom: "20px" }}>
          <div>
            <Typography level="title-lg">{product.title.toUpperCase()}</Typography>
            <Typography level="body-sm">{product.description}</Typography>
            <IconButton
              aria-label="bookmark Bahamas Islands"
              variant="plain"
              color="neutral"
              size="sm"
              sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
            >
              <CiHeart />
            </IconButton>
          </div>
          <AspectRatio minHeight="120px" maxHeight="200px">
            <img src={product.images[0]} srcSet={product.images[0]} loading="lazy" alt="" />
          </AspectRatio>
          <CardContent orientation="horizontal">
            <div>
              <Typography level="body-xs">Total price:</Typography>
              <Typography fontSize="lg" fontWeight="lg">
                ${product.price}
              </Typography>
            </div>
            <Button
              variant="solid"
              size="md"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            >
              <Link style={{ textDecoration: "none", color: "#FFF" }} to={`/products/${product.id}`}>
                Explore
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
