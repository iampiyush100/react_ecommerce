import { useEffect, useState } from "react";
import "./App.css";
import AppRouter from "./routes";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const { userData, isLoggedIn } = useSelector((state) => state.user);
  console.log(userData, isLoggedIn);
  // const [signedIn, setSignedIn] = useState(false);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("token"));
  //   setSignedIn(!!user?.token?.length);
  //   console.log(user);
  // }, []);

  return (
    <div className="App">
      <AppRouter signedIn={isLoggedIn} />
    </div>
  );
};

export default App;
