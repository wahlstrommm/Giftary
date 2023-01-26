import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Product = () => {
  const [loggedInCompany, setLoggedInCompany] = useState(false);
  let product: any = [];
  let LocalS: any;
  let typeOfUser: any;
  const checkLS = () => {
    let LS: any = localStorage.getItem("loggedinUser");
    let LSParsed = JSON.parse(LS);
    if (LSParsed) {
      console.log("finns");
      if (LSParsed.isAllowed && LSParsed.type === "company") {
        console.log("finns och är allowed");
        LocalS = LSParsed;
        typeOfUser = LSParsed;
        renderLayout(typeOfUser);
        console.log(LSParsed);
        console.log("TYPEOF", typeOfUser);
      } else {
        console.log("den är nu:", "{}");
      }
    } else {
      console.log("finns inget utan helt tom");
    }
  };
  let render;
  const renderLayout = (user: any) => {
    if (user.type === "company") {
      render = (
        <div>
          <Link to={"/ProductOverview"}>
            <button
              type="submit"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Tillbaka till mina produkter
            </button>
          </Link>
        </div>
      );
      return render;
    } else if (user.type === "user") {
      render = (
        <div>
          <button
            type="submit"
            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Lägg till i listan
          </button>
        </div>
      );
      return render;
    }
  };

  const getFromLS = () => {
    let LSProduct: any = localStorage.getItem("product");
    let LSParsedProduct = JSON.parse(LSProduct);
    if (LSParsedProduct) {
      console.log("Product finns");
      if (LSParsedProduct._id) {
        // console.log("finns och är allowed");
        product.push(LSParsedProduct);
        // console.log(product);
      } else {
        console.log("den är nu:", "{}");
      }
    } else {
      console.log("finns inget utan helt tom");
    }
  };

  checkLS();
  getFromLS();
  return (
    <div className="bg-white">
      <Navbar />;
      <div className="">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.map((i: any) => (
              <li key={i._id}>
                <div className="flex items-center">
                  <a
                    href={i.category}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {i.category}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                  <a
                    href={i.name}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {i.name}
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      {/* Image gallery */}
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
          <img
            src={product[0].image[0]}
            alt={product[0].image[0]}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
            <img
              src={product[0].image[1]}
              alt={product[0].image[1]}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
            <img
              src={product[0].image[2]}
              alt={product[0].image[2]}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
          <img
            src={product[0].image[3]}
            alt={product[0].image[3]}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
      <div className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* Description and details */}
        <div>
          <h3 className="sr-only">Description</h3>
          <h1 className="text-xl">{product[0].name}</h1>
          <div className="space-y-6">
            <p className="text-base text-gray-900">{product[0].summary}</p>
          </div>
        </div>
      </div>
      <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4 flex justify-center">
        <div className="w-1/3 m-10">
          <div>
            <h3 className="sr-only">Description</h3>
            <h1 className="text-xl">{product[0].name}</h1>
            <div className="space-y-6">
              <p className="text-base text-gray-900">{product[0].summary}</p>
            </div>
          </div>
          <div>{render}</div>
        </div>
      </div>
    </div>
  );
};

export default Product;
