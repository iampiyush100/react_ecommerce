import React from 'react'
import { Button } from '@mui/material';
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
    <div>Home</div>
    <Button> <Link to='/products'>open products</Link></Button>
    </>
  )
}

export default Home