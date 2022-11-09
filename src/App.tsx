import React from 'react';
import { FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { Context } from "./ContextProvider";

export const App: FC = () => {
  return (
    <>
      <Routes>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      
      </Routes>
    </>
  );
}

export default App;
