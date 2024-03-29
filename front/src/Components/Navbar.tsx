import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logogift.svg";
const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  let typeOfUser: any;
  let loggedIn: any;
  let ID: any;
  //clear Localstorage
  const clearLS = () => {
    window.localStorage.clear();
    window.location.reload();
  };
  //checks Localstorage
  const checkLS = async () => {
    let LS: any = localStorage.getItem("loggedinUser");
    let LSParsed = JSON.parse(LS);
    if (LSParsed) {
      ID = LSParsed._id;
      if (LSParsed.isAllowed && LSParsed.type === "company") {
        loggedIn = true;
        typeOfUser = "company";
      } else if (LSParsed.isAllowed && LSParsed.type === "user") {
        loggedIn = true;
        typeOfUser = "user";
      }
    } else {
      console.log("finns inget utan helt tom");
      loggedIn = null;
    }
  };
  checkLS();
  return (
    <nav className="w-full bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600 border-b-1">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/" aria-label="links to the homepage">
              <img
                src={logo}
                height={"28px"}
                width={"100"}
                // className="h-7"
                alt="icon for the company giftary"
              />
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                aria-label="Button navbar"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-label="hamburgermeny"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <div className=" space-x-10 lg:flex">
              <Link
                to={"/"}
                className="hover:underline"
                aria-label="links back home"
              >
                Hem
              </Link>
              <Link
                to={"/Toplist"}
                className="hover:underline"
                aria-label="links to the toplist"
              >
                Topplista
              </Link>
              {typeOfUser === "user" ? (
                <Link
                  to={"/UserProductList"}
                  aria-label="links to the user saved products"
                >
                  Sparade produkter
                </Link>
              ) : (
                <></>
              )}
              {typeOfUser === "company" ? (
                <Link
                  to={"/ProductOverview"}
                  className="hover:underline"
                  aria-label="links to the companies created products"
                >
                  Dina produkter
                </Link>
              ) : (
                <></>
              )}
              {loggedIn === true ? (
                <Link
                  to={`/profile/${ID}`}
                  className="hover:underline"
                  aria-label="Links to thier profile"
                >
                  Profil
                </Link>
              ) : (
                <></>
              )}
              {loggedIn === true ? (
                <button
                  onClick={() => clearLS()}
                  className="hover:underline"
                  aria-label="singed out user"
                >
                  Logga ut
                </button>
              ) : (
                <Link
                  to={"/login"}
                  className="hover:underline"
                  aria-label="links to login to user to singed in"
                >
                  Logga in{" "}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
