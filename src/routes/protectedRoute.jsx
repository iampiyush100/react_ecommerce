import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ signedIn }) => {
  console.log("signedInsignedInsignedInsignedIn", signedIn);
  return signedIn ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
