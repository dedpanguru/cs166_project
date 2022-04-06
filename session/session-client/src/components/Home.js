import React, { useEffect } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import axios from "axios";

const Home = () => {
  const hanlder = () => {
    axios.get("/home").then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-6xl">Welcome</h1>
      <p className="m-2">Please login</p>
      <form className="m-8 space-y-4">
        <div>
          <LabelPrimitive.Root htmlFor="name">Name</LabelPrimitive.Root>
          <input
            id="name"
            className="rounded-md border-2 border-blue-400 w-full p-2 focus:outline-none"
            type="text"
            autocomplete="off"
          />
        </div>
        <div>
          <LabelPrimitive.Root htmlFor="name">Password</LabelPrimitive.Root>
          <input
            id="password"
            className="rounded-md border-2 border-blue-400 w-full p-2 focus:outline-none"
            type="text"
            autocomplete="off"
          />
        </div>
        <div
          className="bg-blue-400 p-2 rounded-md text-center cursor-pointer"
          onClick={() => hanlder()}
        >
          Log In
        </div>
      </form>
    </div>
  );
};

export default Home;
