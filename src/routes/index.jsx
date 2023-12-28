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
  console.log("signedIn>>>>>>kya", signedIn);
  return (
    <>
      <Router>
        <ResponsiveAppBar signedIn={signedIn} />
        <Routes>
          {/* <Route element={<LoginRoute signedIn={signedIn} />}> */}
          <Route exact path="/login" element={signedIn ? <Navigate to="/" /> : <SignIn />} />
          <Route exact path="/register" element={<RegisterationForm />} />
          {/* </Route> */}
          <Route element={<ProtectedRoute signedIn={signedIn} />}>
            <Route path="/" exact element={<Home />} />
            <Route path="/products" exact element={<Products />}></Route>
            <Route path="/products/:id" exact element={<ProductsByID />}></Route>
            <Route path="/cart" exact element={<Cart />}></Route>
            <Route path="/check-out" exact element={<Checkout />}></Route>
          </Route>
          <Route path="/reset-password" exact element={<ForgotPassword />}></Route>
          <Route exect path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
