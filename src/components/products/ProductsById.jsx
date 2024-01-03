import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Image, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import Rating from "./Rating";
import { addProductsInCart } from "../../features/Cart/cartSlice";
import { useDispatch } from "react-redux";
import { ImCart } from "react-icons/im";
import { SiBitcoincash } from "react-icons/si";
import Loader from "../loader/Loader";
import { Rate } from "antd";

const SingleProduct = () => {
  const [error, setError] = useState({ isError: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function addToCart(item = {}) {
    dispatch(addProductsInCart(item));
  }

  const apiCalling = async () => {
    let config = {
      method: "get",
      url: `https://dummyjson.com/products/${id}`,
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
      setProduct(response?.data);
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
    {/* commenting go back functionality */}
      {/* <Button
        style={{ marginTop: "10px", marginLeft: "10px", background: "#86B6F6" }}
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </Button> */}

      {isLoading ? (
        <div
          style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Loader />
        </div>
      ) : (
        <Container style={{ width: "60%", marginTop: "7%", height: "500px" }}>
          {error.isError && <div style={{ color: "red", textAlign: 'center' }}>Error: {error.message}</div>}
          <Row>
            <Col md={6} style={{ height: "500px" }}>
              <ListGroup>
                <ListGroupItem style={{ height: "400px" }}>
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fluid
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </ListGroupItem>
                <ListGroupItem style={{ height: "100px" }}>
                  <Row style={{ height: "100px" }}>
                    {product?.images?.map((img, index) => (
                      <Col key={index} style={{ height: "100px" }}>
                        <Image
                          src={img}
                          alt={`Product Image ${index + 1}`}
                          fluid
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </Col>
                    ))}
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col md={3} style={{ height: "500px" }}>
              <ListGroup>
                <ListGroupItem style={{ height: "100px" }}>
                  <h3>{product.brand}</h3>
                </ListGroupItem>
                <ListGroupItem style={{ height: "100px" }}>
                  <h5>Rating</h5>
                  {/* <Rating rating={product.rating} /> */}
                  <Rate disabled defaultValue={product.rating} />
                </ListGroupItem>
                <ListGroupItem style={{ height: "250px" }}>
                  <h5>{product.description}</h5>
                </ListGroupItem>

                <ListGroupItem style={{ height: "50px" }}>
                  <h3>Price: ${product.price}</h3>
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col md={3} style={{ height: "500px" }}>
              <ListGroup>
                <ListGroupItem style={{ height: "100px" }}>
                  <Row style={{ border: "1px solid" }}>
                    <Col style={{ padding: "5%" }}>Status :</Col>
                    <Col style={{ padding: "5%" }}>{product.stock > 0 ? "In Stock" : "Out of stock"}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem style={{ height: "100px" }}>
                  <Row>
                    <Col>Title :</Col>
                    <Col>{product.title}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem style={{ height: "100px" }}>
                  <Row>
                    <Col>Category :</Col>
                    <Col>{product.category}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem style={{ height: "100px", textAlign: "center", display: "grid", placeItems: "center" }}>
                  <Button
                    className="btn-block"
                    onClick={() => {
                      addToCart({
                        id: product?.id,
                        thumbnail: product?.thumbnail,
                        stockQuantity: product?.stock,
                        title: product?.title,
                        price: product?.price,
                        manipulationPrice: product?.price,
                      });
                    }}
                  >
                    <ImCart /> &nbsp; ADD TO CART
                  </Button>
                </ListGroupItem>

                <ListGroupItem style={{ textAlign: "center", height: "100px", display: "grid", placeItems: "center" }}>
                  <Button
                    className="btn-block"
                    onClick={() => {
                      addToCart({
                        id: product?.id,
                        thumbnail: product?.thumbnail,
                        stockQuantity: product?.stock,
                        title: product?.title,
                        price: product?.price,
                        manipulationPrice: product?.price,
                      });
                    }}
                  >
                    <SiBitcoincash /> &nbsp;BUY NOW
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default SingleProduct;
