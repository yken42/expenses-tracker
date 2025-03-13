import React, { useState } from 'react'
import { TiHomeOutline } from "react-icons/ti";
import { FaRegClipboard } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { PiSignOutFill } from "react-icons/pi";
import clsx from 'clsx';
import axios from 'axios';
import useStore from '../store.js';

export const Navbar = () => {
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);
  const [activeTab, setActiveTab] = useState("/");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="w-1/6 min-h-screen bg-[#5D44F8]">
      <h1 className="w-fit text-4xl font-roboto text-white mx-auto pt-8 tracking-wide">
        Budgy
      </h1>
      <ul className="w-5/6 float-right mx-auto pt-8">
        <li
          className={clsx(
            "py-4 my-4 rounded-l-full text-white",
            activeTab === "/overview" && "bg-[#F7F7F8]"
          )}
        >
          <Link
            onClick={() => handleTabClick("/overview")}
            to="/overview"
            className={clsx(
              "flex text-white justify-items-center items-center text-xl pl-2",
              activeTab === "/overview" && "!text-black"
            )}
          >
            <TiHomeOutline className="mx-2" /> Overview
          </Link>
        </li>
        <li
          className={clsx(
            "py-4 my-4 rounded-l-full text-white",
            activeTab === "/expenses" && "bg-[#F7F7F8]"
          )}
        >
          <Link
            onClick={() => handleTabClick("/expenses")}
            to="/expenses"
            className={clsx(
              "flex text-white justify-items-center items-center text-xl pl-2",
              activeTab === "/expenses" && "!text-black"
            )}
          >
            <FaRegClipboard className="mx-2" /> Expenses
          </Link>
        </li>
        <li
          className={clsx(
            "py-4 my-4 rounded-l-full text-white",
            activeTab === "/settings" && "bg-[#F7F7F8]"
          )}
        >
          <Link
            onClick={() => handleTabClick("/settings")}
            to="/settings"
            className={clsx(
              "flex text-white justify-items-center items-center text-xl pl-2",
              activeTab === "/settings" && "!text-black"
            )}
          >
            <FiSettings className="mx-2" /> Settings
          </Link>
        </li>
      </ul>
      <hr className="w-full text-white border-2 border-dotted " />
      <div className="flex text-white items-center justify-center mx-auto w-fit absolute bottom-12 left-10 text-xl hover:cursor-pointer p-4"
      onClick={handleLogout}>
        <PiSignOutFill className="mr-2" />
        Sign out
      </div>
    </div>
  );
};