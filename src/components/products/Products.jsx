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
import { useDispatch } from "react-redux";
import { addProductsInCart } from "../../features/Cart/cartSlice";

export default function Products() {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  const [error, setError] = useState({ isError: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);

  function addToCart(item = {}) {
    dispatch(addProductsInCart(item));
  }

  const apiCalling = async () => {
    setIsLoading(true);
    let config = {
      method: "get",
      url: " https://dummyjson.com/products?limit=9&skip=10",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.request(config);
      setProducts(response?.data?.products);
      setIsLoading(false);
    } catch (error) {
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
    <>
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
                onClick={() => {
                  addToCart({
                    id: product?.id,
                    stockQuantity: product?.stock,
                    title: product?.title,
                    price: product?.price,
                    finalPrice: product?.price,
                  });
                }}
                variant="solid"
                size="md"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
              >
                {/* <Link  to={`/products/${product.id}`}> Add to cart</Link> */}
                Add to cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {error && <p className="bg-red">{error?.message}</p>}
      {isLoading && <p className="bg-red">lodding....</p>}
    </>
  );
}
