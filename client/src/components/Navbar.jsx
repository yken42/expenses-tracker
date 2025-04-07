import React, { useState } from 'react'
import { TiHomeOutline } from "react-icons/ti";
import { FaRegClipboard } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { PiSignOutFill } from "react-icons/pi";
import clsx from 'clsx';
import useStore from '../store.js';
import Cookies from 'js-cookie';
import useUserStore from '../store/useUserStore';

export const Navbar = () => {
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);
  const [activeTab, setActiveTab] = useState("/overview");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      Cookies.remove("isAuth");
      navigate('/login');
    }
  };

  return (
    <div className="w-1/6 min-h-screen bg-[#5D44F8]">
      <h1 className="w-fit text-4xl font-roboto text-white mx-auto pt-8 tracking-wide">
        Budgy
      </h1>
      <hr className="w-full text-white border-2 border-dotted " />
      <div className="flex text-white items-center justify-center mx-auto w-fit absolute bottom-12 left-10 text-xl hover:cursor-pointer p-4"
      onClick={handleLogout}>
        <PiSignOutFill className="mr-2" />
        Sign out
      </div>
    </div>
  );
};