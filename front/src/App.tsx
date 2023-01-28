// import React, { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Link } from "react-router-dom";
import Icon from "./Images/image-icon.svg";

let LocalS: any;
const checkLS = () => {
  let LS: any = localStorage.getItem("loggedinUser");
  let LSParsed = JSON.parse(LS);
  if (LSParsed) {
    console.log("finns");
    if (LSParsed.isAllowed) {
      console.log("finns och är allowed");
      LocalS = LSParsed;
      console.log(LSParsed);
    } else {
      console.log("den är nu:", "{}");
    }
  } else {
    console.log("finns inget utan helt tom");
    LocalS = {
      isAllowed: false,
    };
  }
};
function App() {
  // const [checkUser, setCheckUser] = useState(false);

  checkLS();

  return (
    <main className="w-screen h-screen bg-salte-600">
      <Navbar />
      <div className="bg-red-600 w-full h-4/6 flex justify-center items-center">
        <div className="h-4/5 bg-amber-900 w-10/12 flex justify-center items-center">
          <div className="bg-amber-500 h-5/6 w-9/12 relative top-1 flex flex-col justify-evenly text-center">
            <img src={Icon} className="h-24" alt="icon" />
            <p>HEJ</p>
            <div className="flex justify-center gap-9 relative bottom-2 items-center">
              <Link to={"/Generator"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5">
                  Generator
                </button>
              </Link>
              <div
                style={
                  LocalS.isAllowed === false || undefined
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <Link to={"/Login"}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5">
                    Logga in
                  </button>
                </Link>
              </div>
              <div
                style={
                  LocalS.isAllowed === true && LocalS.type === "user"
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <Link to={"/UserProductList"}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5">
                    Dina listor
                  </button>
                </Link>
              </div>
              <div
                style={
                  LocalS.isAllowed === true && LocalS.type === "company"
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <Link to={"/CreateProduct"}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5">
                    Skapa produkt
                  </button>
                </Link>
              </div>
              <div
                style={
                  LocalS.isAllowed === true && LocalS.type === "company"
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <Link to={"/ProductOverview"}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5">
                    Alla dina produkter
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </main>
  );
}

export default App;
