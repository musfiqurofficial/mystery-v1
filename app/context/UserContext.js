"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await fetch("/api/auth/user", {
        headers: { token },
      });
      const data = await response.json();

      if (response.ok) {
        setUser(data);
      } else {
        toast.error(data.message || "Failed to retrieve user");
        localStorage.removeItem("token");
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const updateUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await fetchUser(token);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    Cookies.remove("token");
    setUser(null);
    router.push("/auth/login");
    toast.success("Logged out successfully");
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
