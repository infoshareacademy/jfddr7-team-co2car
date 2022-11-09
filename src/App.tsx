import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";

function App() {
  return (
    <>
      App
      <Routes>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
