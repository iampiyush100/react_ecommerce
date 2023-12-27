import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignIn from "../components/forms/MuiLogin";
import Home from "../pages/Home";
import RegisterationForm from "../components/forms/Register";
import ForgotPassword from "../components/forms/ForgotPassword";
import Products from "../components/products/Products";
import ProductsByID from "../components/products/ProductsById";
import ProtectedRoute from "./protectedRoute";
import PageNotFound from "../pages/PageNotFound";
import LoginRoute from "./loginRoute";

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<LoginRoute />}>
            <Route exact path="/login" element={<SignIn />} />
            <Route exact path="/register" element={<RegisterationForm />} />
          </Route>
          <Route element={<ProtectedRoute />}>
          <Route path="/" exact element={<Home />}></Route>
            <Route path="/products" exact element={<Products />}></Route>
            <Route path="/products/:id" exact element={<ProductsByID />}></Route>
          </Route>
          <Route
            path="/reset-password"
            exact
            element={<ForgotPassword />}
          ></Route>
          <Route exect path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
