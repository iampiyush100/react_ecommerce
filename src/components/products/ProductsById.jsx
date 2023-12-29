import { useState } from "react";
import { useParams } from "react-router-dom";

function ProductsByID() {
  const { id } = useParams();
  console.log("id>>>>", id);
  return <h1>this is subproduct id = {id}</h1>;
}

export default ProductsByID;
