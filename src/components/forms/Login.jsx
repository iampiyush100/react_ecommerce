import { useState } from "react";

function LoginForm() {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setUser((prevUser) => ({
          ...prevUser,
          [e.target.name]: e.target.value,
        }));
        break;
      case "password":
        setUser((prevUser) => ({
          ...prevUser,
          [e.target.name]: e.target.value,
        }));
        break;
      default:
        break;
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="enter email"
          value={user.email}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="enter password"
          value={user.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
  );
}

export default LoginForm;
