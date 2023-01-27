import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";

const UserProductList = () => {
  const [productArray, setProductArray] = useState([]);
  const [urlString, setUrlString] = useState("");
  let LocalLS: any;
  const checkLS = async () => {
    let LS: any = localStorage.getItem("loggedinUser");
    let LSParsed = JSON.parse(LS);
    console.log(LSParsed);
    if (LSParsed) {
      console.log("finns");
      if (LSParsed.isAllowed && LSParsed.type === "company") {
        console.log("finns och är allowed");
        window.location.href = "http://localhost:3002/";

        // window.location.re
        // console.log(LSParsed);
        // LocalS = LSParsed.name;
        // console.log("LOCal", LocalS);
      } else if (LSParsed.isAllowed && LSParsed.type === "user") {
        LocalLS = LSParsed;

        console.log("HEJHEJEJEEJEJEJ", LSParsed);
        console.log("den är nu:", "{}");
        // window.location.href = "http://localhost:3002/";
      }
    } else {
      console.log("finns inget utan helt tom");
      window.location.href = "http://localhost:3002/";
      // LocalS = {
      //   isAllowed: false,
      // };
    }
  };
  useEffect(() => {
    if (productArray.length > 0) return;
    console.log("useEffect,");
    fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email: LocalLS.email, id: LocalLS._id }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setProductArray(result.products);
      });
  }, []);
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
  const deleteListHandler = async (userID: any) => {
    console.log(userID);
  };
  const shareListHandler = async (userID: any) => {
    console.log("url", "http://localhost:3000/api/" + userID);
    setUrlString("http://localhost:3002/api/" + userID);
  };
  return (
    <div className="bg-white">
      <Navbar />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Dina sparade produkter:
        </h2>

        <div className="flex justify-around m-2">
          <div className="flex justify-evenly gap-5">
            <p className="left-3">Dela: </p>{" "}
            <button
              onClick={() => {
                shareListHandler(LocalLS._id);
              }}
            >
              Länk
            </button>
            <div>{urlString}</div>
          </div>
          <div>
            <button
              onClick={() => {
                deleteListHandler(LocalLS._id);
              }}
            >
              radera
            </button>
          </div>
          {/* <div>03</div> */}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productArray.map((product: any, id: any) => (
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
                      {product.name} +1
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

export default UserProductList;
