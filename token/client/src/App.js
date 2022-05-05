import Home from "./components/Home";
import "./index.css";
import { Routes, Route} from "react-router-dom";
import Register from "./components/Register";
import Main from "./components/Main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}

export default App;
