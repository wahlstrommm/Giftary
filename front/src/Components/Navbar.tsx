import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  let typeOfUser: any;
  let loggedIn: any;
  const clearLS = () => {
    window.localStorage.clear();
    window.location.reload();
  };
  const checkLS = async () => {
    let LS: any = localStorage.getItem("loggedinUser");
    let LSParsed = JSON.parse(LS);
    console.log(LSParsed);
    if (LSParsed) {
      console.log("finns");
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
    <nav className="container flex justify-between px-4 py-8 mx-auto bg-white">
      <div>
        <h3 className="text-2xl font-medium text-blue-500">LOGO</h3>
      </div>
      <div className="hidden space-x-8 lg:flex">
        <p>LOL</p>
        <Link to={"/"}>Home</Link>
        <Link to={"/Toplist"}>Toplist</Link>
        {typeOfUser === "user" ? (
          <Link to={"/UserProductList"}>Sparade produkter</Link>
        ) : (
          <></>
        )}
        {typeOfUser === "company" ? (
          <Link to={"/ProductOverview"}>Dina produkter</Link>
        ) : (
          <></>
        )}
        <Link to={"/"}>Extra</Link>
        {loggedIn === true ? (
          <button onClick={() => clearLS()}>Logga ut</button>
        ) : (
          <Link to={"/login"}>Logga in </Link>
        )}
      </div>
      <div className="flex lg:hidden">
        <div className="space-y-2">
          <span className="block w-8 h-0.5 bg-gray-600 animate-pulse"></span>
          <span className="block w-8 h-0.5 bg-gray-600 animate-pulse"></span>
          <span className="block w-8 h-0.5 bg-gray-600 animate-pulse"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
