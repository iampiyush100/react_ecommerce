import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import notFoundImg from "../assets/404.png";

const primary = grey["#FFF"]; // #f44336

export default function Error() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: "white" }}>
        <img src={notFoundImg} alt="404" className="img-fluid" />
      </Typography>
      <Typography variant="h6" style={{ color: "white" }}>
        The page you’re looking for doesn’t exist.
      </Typography>{" "}
      <br />
      <Button variant="contained" onClick={() => navigate("/")}>
        Back Home
      </Button>
    </Box>
  );
}
