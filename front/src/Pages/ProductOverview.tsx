import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import React from "react";
const ProductOverview = () => {
  const [productsArray, setProductArray] = useState([]);
  let LocalS: any;

  useEffect(() => {
    fetch("http://localhost:3000/api/products/" + LocalS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setProductArray(result.products);
      });
  }, []);

  const checkLS = async () => {
    let LS: any = localStorage.getItem("loggedinUser");
    let LSParsed = JSON.parse(LS);
    console.log(LSParsed);
    if (LSParsed) {
      console.log("finns");
      if (LSParsed.isAllowed && LSParsed.type === "company") {
        console.log("finns och är allowed");
        LocalS = LSParsed;
        console.log(LSParsed);
        LocalS = LSParsed.name;
        console.log("LOCal", LocalS);
      } else {
        console.log("den är nu:", "{}");
        window.location.href = "http://localhost:3002/";
      }
    } else {
      console.log("finns inget utan helt tom");
      window.location.href = "http://localhost:3002/";
      LocalS = {
        isAllowed: false,
      };
    }
  };
  checkLS();

  const produktHandler = async (produktID: any, product: any) => {
    console.log(produktID, product);
    try {
      await fetch("http://localhost:3000/api/products/details/" + produktID, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result) {
            console.log(result);
            localStorage.setItem(
              "product",
              JSON.stringify(result.Foundproduct)
            );
            window.location.href = result.url;
          } else {
            console.log("Något fel hände...");
          }
        });
    } catch (error) {
      console.error("Fel ", error);
    }
  };

  return (
    <div className="bg-white">
      <Navbar />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Dina produkter
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productsArray.map((product: any, id: any) => (
            <div key={id} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-600 group-hover:opacity-75 lg:aspect-none lg:h-80 ">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
                <p>IMG</p>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    namn:
                    <button
                      onClick={() => produktHandler(product._id, product)}
                    >
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </button>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Beskrivning: {product.summary}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  Pris: {product.price} kr
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
