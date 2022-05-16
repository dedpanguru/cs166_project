import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [res, setRes] = useState("");
  const [error, setError] = useState(false);

  const registerHandler = () => {
    axios
      .post("/register", {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        setRes(res.data.message);
        setError(false);
        console.log(res);
      })
      .catch((error) => {
        setError(true);
        setRes(false);
        console.log(error.msg);
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex relative z-0 translate-y-2 -translate-x-24 items-center justify-center text-6xl">
        🧑‍🎓
      </div>
      <form className="p-8 z-10 relative rounded-2xl bg-white w-96 border border-black/50">
        <div className="flex flex-col mb-4">
          <label className="mb-1 text-sm tracking-wide">Username</label>
          <input
            id="name"
            className="rounded-md outline-white bg-black/5 outline outline-2 focus:outline-black w-full p-2"
            type="text"
            autocomplete="off"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-1 text-sm tracking-wide">Email</label>
          <input
            id="email"
            className="rounded-md outline-white bg-black/5 outline outline-2 focus:outline-black w-full p-2"
            type="email"
            autocomplete="off"
            onChange={(e) => setEmail(e.target.value)}
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
          onClick={() => registerHandler()}
        >
          <p className="mr-1">Register</p>
        </div>
        {res && <p className="text-green-500 mb-4">{res}</p>}
        {error && (
          <p className="text-red-500 mb-4">
            There was an error please try again.
          </p>
        )}
        <div className="w-full text-sm flex justify-end">
          <Link className="text-black underline underline-offset-2" to="/">
            Return to login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
