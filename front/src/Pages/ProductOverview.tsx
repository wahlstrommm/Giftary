import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../Components/Footer";

const ProductOverview = () => {
  const [productsArray, setProductArray] = useState([]);
  const [layout, setLAyout] = useState(<></>);
  let LocalS: any;
  //motion framer
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.8,
        staggerChildren: 0.9,
      },
    },
  };
  //motion framer
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 2,
      opacity: 1,
    },
  };

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
        if (result.products.length === 0) {
          console.log("tom");
          setLAyout(
            <div className="h-screen flex flex-col ">
              <h1 className="text-white">
                Det verkar som du inte har några produkter
              </h1>
              <p className="text-white">Du kan skapa produkter här</p>
              <Link to={"/CreateProduct"}>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5"
                  aria-label="Button that takes you to create product"
                >
                  Skapa produkt
                </button>
              </Link>
            </div>
          );
        } else {
          setLAyout(<></>);
        }
      });
  }, []);

  const checkLS = async () => {
    let LS: any = localStorage.getItem("loggedinUser");
    let LSParsed = JSON.parse(LS);
    if (LSParsed) {
      if (LSParsed.isAllowed && LSParsed.type === "company") {
        LocalS = LSParsed;
        LocalS = LSParsed.name;
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
    <div className="h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
      <Navbar />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-200">
          Dina produkter
        </h2>
        <motion.div
          className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 bg "
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {layout}
          {productsArray.map((product: any, id: any) => (
            <motion.div
              key={id}
              className="group relative bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-100"
              variants={item}
            >
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-600 group-hover:opacity-75 lg:aspect-none lg:h-80 ">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 p-2 flex justify-between ">
                <div>
                  <h3 className="text-sm text-black">
                    Namn:
                    <button
                      onClick={() => produktHandler(product._id, product)}
                    >
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </button>
                  </h3>
                  <p className="mt-1 mr-2 text-sm text-black">
                    Beskrivning: {product.summary}
                  </p>
                </div>
                <p className="text-sm font-normal  mr-3 text-black">
                  Pris: {product.price} kr
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductOverview;
