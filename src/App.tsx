import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { FC } from "react";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { Context } from "./ContextProvider";

export const App: FC = () => {
  return (
    <>
      App
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      
      </Routes>
    </>
  );
}

export default App;
