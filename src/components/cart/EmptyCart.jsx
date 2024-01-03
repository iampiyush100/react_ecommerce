import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import emptyCart from "../../assets/emptyCart.png";

const primary = grey["#FFF"]; // #f44336

export default function EmptyCart() {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h1" style={{ color: "white" }}>
        <img src={emptyCart} alt="empty-cart" className="img-fluid" />
      </Typography>
      <Typography variant="h6" style={{textAlign: 'center'}}>
      Your cart is empty! <br/><br/>
      <Button variant="contained" onClick={() => navigate("/")}>
        SHOP NOW
      </Button>
      </Typography>
      <br />

    </Box>
  );
}
