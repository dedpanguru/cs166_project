import React, {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import useStore from "../lib/stores";

const Home = () => {
  const [res, setRes] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const username = useStore((state) => state.username);
  const password = useStore((state) => state.password);
  const token = useStore((state) => state.token);
  const setUsername = useStore((state) => state.setUsername);
  const setPassword = useStore((state) => state.setPassword);
  const setToken = useStore((state) => state.setToken);

  const loginHanlder = () => {
    axios
      .post("/api/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        setRes(true);
        setError(false);
        setToken(res.data.token);
        navigate("/main");
      })
      .catch((error) => {
        setError(true);
        setRes(false);
      });
  };

  console.log(username);
  console.log(password);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex relative z-0 translate-y-2 -translate-x-24 items-center justify-center text-6xl">
        🥷
      </div>
      <form className="p-8 z-10 relative rounded-2xl bg-white w-96 border border-black/50">
        <div className="absolute top-0 -translate-y-1/2 left-0 w-full flex justify-center items-center"></div>
        {/* <div className="absolute -left-48 -bottom-12 p-4 w-20 flex items-center justify-center h-20 rounded-full bg-black drop-shadow-xl rotate-12 text-4xl">
        🥷
      </div>
      <div className="absolute -right-48 -top-12 p-4 w-20 flex items-center justify-center h-20 rounded-full bg-black drop-shadow-xl rotate-12 text-4xl">
        🥷
      </div>
      <div className="absolute -right-48 -bottom-12 p-4 w-20 flex items-center justify-center h-20 rounded-full bg-black drop-shadow-xl -rotate-12 text-4xl">
        🥷
      </div> */}
        <div className="flex flex-col mb-4">
          <label className="mb-1 text-sm tracking-wide">Name</label>
          <input
            id="name"
            className="rounded-md outline-white bg-black/5 outline outline-2 focus:outline-black w-full p-2"
            type="text"
            autocomplete="off"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex mb-8 flex-col">
          <label className="mb-1 text-sm tracking-wide">Password</label>
          <input
            id="password"
            className="rounded-md outline-white bg-black/5 outline outline-2 focus:outline-black w-full p-2"
            type="password"
            autocomplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          className="bg-black flex flex-row items-center justify-center shadow-lg mb-8 text-bold p-3 text-white rounded-2xl text-center cursor-pointer hover:scale-105 transition ease-linear"
          onClick={() => loginHanlder()}
        >
          <p className="mr-1">Log In</p>
          <BsArrowRightShort />
        </div>
        {error && (
          <p className="text-red-500 mb-4">
            There was an error please try again.
          </p>
        )}
        <div className="w-full text-sm flex justify-between space-x-4">
          <p className="text-black/50">Don't have an account yet?</p>
          <Link
            className="text-black underline underline-offset-2"
            to="/register"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Home;
