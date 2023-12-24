import "./App.css";
import LoginForm from "./components/forms/Login";

function App() {
  return (
    <>
      <div
        style={{
          width: "30%",
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: "#FAF9F6"
        }}
      >
        <h1>Login</h1>
        <LoginForm />
      </div>
    </>
  );
}

export default App;
