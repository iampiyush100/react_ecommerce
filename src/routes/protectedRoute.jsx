import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const ProtectedRoute = () => {
  let signedIn = false;
  const isUserLoggedIn = JSON.parse(localStorage.getItem("token"));
  if (isUserLoggedIn) {
    signedIn = true;
  }
  console.log("signedIn>>>", signedIn);
  return !signedIn ? (
    <Navigate to="/login" />
  ) : (
    <>
      <Navbar signedIn={signedIn} />
      <Outlet />;
    </>
  );
};
export default ProtectedRoute;
