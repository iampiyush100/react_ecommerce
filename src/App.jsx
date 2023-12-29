import { useEffect, useState } from "react";
import "./App.css";
import AppRouter from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { loader, saveUserOnLogin } from "./features/Auth/authSlice";

const App = () => {
  const { userData, isLoggedIn, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (Object.keys(user || {})?.length) {
      dispatch(loader(true));
      setTimeout(() => {
        dispatch(saveUserOnLogin(user));
      }, 500);
    }
  }, []);
  console.log({ isLoggedIn, isLoading });

  return <div className="App">{isLoading ? <h1>Full page loader....</h1> : <AppRouter signedIn={isLoggedIn} />}</div>;
};

export default App;
