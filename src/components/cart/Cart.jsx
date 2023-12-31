import React, { useEffect, useState } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Button from "@mui/joy/Button";
import { Link } from "react-router-dom";

import {
  increaseProductsQuantity,
  decreaseProductsQuantity,
  clearCart,
  //   calculateInitialState
} from "../../features/Cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const initialStateCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cart, setCart] = useState(initialStateCart);
  console.log("cart>>>>", cart);

  function handleIncreaseQuantity(item) {
    if (cart.cartItems.length > 0) {
      dispatch(increaseProductsQuantity(item));
    }
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px soli",
        }}
      >
        <h1>Cart Deaits</h1>

        {cart.cartItems.length > 0 ? (
          <>
            <table
              style={{
                width: "80%",
                marginTop: "20px",
                borderCollapse: "collapse",
                textAlign: "center",
              }}
            >
              <thead>
                <tr>
                  <th>Title</th>
                  <th>quanity</th>
                  <th>Price</th>
                  {/* Add more table headers if needed */}
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>
                      <CiCircleMinus
                        style={{ marginRight: "10px", cursor: "pointer" }}
                        onClick={() => handleDecreaseQuantity({ id: item.id, price: item?.price })}
                      />
                      {item.quantity}
                      <CiCirclePlus
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={() => handleIncreaseQuantity({ id: item.id, price: item?.price })}
                      />
                    </td>
                    <td>${item.price}</td>
                    {/* Add more table cells with corresponding data if needed */}
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className="price-details-container"
              style={{
                marginTop: "100px",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 className="price-details-heading" style={{ color: "#333", marginBottom: "10px" }}>
                PRICE DETAILS
              </h3>
              <div className="price-details-content" style={{ fontSize: "16px", lineHeight: "1.6" }}>
                <p style={{ marginBottom: "8px" }}>
                  Price ({cart?.cartLength} items): ${cart?.price?.worth}
                </p>
                <p style={{ marginBottom: "8px" }}>Discount: -${cart?.discount}</p>
                <p style={{ marginBottom: "8px" }}>Delivery Charges: ${cart?.deliveryCharges}</p>
                <p style={{ marginBottom: "8px" }}>Total Amount: ${cart?.totalAmount}</p>
              </div>
            </div>
            <br /> <br />
            <br />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Button
                style={{ marginRight: "10px" }}
                onClick={() => {
                  dispatch(clearCart());
                  navigate("/");
                }}
              >
                Clear
              </Button>
              <Button>
                <Link style={{ textDecoration: "none", color: "#fff" }} to="/check-out">
                  CHECK OUT
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div>
            <h3>Your cart is empty!</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
