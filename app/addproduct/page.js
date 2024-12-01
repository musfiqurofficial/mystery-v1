"use client";

import React, { useState } from "react";
import { useProduct } from "../context/ProductContext";

export default function AddProductPage() {
  const { addProduct } = useProduct();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price) {
      alert("Please fill in all fields");
      return;
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber)) {
      alert("Please enter a valid number for price");
      return;
    }
    await addProduct({ name, description, price: priceNumber });

    setName("");
    setDescription("");
    setPrice("");
  };

  return (
    <div className="px-4 mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-screen-sm md:px-24 lg:px-8">
      <h2 className="text-[24px] font-semibold text-center my-3 text-[#444]">
        Add Your Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div>
          <label className="text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="text-gray-700" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="text-gray-700" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex justify-end items-center mt-4">
          <button
            type="submit"
            className="bg-white flex items-center text-gray-700 justify-center gap-x-2 text-sm sm:text-base rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-6 py-2.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 sm:w-5 sm:h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            <span className="font-mono font-semibold text-[14px]">
              Click to Add
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
