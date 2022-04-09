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
        <div className="bg-primary p-3 rounded-md text-center cursor-pointer hover:scale-105 transition ease-linear">
          Register
        </div>
        <div className="items-center justify-center text-center">
          <Link className="text-primary" to="/">
            Return to login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
