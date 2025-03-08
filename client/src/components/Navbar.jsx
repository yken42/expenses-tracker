import React from 'react'
import { TiHomeOutline } from "react-icons/ti";
import { FaRegClipboard } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className="w-1/6 min-h-screen bg-[#5D44F8]">
      <h1 className="w-fit text-4xl font-roboto text-white mx-auto pt-8 tracking-wide">
        Budgy
      </h1>
      <ul className="w-fit mx-auto pt-8">
        <li>
          <Link
            to="/dashboard"
            className="flex text-white items-center text-xl pt-4"
          >
            <TiHomeOutline className="mx-2" /> Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/reports"
            className="flex text-white items-center text-xl pt-4"
          >
            <FaRegClipboard className="mx-2" /> Reports
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="flex text-white items-center text-xl pt-4"
          >
            <CiSettings className="mx-2" />
            settings
          </Link>
        </li>
      </ul>
    </div>
  );
}