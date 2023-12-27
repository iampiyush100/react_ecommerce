import React from 'react'
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import ResponsiveAppBar from "../components/navbar/Navbar";
import Products from "../components/products/Products";



function Home() {
  return (
    <>
     <ResponsiveAppBar /> <br/>
     <Products/>
    </>
  )
}

export default Home
