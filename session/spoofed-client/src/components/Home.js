import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import useStore from "../lib/stores";

const Home = () => {
  const [message, setMessage] = useState("");

  const receiver = "hacker";
  const amount = 100;

  const loginHanlder = () => {
    axios
      .post("/transfer", null, {
        params: {
          receiver,
          amount,
        },
      })
      .then((res) => {
        setMessage(res.data.message);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex relative z-0 translate-y-2 -translate-x-24 items-center justify-center text-6xl">
        🥷
      </div>
      <form className="p-8 z-10 relative rounded-2xl bg-black w-96 border border-white/50">
        {message ? (
          <div className="font-medium">{message}</div>
        ) : (
          <div
            className="flex flex-row items-center justify-center shadow-lg text-bold p-3 bg-white text-black rounded-2xl text-center cursor-pointer hover:scale-105 transition ease-linear"
            onClick={() => loginHanlder()}
          >
            <p className="mr-1">View your Balance</p>
            <BsArrowRightShort />
          </div>
        )}
      </form>
    </div>
  );
};

export default Home;
