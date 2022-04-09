import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex relative z-0 translate-y-2 -translate-x-24 items-center justify-center text-6xl">
        🧑‍🎓
      </div>
      <form className="p-8 z-10 relative rounded-2xl bg-white w-96 border border-black/50">
        <div className="flex flex-col mb-4">
          <label className="mb-1 text-sm tracking-wide">Name</label>
          <input
            id="name"
            className="rounded-md outline-white bg-black/5 outline outline-2 focus:outline-black w-full p-2"
            type="text"
            autocomplete="off"
          />
        </div>
        <div className="flex mb-8 flex-col">
          <label className="mb-1 text-sm tracking-wide">Password</label>
          <input
            id="password"
            className="rounded-md outline-white bg-black/5 outline outline-2 focus:outline-black w-full p-2"
            type="password"
            autocomplete="off"
          />
        </div>
        <div className="bg-black flex flex-row items-center justify-center shadow-lg mb-8 text-bold p-3 text-white rounded-2xl text-center cursor-pointer hover:scale-105 transition ease-linear">
          <p className="mr-1">Register</p>
        </div>
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
