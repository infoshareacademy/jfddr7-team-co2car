import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./components/Home";
import { FC } from "react";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { Navigation } from "./components/Navigation";
import { Context } from "./ContextProvider";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth, firebaseDb } from "./index";

//-----!!---poprawic kod tak aby strona pamietała że uzytkownik jest zalogowany --> Dodałam useEffect z onAuthStateChanged który powieni robic to że strona zapamiętuje zalogowanego uzytkownika.
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

  //   useEffect((): void => {
  //     if (username) {
  //       navigate("/home");
  //     } else {
  //       navigate("/login");
  //     }
  //   }, [username]);

  //-----!!---poprawic kod tak aby strona pamietała że uzytkownik jest zalogowany --> Dodałam wyżej useEffect z onAuthStateChanged który powieni robic to że strona zapamiętuje zalogowanego uzytkownika.

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
};

export default App;
