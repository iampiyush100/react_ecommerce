import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Checkout() {
  return (
    <div style={{margin: "10% 20px"}}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
            <div style={{marginLeft: '10%'}}>
            Discount: 10
            Delivery Charges: 10
            Total Amount: : 10
              </div>
            </Item>
          </Grid>
         
          </Grid>
      </Box>
    </div>
  );
}
