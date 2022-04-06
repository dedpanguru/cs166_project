import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-6xl">Register</h1>
      <form className="m-8 space-y-4">
        <div>
          <LabelPrimitive.Root htmlFor="name">Name</LabelPrimitive.Root>
          <input
            id="name"
            className="rounded-md border-2 border-blue-400 w-full p-2 focus:outline-none bg-transparent"
            type="text"
            autocomplete="off"
          />
        </div>
        <div>
          <LabelPrimitive.Root htmlFor="name">Password</LabelPrimitive.Root>
          <input
            id="password"
            className="rounded-md border-2 border-blue-400 w-full p-2 focus:outline-none bg-transparent"
            type="text"
            autocomplete="off"
          />
        </div>
        <div className="bg-blue-400 p-3 rounded-md text-center cursor-pointer">
          Register
        </div>
        <div className="items-center justify-center text-center">
          <Link className="text-blue-400" to="/">
            Return to login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
