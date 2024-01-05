import React, { useEffect, useState } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Image, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import Popup from '../common/Popup'
import { Link } from "react-router-dom";
import {
  increaseProductsQuantity,
  decreaseProductsQuantity,
  removeProductsInCart,
  clearCart,
  //   calculateInitialState
} from "../../features/Cart/cartSlice";
import { useNavigate } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import { IoBagHandleOutline } from "react-icons/io5";

const Cart = () => {
  const initialStateCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cart, setCart] = useState(initialStateCart);
  const [isVisible, setIsVisible] = useState(false)
  const [currentItem, setCurrentItem] = useState({})
  function handleIncreaseQuantity(item) {
    if (cart.cartItems.length > 0) {
      dispatch(increaseProductsQuantity(item));
    }
  }

  function handleRemoveItemFromCart(item) {
    if (cart.cartItems.length > 0) {
      setIsVisible(true)
      // dispatch(removeProductsInCart(item));
    }
  }


  function handleOnConfirm(item) {
    dispatch(removeProductsInCart(item));
  }


  function handleDecreaseQuantity(item) {
    if (cart.cartItems.length > 0) {
      dispatch(decreaseProductsQuantity(item));
    }
  }

  useEffect(() => {
    setCart(initialStateCart);
  }, [initialStateCart]);


  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "2%" }}>
        <IoBagHandleOutline /> &nbsp; MY CART
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px soli",
        }}
      >
        <Popup isVisible={isVisible} changeIsVisible={() => {setIsVisible(false)}} handleOnConfirm={() => {handleOnConfirm(currentItem); setIsVisible(false)}}/>
        {cart.cartItems.length > 0 ? (
          <>
            <Container style={{ marginTop: "2%" }}>
              <Row style={{ border: "1px solid #D0D3D4", height: "40px", backgroundColor: '#F0F3F4' }}>
                <Col style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>ITEM IMAGE</Col>
                <Col style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>NAME</Col>
                <Col style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>PRICE</Col>
                <Col style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>QUANTITY</Col>
                <Col style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>TOTAL</Col>
                <Col style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>ACTION</Col>

              </Row>
              {cart.cartItems.map((item, index) => (
                <Row
                  key={index}
                  style={{
                    height: "100px",
                    margin: "20px 0px",
                    backgroundColor: "#F4F6F7",
                    border: "1px solid #F4F6F7",
                    borderRadius: "5px",
                  }}
                >
                  <Col style={{ height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fluid
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </Col>
                  <Col style={{ height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {item?.title}
                  </Col>
                  <Col style={{ height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    ${item?.price}
                  </Col>
                  <Col style={{ height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CiCircleMinus
                      style={{ marginRight: "10px", cursor: "pointer" }}
                      onClick={() => handleDecreaseQuantity({ id: item.id, price: item?.price })}
                    />
                    {item.quantity}
                    <CiCirclePlus
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                      onClick={() => handleIncreaseQuantity({ id: item.id, price: item?.price })}
                    />
                  </Col>
                  <Col style={{ height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    ${item?.manipulationPrice}
                  </Col>
                  <Col style={{ height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button onClick={() => {handleRemoveItemFromCart(item); setCurrentItem(item)}}>REMOVE</Button>
                  </Col>
                </Row>
              ))}
              <hr />
              <Row style={{ display: "flex", justifyContent: "center" }}>PRICE DETAILS</Row>
              <hr />
              <Row style={{ marginTop: "10px" }}>
                <Col md={5}>
                  <ListGroup>
                    <ListGroupItem>Price ({cart.cartLength})</ListGroupItem>
                    <ListGroupItem>Discount</ListGroupItem>
                    <ListGroupItem>Delivery</ListGroupItem>
                    <ListGroupItem>Total Amount</ListGroupItem>
                  </ListGroup>
                </Col>
                <Col md={5}>
                  <ListGroup>
                    <ListGroupItem>${cart?.netProductsValueOfCart}</ListGroupItem>
                    <ListGroupItem>${cart?.discount}</ListGroupItem>
                    <ListGroupItem>${cart?.deliveryCharges}</ListGroupItem>
                    <ListGroupItem>${cart?.netProductsValueIncludeOtherCharges}</ListGroupItem>
                  </ListGroup>
                </Col>
                <Col md={2}>
                  <ListGroup>
                    <ListGroupItem>
                      <Button
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                          dispatch(clearCart());
                          navigate('/');
                        }}
                      >
                        Clear Cart
                      </Button>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Button>
                        <Link style={{ textDecoration: "none", color: "#fff" }} to="/check-out">
                          CHECK OUT
                        </Link>
                      </Button>
                    </ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
            </Container>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px soli",
            }}
          >
            <EmptyCart />
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
