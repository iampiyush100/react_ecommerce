import "./App.css";
import LoginForm from "./components/mui/MuiLogin";
import SignIn from "./components/mui/MuiLogin";
import RegisterationForm from "./components/forms/Register";
import ForgotPassword from "./components/forms/ForgotPassword";
import Products from "./components/products/Products";



import {Routes, Route, BrowserRouter} from "react-router-dom";
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<SignIn />}></Route>
        <Route path="/register" exact element={<RegisterationForm />}></Route>
        <Route path="/reset-password" exact element={<ForgotPassword />}></Route>
        <Route path="/products" exact element={<Products />}></Route>
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
