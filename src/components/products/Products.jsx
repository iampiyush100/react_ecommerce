import { useState } from "react";
import ResponsiveAppBar from "../navbar/Navbar";

function Products() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  return <ResponsiveAppBar />;
}

export default Products;
