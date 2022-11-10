import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./components/Home";
import { FC } from "react";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Profile } from "./components/Profile";
import { Navigation } from "./components/Navigation";
import { Context } from "./ContextProvider";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth, firebaseDb } from "./index";

export const App: FC = () => {
  const navigate = useNavigate();
  const { username, setUsername } = useContext(Context);

  useEffect((): void => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const userEmail = user.email;
        setUsername(userEmail || "");
      } else {
        setUsername("");
      }
    });
  }, []);

  useEffect((): void => {
    if (username) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [username]);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </>
  );
};

export default App;
