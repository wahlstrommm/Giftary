import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";

const Profile = () => {
  let typeOfUser: any;
  let loggedIn: any;
  let companyName: any = "";
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [numOfList, setNumOfList] = useState("1");
  const [products, setProducts] = useState("");
  const [numOfItems, setNumOfItems] = useState("");
  const [btnUrl, setBtnUrl] = useState("");
  const [btnUrl2, setBtnUrl2] = useState("");
  const [btnText, setBtnText] = useState("");
  const [btnText2, setBtnText2] = useState("");
  let ID: any = "";
  let resultFromFetch: any;
  let array: any;

  useEffect(() => {
    if (typeOfUser === "user") {
      fetch("http://localhost:3000/api/user/users/" + ID)
        .then((response) => response.json())
        .then((data) => {
          resultFromFetch = data.result;
          setNumOfItems(resultFromFetch.productList.length);

          array = resultFromFetch.productList;
          setProducts("Sparade");
          setBtnText("Lista");
          setBtnText2("Generator");
          setBtnUrl("/UserProductList");
          setBtnUrl2("/Generator");
          setFname(resultFromFetch.firstName);
          setLname(resultFromFetch.lastName);
          setPhone(resultFromFetch.phone);
          setAge(resultFromFetch.sex);
          setEmail(resultFromFetch.email);
        });
    } else {
      return;
    }
    return;
  }, []);

  useEffect(() => {
    if (typeOfUser === "company") {
      fetch("http://localhost:3000/api/user/company/" + companyName)
        .then((response) => response.json())
        .then((data) => {
          resultFromFetch = data.result;

          array = resultFromFetch[0].products;
          console.log(array);
          setNumOfItems(array.length);
          setProducts("Skapade");
          setBtnText("Skapa ny");
          setBtnText2("Dina produkter");
          setBtnUrl("/CreateProduct");
          setBtnUrl2("/ProductOverview");
          setFname(resultFromFetch[0].name);
          setAge(resultFromFetch[0].orgNumber);
          setEmail(resultFromFetch[0].orgNumber);
        });
    } else {
      return;
    }
  }, []);

  const checkLS = async () => {
    let LS: any = localStorage.getItem("loggedinUser");
    let LSParsed = JSON.parse(LS);
    if (LSParsed) {
      ID = LSParsed._id;

      console.log("finns");
      if (LSParsed.isAllowed && LSParsed.type === "company") {
        loggedIn = true;
        typeOfUser = "company";
        companyName = LSParsed.name;
      } else if (LSParsed.isAllowed && LSParsed.type === "user") {
        loggedIn = true;
        typeOfUser = "user";
      }
    } else {
      console.log("finns inget utan helt tom");
      loggedIn = null;
      window.location.href = "http://localhost:3002/";
    }
  };
  checkLS();

  return (
    <div>
      <Navbar />
      <div className="p-16 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
        <div className="p-8  mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-slate-400 text-xl">{numOfList}</p>
                <p className="text-white">Lista</p>
              </div>
              <div>
                <p className="font-bold text-slate-400 text-xl">{numOfItems}</p>
                <p className="text-white">{products}</p>
              </div>
            </div>
            <div className="relative">
              <motion.div
                className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500"
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            </div>

            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <Link to={btnUrl}>
                <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  {btnText}
                </button>
              </Link>
              <Link to={btnUrl2}>
                <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  {btnText2}
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-20 text-center pb-12">
            <h1 className="text-4xl font-medium text-slate-400">
              {fname} {lname},{" "}
              <span className="font-light text-gray-400">{age}</span>
            </h1>
            <p className="font-light text-gray-200 mt-3">{phone}</p>

            <p className="mt-8 text-gray-500">
              {email} {companyName}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
