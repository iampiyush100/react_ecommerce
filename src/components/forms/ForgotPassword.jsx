import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
      setEmail(e.target.value)
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
      <h3>Forget Password</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="enter email"
          value={email}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Forget Password</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
