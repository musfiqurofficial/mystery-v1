"use client";

import { useProduct } from "@/app/context/ProductContext";
import React, { useEffect } from "react";

export default function Products() {
  const { products, fetchProducts } = useProduct();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="px-4 mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-screen-lg md:px-24 lg:px-8">
      <h2 className="text-[24px] font-semibold text-center my-3 text-[#444]">
        All Products
      </h2>
      {products.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          Product not found
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <div key={product._id} className="p-4 border rounded-lg shadow">
              <div className="shadow w-full h-[200px] rounded-lg mb-6 relative">
                <span className="text-[72px] text-[#666] font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p>
                {product.description.slice(0, 80)}
                {product.description.length > 80 && "..."}
              </p>
              <p className="text-gray-500">Price: ${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
