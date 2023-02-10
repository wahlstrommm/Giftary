import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";

const UserProductList = () => {
  const [productArray, setProductArray] = useState([]);
  const [urlString, setUrlString] = useState("");
  const [layout, setLAyout] = useState(<></>);
  const [empty, setEmpty] = useState(false);
  const [deleteBox, setDeleteBox] = useState(false);
  const [savedItemText, setSavedItemText] = useState("");
  let LocalLS: any;
  //checks the localstorage
  const checkLS = async () => {
    let LS: any = localStorage.getItem("loggedinUser");
    let LSParsed = JSON.parse(LS);
    if (LSParsed) {
      console.log("finns");
      if (LSParsed.isAllowed && LSParsed.type === "company") {
        console.log("finns och är allowed");
        window.location.href = "http://localhost:3002/";
      } else if (LSParsed.isAllowed && LSParsed.type === "user") {
        LocalLS = LSParsed;

        console.log("den är nu:", "{}");
      }
    } else {
      console.log("finns inget utan helt tom");
      window.location.href = "http://localhost:3002/";
    }
  };
  useEffect(() => {
    if (productArray.length > 0) return;
    fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email: LocalLS.email, id: LocalLS._id }),
    })
      .then((response) => response.json())
      .then((result) => {
        setProductArray(result.products);
        setSavedItemText("Dina sparade produkter:");
        if (result.products.length === 0) {
          setSavedItemText("");
          setLAyout(
            <div>
              <div className="flex flex-col text-center">
                <h1 className="text-white">
                  Det verkar som du inte har sparat några produkter
                </h1>
                <p className="text-white">Du kan hitta produkter här</p>
                <Link to={"/Toplist"}>
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ rotate: 360, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5 "
                    aria-label="leads to the toplist that the user can see diffrent products"
                  >
                    Hitta produkter
                  </motion.button>
                </Link>
              </div>
            </div>
          );
          console.log("listan är tom...", result.products);
        } else {
          setEmpty(!empty);
          setLAyout(<></>);
        }
      });
  }, []);

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
    try {
      await fetch("http://localhost:3000/api/" + userID, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            window.location.reload();
            console.log(result);
          } else {
            console.log("Något fel hände...");
          }
        });
    } catch (error) {
      console.error("Fel ", error);
    }
  };
  const shareListHandler = async (userID: any) => {
    setUrlString("http://localhost:3002/api/" + userID);
  };
  return (
    <div className="bg-gradient-to-t from-gray-700 via-gray-900 to-black h-screen">
      <Navbar />
      <div className="bg-gradient-to-t from-gray-700 via-gray-900 to-blackmx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {savedItemText}
        </h2>
        {layout}
        <div
          className="flex justify-around m-2"
          style={empty === true ? { display: "block" } : { display: "none" }}
        >
          <div className="flex justify-evenly">
            <button
              onClick={() => {
                shareListHandler(LocalLS._id);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5 shadow hover:shadow-lg  transition transform hover:-translate-y-0.5"
              aria-label="give the user to share thier list of save products"
            >
              Länk
            </button>
            <div>
              <p
                className="text-white text-
            "
              >
                {urlString}
              </p>
            </div>
            <button
              onClick={() => setDeleteBox(!deleteBox)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5 shadow hover:shadow-lg  transition transform hover:-translate-y-0.5"
              aria-label="deletes your list"
            >
              Radera
            </button>
          </div>

          <div
            className=" justify-center flex text-center"
            style={
              deleteBox === true ? { display: "block" } : { display: "none" }
            }
          >
            <p className="mb-2 pt-2 text-white">
              Är du säker på att du vill radera den?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  deleteListHandler(LocalLS._id);
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5 shadow hover:shadow-lg  transition transform hover:-translate-y-0.5"
                aria-label="confirmes delete the list"
              >
                Ja
              </button>
              <button
                onClick={() => setDeleteBox(!deleteBox)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5 shadow hover:shadow-lg  transition transform hover:-translate-y-0.5"
                aria-label="denied deleting the list"
              >
                Nej
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productArray.map((product: any, id: any) => (
            <div
              key={id}
              className="group relative bg-white pb-2 max-md:h-screen group h-full w-full bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-100"
            >
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-600 group-hover:opacity-75 lg:aspect-none lg:h-80 ">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-white ml-2">
                    Namn:
                    <button
                      onClick={() => produktHandler(product._id, product)}
                    >
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </button>
                  </h3>
                  <p className="mt-1 text-sm text-white ml-2">
                    Beskrivning: {product.summary}
                  </p>
                </div>
                <p className="text-sm font-medium text-white ml-2">
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
