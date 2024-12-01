"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@/app/context/UserContext";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUser } = useUser();
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        Cookies.set("token", data.token, { expires: 2 });
        await updateUser();
        toast.success("Login successful!");
        router.push("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden">
      <div className="px-6 py-4">
        <h3 className="my-2 text-xl font-medium text-center text-gray-600">
          Welcome Back
        </h3>

        <p className="mb-10 text-center text-gray-500 ">
          Login or create account
        </p>

        <form onSubmit={handleLogin}>
          <div className="w-full mt-4">
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              placeholder="Email Address"
              aria-label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="w-full mt-4">
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              placeholder="Password"
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="mt-2 text-sm text-red-600 ">{error}</p>}

          <div className="flex items-center justify-between mt-4">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-500">
              Forget Password?
            </a>

            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center py-4 text-center bg-gray-50 ">
        <span className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
        </span>
        <a
          href="/auth/register"
          className="mx-2 text-sm font-bold text-blue-500  hover:underline"
        >
          Register
        </a>
      </div>
    </div>
  );
}
