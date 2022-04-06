import { useEffect, useState } from "react";
import Home from "./components/Home";
import "./index.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

function App() {
  const [data, setData] = useState(null);

  async function callBackendAPI() {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  useEffect(() => {
    callBackendAPI()
      .then((res) => setData(res.express))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Home />} />
      <Route path="/register" element={<Home />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
