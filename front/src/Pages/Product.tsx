import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Product = () => {
  const [showModal, setShowModal] = useState(false);

  let product: any = [];
  let LocalS: any;
  let typeOfUser: any;
  let renderSucessLayout;
  let render;
  const handleModal = () => {
    console.log("LOCAL", LocalS);
    if (LocalS === "") {
      setShowModal(!showModal);
    } else if (LocalS.isAllowed === true) {
      setShowModal(!showModal);
    }
  };
  const checkLS = () => {
    let LS: any = localStorage.getItem("loggedinUser");
    let LSParsed = JSON.parse(LS);
    if (LSParsed) {
      if (LSParsed.isAllowed && LSParsed.type === "company") {
        LocalS = LSParsed;
        typeOfUser = LSParsed;
        renderLayout(typeOfUser);
      } else {
        LocalS = LSParsed;
        typeOfUser = LSParsed;
        renderLayout(typeOfUser);
      }
    } else {
      console.log("finns inget utan helt tom");
    }
  };

  const addProductHandler = async () => {
    try {
      let productID = product[0]._id;
      await fetch(`http://localhost:3000/api/user/${productID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: typeOfUser.email }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            renderSucessBox(result);
            setShowModal(true);
          } else {
            console.log("Något fel hände...");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const renderSucessBox = (userID: any) => {
    renderSucessLayout = (
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-around items-center"
        style={showModal === true ? { display: "block" } : { display: "none" }}
        onClick={handleModal}
      >
        <div className="flex justify-center justify-items-center align-middle text-center top-1/3 relative">
          <div className="bg-white p-6 rounded  h-2/5 w-4/5 relative">
            {/* <p>{reponsText}</p> */}
            <div
              className="flex justify-evenly "
              style={
                showModal === true ? { display: "block" } : { display: "none" }
              }
            >
              <h1>Produkten har lagts till</h1>
              <Link to={"/"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5">
                  Hem
                </button>
              </Link>
              <Link to={"/UserProductList"}>
                <button
                  type="button"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Se dina sparade produkter
                </button>
              </Link>
            </div>
            <button className="rounded w-7 absolute top-2 left-3 bg-blue-500 hover:bg-blue-700 text-white font-bold">
              X
            </button>
          </div>
        </div>
      </div>
    );
  };
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
            onClick={() => {
              addProductHandler();
            }}
            type="submit"
            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:shadow-outline m-5 shadow hover:shadow-lg  transition transform hover:-translate-y-0.5"
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
        product.push(LSParsedProduct);
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
    <div className="bg-gradient-to-t from-gray-700 via-gray-900 to-black">
      <Navbar />
      <div className="mt-4">
        <nav>
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.map((i: any) => (
              <li key={i._id}>
                <div className="flex items-center">
                  <a
                    href={"/Toplist"}
                    className="mr-2 text-sm font-medium text-white"
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
                    href={"/Toplist"}
                    className="mr-2 text-sm font-medium text-white"
                  >
                    {i.name}
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

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
        <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4 max-sm:flex justify-center">
          <img
            src={product[0].image[3]}
            alt={product[0].image[3]}
            className="h-full w-full object-cover object-center max-sm:h-11/12 max-sm:w-11/12 max-sm:rounded-md"
          />
        </div>
      </div>

      <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4 flex justify-center">
        <div className="w-1/3 m-10 max-sm:w-2/3">
          <div>
            <h3 className="sr-only">Beskrivning</h3>
            <h1 className="text-xl text-slate-400 max-sm:text-2xl">
              {product[0].name}
            </h1>
            <div className="space-y-6 max-sm:">
              <p className="text-base text-white">{product[0].summary}</p>
            </div>
          </div>
          <div>{render}</div>
          <div>{renderSucessLayout}</div>
          <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-around items-center"
            style={
              showModal === true ? { display: "block" } : { display: "none" }
            }
            onClick={handleModal}
          >
            <div className="flex justify-center align-middle text-center top-1/3 relative">
              <div className="bg-white p-6 rounded  h-2/5 w-4/5 relative">
                {/* <p>{reponsText}</p> */}
                <h1>Produkten har lagts till</h1>
                <div
                  className="flex justify-around"
                  style={
                    showModal === true
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  <div>
                    <Link to={"/"}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:shadow-outline m-5 shadow hover:shadow-lg  transition transform hover:-translate-y-0.5">
                        Hem
                      </button>
                    </Link>
                  </div>
                  <div>
                    <Link to={`/UserProductList`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:shadow-outline m-5 shadow hover:shadow-lg  transition transform hover:-translate-y-0.5">
                        Se dina sparade produkter
                      </button>
                    </Link>
                  </div>
                </div>
                <button className="rounded w-7 absolute top-2 left-3 bg-blue-500 hover:bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline shadow hover:shadow-lg  transition transform hover:-translate-y-0.5">
                  X
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
