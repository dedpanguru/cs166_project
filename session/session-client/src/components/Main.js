import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center space-y-8">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-5xl">
          Welcome <span className="text-primary">User</span>
        </h1>
        <p>Here are your session details.</p>
      </div>

      <div className="rounded-md border border-primary/50 w-96 h-fit p-8 mt-4 flex flex-col items-start justify-center shadow-xl">
        <p className="mb-2 uppercase text-xs tracking-wide text-primary">
          Session ID
        </p>
        <div className="w-full rounded-md ">
          <p>9502931384092809419093</p>
        </div>
        <div className="w-full h-px bg-white/10 my-4" />
        <p className="mb-2 uppercase text-xs tracking-wide text-primary">
          Cookie
        </p>
        <div className="w-full rounded-md">
          <p>9502931384092809419093</p>
        </div>
      </div>
      <div className="bg-primary p-3 rounded-md text-center cursor-pointer hover:scale-105 transition ease-linear mt-4 w-96">
        Logout
      </div>
    </div>
  );
};

export default Main;
