import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignIn from "../components/forms/MuiLogin";
import Home from "../pages/Home";
import RegisterationForm from "../components/forms/Register";
import ForgotPassword from "../components/forms/ForgotPassword";
import Products from "../components/products/Products";
import ProductsByID from "../components/products/ProductsById";
import ProtectedRoute from "./protectedRoute";
import PageNotFound from "../pages/PageNotFound";
import LoginRoute from "./loginRoute";
import Cart from "../components/cart/Cart";
import Checkout from "../components/cart/Checkout";
import ResponsiveAppBar from "../components/navbar/Navbar";

const AppRouter = ({ signedIn }) => {
  return (
    <>
      <Router>
        <ResponsiveAppBar signedIn={signedIn} />
        <Routes>
          <Route exact path="/login" element={signedIn ? <Navigate to="/" /> : <SignIn />} />
          <Route exact path="/register" element={<RegisterationForm />} />
          <Route element={<ProtectedRoute signedIn={signedIn} />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />}></Route>
            <Route path="/products/:id" element={<ProductsByID />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/check-out" element={<Checkout />}></Route>
          </Route>
          <Route path="/reset-password" exact element={<ForgotPassword />}></Route>
          <Route path="*" element={<Navigate replace to="/404" />} />
          <Route exact path="/404" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
