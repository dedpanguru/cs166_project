import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserSecret } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "../lib/stores";

const Main = () => {
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const username = useStore((state) => state.username);
  const password = useStore((state) => state.password);
  const token = useStore((state) => state.token);

  console.log(username);

  const logoutHandler = () => {
    axios
      .post("/api/logout", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.msg);
      });
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center space-y-8">
      <div className="p-8 z-10 w-fit relative rounded-2xl bg-white border border-black/50">
        <div className="flex flex-col justify-center items-center">
          {/* <h1 className="font-extrabold text-5xl">
            Welcome <span className="text-black/50">User</span>
          </h1> */}
          {/* <p>Here are your session details.</p> */}
        </div>
        <div
          className="rounded-md border border-black/50/50 w-96 h-72 p-8 mt-4 flex flex-col items-start justify-center shadow-xl cursor-pointer select-none group"
          onMouseDown={() => setVisible(!visible)}
        >
          {visible ? (
            <>
              <p className="z-50 mb-2 uppercase text-xs tracking-wide text-black">
                Token ID
              </p>
              <div className="w-full rounded-md bg-black/5 p-2">
                <p className="w-fit break-all">{token}</p>
              </div>
            </>
          ) : (
            <div className="w-full flex-col flex space-y-2 items-center justify-center text-5xl group-hover:scale-105 transition duration-300 ease-linear">
              <FaUserSecret className="shadow-xl" />
              {/* <p className="text-sm">Click me to reveal.</p> */}
            </div>
          )}
        </div>
        <div
          className="bg-black flex flex-row items-center justify-center shadow-lg mt-8 text-bold p-3 text-white rounded-2xl text-center cursor-pointer hover:scale-105 transition ease-linear"
          onClick={() => logoutHandler()}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Main;
