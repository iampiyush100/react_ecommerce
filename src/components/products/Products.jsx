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
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(1000);

  const limit = 12;
  const [error, setError] = useState({ isError: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);

  const apiCalling = async () => {
    let config = {
      method: "get",
      url: `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setIsLoading(true);
      setError({
        isError: false,
        message: "",
      });
      const response = await axios.request(config);
      setProducts((prev) => [...prev, ...response?.data?.products]);
      setTotalProducts(response?.data?.total);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError({
        isError: true,
        message: error?.response?.data?.message || "Something went wrong",
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScrolling);
    if (skip + limit <= totalProducts + limit) {
      apiCalling();
    }
    return () => window.removeEventListener("scroll", handleInfiniteScrolling);
  }, [skip]);

  async function handleInfiniteScrolling() {
    try {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setSkip((prev) => prev + limit);
        console.log("skip>>>>", skip);
      }
    } catch (error) {
      setError({
        isError: true,
        message: error?.message || "something went wrong",
      });
    }
  }

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
              <Link to={`/products/${product.id}`} style={{ textDecoration: "none", color: "#FFF" }}>
                Explore
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
      {isLoading && <div style={{ marginTop: "10px", color: "blue" }}>Loading....</div>}
      {error.isError && <div style={{ color: "red", marginTop: "10px" }}>Error: {error.message}</div>}
    </div>
  );
}
