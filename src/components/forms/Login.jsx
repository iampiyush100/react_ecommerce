import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";

function LoginForm() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState({isError: false, message: ''});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.email !== "" && user.password !== "") {
      setError({isError: false, message: ''});
      setIsLoading(true);
      const apiCalling = async () => {
        let config = {
          method: "post",
          url: "https://dummyjson.com/auth/login",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            username: user.email,
            password: user.password,
          }),
        };
        try {
          const response = await axios.request(config);
          console.log({ response });
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);

          setError({isError: true, message: error?.response?.data?.message || "something went wrong"});
        }
      };
      apiCalling();
      console.log(user);
    } else {
      setError({isError: true, message: 'Please fill the form before submit'});
    }
  };

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#FAF9F6",
      }}
    >
      <Card
        style={{
          width: "30%",
          height: "40vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h3>LOGIN FORM</h3>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="email"
            placeholder="Enter Email"
            value={user.email}
            onChange={handleChange}
          />
          <br />
          <br />
          <Input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={user.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <Button
            style={{ background: "#FF69B4", color: "white" }}
            type="submit"
          >
            Login
          </Button>
          {error.isError && (
            <p style={{color: "red"}}>{error.message}</p>
          )}
             {isLoading && (
            <p style={{color: "blue"}}>Loading.....</p>
          )}
        </form>
      </Card>
    </div>
  );
}

export default LoginForm;
