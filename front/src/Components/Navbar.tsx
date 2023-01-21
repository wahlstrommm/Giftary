import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="container flex justify-between px-4 py-8 mx-auto bg-white">
      <div>
        <h3 className="text-2xl font-medium text-blue-500">LOGO</h3>
      </div>
      <div className="hidden space-x-8 lg:flex">
        <p>LOL</p>
        <Link to={"/"}>Home</Link>
        <Link to={"/Toplist"}>Toplist</Link>
        {/* <Link to={"/"}>Extra</Link> */}
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
