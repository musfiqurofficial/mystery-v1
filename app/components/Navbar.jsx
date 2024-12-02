/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div>
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 py-2">
        {user && (
          <span className="text-[14px] font-mono">Welcome, {user.name}</span>
        )}
      </div>
      <nav className={`bg-white ${user ? "shadow" : ""}`}>
        <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 py-2">
          <div className="lg:flex lg:items-center">
            <div className="flex items-center justify-between">
              <Link href="/">
                <h3 className="text-[28px] font-medium text-[#333]">
                  <span className="text-purple-700 text-[34px] font-bold">
                    My
                  </span>
                  Stery
                </h3>
              </Link>
              <div className="flex lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                  aria-label="toggle menu"
                >
                  {isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 8h16M4 16h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div
              className={`${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "opacity-0 -translate-x-full"
              } absolute inset-x-0 z-20 flex-1 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lg:justify-between`}
            >
              <div className="flex flex-col text-gray-600 capitalize lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
                <Link
                  href="/storyline"
                  className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900"
                >
                  Storyline
                </Link>

                <Link
                  href="/inventory"
                  className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900"
                >
                  Inventory
                </Link>
                <Link
                  href="/characters"
                  className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900"
                >
                  Characters
                </Link>
                <Link
                  href="/clues"
                  className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900"
                >
                  Clues
                </Link>
                <Link
                  href="/festival-map"
                  className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900"
                >
                  Back to Map
                </Link>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <label className="flex cursor-pointer gap-2 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  className="toggle theme-controller"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </label>
              {user ? (
                <>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role=""
                      className="cursor-pointer border-none"
                    >
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-14 h-14 object-cover rounded-full border-2"
                      />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                      <li>
                        <a>{user.email}</a>
                      </li>
                      <li>
                        {" "}
                        <button
                          onClick={logout}
                          className="mt-2 lg:mt-0 text-red-500 lg:mx-1"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-1 hover:text-gray-900"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-1 hover:text-gray-900 bg-slate-100 hover:bg-slate-200 px-6 py-2 rounded-full"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
