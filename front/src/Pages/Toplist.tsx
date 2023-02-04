import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";

const Toplist = () => {
  const [productsArray, setProductsArray] = useState([]);
  const [resultText, SetResultText] = useState("");
  const category = [
    "forHim",
    "ForHer",
    "all",
    "Christmas",
    "ForLove",
    "Alcohol",
    "DadsDay",
    "MomsDay",
  ];
  const categoryFineText = [
    "För han",
    "För henne",
    "Alla",
    "Julklappar",
    "Kärlek",
    "Alkohol",
    "Farsdag",
    "Morsdag",
  ];
  useEffect(() => {
    if (productsArray.length > 0) return;
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

  const handleCategory = async (categoryType: any) => {
    try {
      await fetch("http://localhost:3000/api/overview/sort/" + categoryType, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result) {
            setProductsArray(result);
          } else {
            SetResultText("Finns inga produkter i denna kategori");
            console.log("Något fel hände...");
          }
        });
    } catch (error) {
      console.error("Fel ", error);
    }
  };
  const getProductHandler = async (id: any) => {
    try {
      await fetch("http://localhost:3000/api/overview/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    <div>
      <Navbar />

      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          {resultText}
          {/* <h2 className="sr-only">Products</h2> */}
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {category.map((i: any, index: any) => (
              <button
                key={index}
                id={i}
                className="text-white m-2 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                onClick={(e) => {
                  handleCategory(e.currentTarget.id);
                }}
              >
                {categoryFineText[index]}
              </button>
            ))}
          </div>
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
                  Namn: {product.name}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  Pris: {product.price} kr
                </p>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  Beskrvning: {product.summary}
                </p>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  Kategori: {product.category}
                </p>
                <button
                  onClick={() => {
                    getProductHandler(product._id);
                  }}
                  className="text-white mt-2 py-1 px-2 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  Läs mer
                </button>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toplist;
