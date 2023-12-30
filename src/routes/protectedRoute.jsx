import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const ProtectedRoute = () => {
  const isUserLoggedIn = JSON.parse(localStorage.getItem("token"));
  const signedIn = !!isUserLoggedIn; // Simplify the logic to check if user is signed in

  return signedIn ? (
    <>
      <Navbar signedIn={signedIn} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
