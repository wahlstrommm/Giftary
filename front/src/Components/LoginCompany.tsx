import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { INewCompany } from "../Models/Company/INewCompany";

const LoginCompany = () => {
  const [showModal, setShowModal] = useState(false);
  const [reponsText, setReponsText] = useState("");
  const [loginContainer, setLoginContainer] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let LocalS: any = "";
  //checks LocalStorage
  const checkLS = () => {
    let LS: any = localStorage.getItem("loggedinUser");
    let LSParsed = JSON.parse(LS);
    if (LSParsed) {
      console.log("finns");
      if (LSParsed.isAllowed) {
        console.log("finns och är allowed");
        LocalS = LSParsed;
      } else {
        console.log("den är nu:", "{}");
      }
    } else {
      console.log("finns inget utan helt tom");
    }
  };

  checkLS();
  //submit for my form
  const onSubmit = (data: any) => {
    let company: INewCompany = {
      name: "",
      orgNumber: data.orgNumber,
      products: [],
      password: data.password,
      companyName: "",
    };
    handleCompanyUser(company);
  };
  //Timer for when user is logged in and click on the background
  const timer = () => {
    setTimeout(() => {
      window.location.href = "http://localhost:3002/";
    }, 6000);
  };

  const handleModal = () => {
    if (LocalS === "") {
      setShowModal(!showModal);
    } else if (LocalS.isAllowed === true) {
      setShowModal(!showModal);
      timer();
    }
  };

  const handleCompanyUser = async (data: any) => {
    //for stopping user to login again if they are ready logged in.
    if (!LocalS) {
      console.log("I if", LocalS);
      try {
        await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result) {
              reset({ orgNumber: "", password: "" });
              setReponsText(result.message);
              setShowModal(true);
              if (result.company.isAllowed === true) {
                setLoginContainer(true);
              }
            } else if (result.company.isAllowed === undefined) {
              reset({ orgNumber: "", password: "" });
              setReponsText(result.message);
              setShowModal(true);
              setLoginContainer(false);
            }

            let loggedUser = {
              isAllowed: result.company.isAllowed,
              _id: result.company._id,
              type: "company",
              name: result.company.name,
            };
            localStorage.setItem("loggedinUser", JSON.stringify(loggedUser));
          });
      } catch (error) {
        console.error("Fel ", error);
        // setReponsText(error.message);
      }
    } else {
      console.log("redan inloggad men försöker logga in på nytt");
    }
  };
  return (
    <div className="flex justify-center w-full">
      <div className=" bg-slate-50 flex justify-center items-center align-middle text-center shadow-md rounded px-1 pt-6 pb-8">
        <form onSubmit={handleSubmit(onSubmit)} className="p-11">
          <h1>Logga in</h1>
          <label
            htmlFor="org-nummer"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Org- nummer
          </label>
          <input
            type="text"
            className="m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-fslate-900 focus:shadow-outline"
            placeholder="org-Num"
            {...register("orgNumber", { required: true })}
          />
          <label
            htmlFor="lösenord"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Lösenord
          </label>
          <input
            type="password"
            className="m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-fslate-900 focus:shadow-outline"
            placeholder="password"
            {...register("password", { required: true, maxLength: 80 })}
          />

          <input
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </form>
        <div
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-around items-center"
          style={
            showModal === true ? { display: "block" } : { display: "none" }
          }
          onClick={handleModal}
        >
          <div className="flex justify-center justify-items-center align-middle text-center top-1/3 relative">
            <div className="bg-white p-6 rounded  h-2/5 w-4/5 relative">
              <p>{reponsText}</p>
              <div
                className="flex justify-evenly"
                style={
                  loginContainer === true
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <Link to={"/"}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-4">
                    Hem
                  </button>
                </Link>
                <Link to={"/CreateProduct"}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-4">
                    Skapa produkt
                  </button>
                </Link>
                <Link to={"/ProductOverview"}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-4">
                    Produkter
                  </button>
                </Link>
              </div>
              <button className="rounded w-7 absolute top-2 left-3 bg-blue-500 hover:bg-blue-700 text-white font-bold">
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCompany;
