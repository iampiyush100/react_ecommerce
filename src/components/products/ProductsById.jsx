import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Image, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import Rating from "./Rating";
import { addProductsInCart } from "../../features/Cart/cartSlice";
import { useDispatch } from "react-redux";


function ProductsByID() {
  const [error, setError] = useState({ isError: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();


  function addToCart(item = {}) {
    dispatch(addProductsInCart(item));
  }

  const apiCalling = async () => {
    setIsLoading(true);
    let config = {
      method: "get",
      url: `https://dummyjson.com/products/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setIsLoading(true);
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
      <Container style={{ marginTop: "5%" }}>
        <Row>
          <Col md={6}>
            <ListGroupItem style={{marginTop: '2%'}}>
              <Image src={product.thumbnail} alt={product.title} fluid style={{  width: "100%", height: "100%" }} />
            </ListGroupItem>
            <ListGroupItem style={{marginTop: '5%'}}>
                <Row>
                  {product?.images?.map((img, index) => (
                    <Col key={index}>
                      <Image
                        src={img}
                        alt={`Product Image ${index + 1}`}
                        fluid
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Col>
                  ))}
              </Row>
            </ListGroupItem>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>{product.title}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <h3>{product.description}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating rating={product.rating} />
              </ListGroupItem>
              <ListGroupItem>
                <h3>Price: ${product.price}</h3>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroupItem>
              <Row style={{ border: "1px solid" }}>
                <Col style={{padding: '5%'}}>Status :</Col>
                <Col style={{padding: '5%'}}>{product.stock > 0 ? "In Stock" : "Out of stock"}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem  style={{marginTop: '10%' , textAlign: "center"}}>
              <Button className="btn-block"
               onClick={() => {
                addToCart({
                  id: product?.id,
                  stockQuantity: product?.stock,
                  title: product?.title,
                  price: product?.price,
                  immutablePrice: product?.price,
                });
              }}
              >
             Add to cart
              </Button>
            </ListGroupItem>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductsByID;