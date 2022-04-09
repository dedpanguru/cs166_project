import React, { useEffect } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const hanlder = () => {
    axios.get("/home").then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-6xl">Welcome!</h1>
      <p className="">Please enter your details.</p>
      <form className="m-8 space-y-4">
        <div>
          <LabelPrimitive.Root htmlFor="name">Name</LabelPrimitive.Root>
          <input
            id="name"
            className="rounded-md border-2 border-primary w-full p-2 focus:outline-none bg-transparent"
            type="text"
            autocomplete="off"
          />
        </div>
        <div>
          <LabelPrimitive.Root htmlFor="name">Password</LabelPrimitive.Root>
          <input
            id="password"
            className="rounded-md border-2 border-primary w-full p-2 focus:outline-none bg-transparent"
            type="text"
            autocomplete="off"
          />
        </div>
        <div
          className="bg-primary p-3 rounded-md text-center cursor-pointer hover:scale-105 transition ease-linear"
          onClick={() => hanlder()}
        >
          Log In
        </div>
        <div className="w-full flex justify-between space-x-4">
          <p>Don't have an account yet?</p>
          <Link className="text-primary" to="/register">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Home;
