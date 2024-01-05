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
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, ListGroup, ListGroupItem } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import Loader from '../loader/Loader'

export default function Products() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalProducts, setTotalProducts] = useState(1000);

  const limit = 12;
  const [error, setError] = useState({ isError: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);

  const apiCalling = async () => {
    let config = {
      method: "get",
      url: `https://dummyjson.com/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`,
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

  const handleSearch = async (event) => {
    console.log("event?.target?.value????", event?.target?.value);
    setSearchQuery(event?.target?.value);
    setProducts([]);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScrolling);
    if (skip + limit <= totalProducts + limit) {
      apiCalling();
    }
    return () => window.removeEventListener("scroll", handleInfiniteScrolling);
  }, [skip, searchQuery]);

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
        margin: "1% 10%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      <Container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Row style={{ width: "30%", border: '1px solid #176B87', }}>
          <Col md={10}>
            <input
              style={{
                width: "100%", 
                border: 'none',
                outline: "none",
              }}
              type="text"
              placeholder="Search Products..."
              name="searchQuery"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Col>
          <Col md={2}>
            <CiSearch />
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <br />
      {products.map((product, index) => (
        <Card key={product.id} sx={{ width: 320, marginBottom: "20px" }} onClick={() => navigate(`/products/${product.id}`)}>
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
      {/* {isLoading && <div style={{ marginTop: "10px", color: "blue" }}><Loader/></div>} */}
      {isLoading && <div style={{ marginTop: "10px", color: "blue" }}>Loading.....</div>}
      {error.isError && <div style={{ color: "red", marginTop: "10px" }}>Error: {error.message}</div>}
    </div>
  );
}
