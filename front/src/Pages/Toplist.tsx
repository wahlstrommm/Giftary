import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";

const Toplist = () => {
  const [productsArray, setProductsArray] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/overview", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "USEeffect");
        setProductsArray(result);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {productsArray.map((product: any) => (
              <a key={product._id} href={product.href} className="group">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.image[0]}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">
                  Namn:{product.name}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  pris: {product.price}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toplist;
