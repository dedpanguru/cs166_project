import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaUserSecret } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "../lib/stores";

const Main = () => {
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [data, setData] = useState();
  const [message, setMessage] = useState({ message: "", isSet: false });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const username = useStore((state) => state.username);
  const password = useStore((state) => state.password);

  const depositHandler = () => {
    axios
      .post("/deposit", null, {
        params: {
          amount,
        },
      })
      .then((res) => {
        console.log(res);
        setMessage({ message: res.data.message, isSet: true });
        setMessage({ message: res.data.message, isSet: false });
      })
      .catch((error) => {
        console.log(error);
        setError("Please input a valid amount.");
      });
  };

  const accountHandler = () => {
    fetch("/myaccount")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      });
  };

  useEffect(() => {
    accountHandler();
  }, [message.isSet]);

  const logoutHandler = () => {
    axios
      .post("/logout", {
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
        <div className="flex flex-col justify-center items-center"></div>
        <div className="rounded-md border border-black/50/50 w-96 h-fit p-8 mt-4 flex flex-col items-start justify-center shadow-xl select-none group mb-8">
          {data ? (
            <div className="flex flex-col w-full h-full space-y-4">
              <div>
                <p className="text-black/50">Username</p>
                <p className="font-medium">{data.username}</p>
              </div>
              <div>
                <p className="text-black/50">Balance</p>
                <p className="font-medium">{data.balance}</p>
              </div>
              <div>
                <p className="text-black/50">Account ID</p>
                <p className="font-medium">{data.accountID}</p>
              </div>
            </div>
          ) : (
            <p>You are not logged in.</p>
          )}
        </div>
        <div className="flex flex-col mb-4 relative">
          <label className="mb-1 text-sm tracking-wide">Deposit Amount</label>
          {message.message && (
            <FaCheckCircle className="text-green-500 absolute right-0" />
          )}
          <input
            id="amount"
            className="rounded-md outline-white bg-black/5 outline outline-2 focus:outline-black w-full p-2"
            type="number"
            min="0"
            autocomplete="off"
            onChange={(e) => setAmount(Math.abs(e.target.value))}
          />
        </div>
        <div
          className="bg-black flex flex-row items-center justify-center shadow-lg mt-4 text-bold p-3 text-white rounded-2xl text-center cursor-pointer hover:scale-105 transition ease-linear"
          onClick={() => depositHandler()}
        >
          Deposit
        </div>
        {message.message && (
          <p className="text-green-500 mt-4">{message.message}</p>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
      <div
        className="bg-black flex flex-row w-48 items-center justify-center shadow-lg mt-12 text-bold p-3 text-white rounded-2xl text-center cursor-pointer hover:scale-105 transition ease-linear absolute top-0 right-8"
        onClick={() => logoutHandler()}
      >
        Logout
      </div>
    </div>
  );
};

export default Main;
