import { useEffect, useState } from "react";
import Home from "./components/Home";
import "./index.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
