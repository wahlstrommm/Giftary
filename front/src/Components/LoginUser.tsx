import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { INewUser } from "../Models/User/INewUser";

const LoginUser = () => {
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
  //for react hooks form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showModal, setShowModal] = useState(false);
  const [reponsText, setReponsText] = useState("");
  const [loginContainer, setLoginContainer] = useState(false);

  //react forms
  const onSubmit = (data: any) => {
    console.log(data);
    let user: INewUser = {
      firstName: "",
      lastName: "",
      sex: [],
      phone: "",
      email: data.email,
      password: data.password,
      productList: [],
    };

    handlePrivateUser(user);
  };

  //if sucessful login and they exits the popup box that displays diffrent alternatives depending on what type of user the timer will start
  const handleModal = () => {
    console.log("LOCAL", LocalS);
    if (LocalS === "") {
      setShowModal(!showModal);
    } else if (LocalS.isAllowed === true) {
      setShowModal(!showModal);
      if (window.location.href === "http://localhost:3002/Login") {
        timer();
      }
    }
  };

  //Timer for when user is logged in and click on the background
  const timer = () => {
    setTimeout(() => {
      window.location.href = "http://localhost:3002/";
    }, 2000);
  };

  //for the private user
  const handlePrivateUser = async (data: any) => {
    if (!LocalS) {
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
            console.log(result);
            if (result) {
              reset({ email: "", password: "" });
              setReponsText(result.message);
              setShowModal(true);
              if (result.user.isAllowed === true) {
                setLoginContainer(true);
              }
            } else if (result.user.isAllowed === undefined) {
              reset({ email: "", password: "" });
              setReponsText(result.message);
              setShowModal(true);
            }

            let loggedUser = {
              isAllowed: result.user.isAllowed,
              _id: result.user._id,
              type: "user",
              email: result.user.email,
            };
            localStorage.setItem("loggedinUser", JSON.stringify(loggedUser));
          });
      } catch (error) {
        console.error("Fel ", error);
      }
    } else {
      console.log("redan inloggad men försöker logga in på nytt");
    }
  };
  return (
    <div className="flex justify-center h-full w-full">
      <div className=" bg-slate-50 flex justify-center items-center align-middle text-center shadow-md rounded px-1 pt-2 pb-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-11"
          aria-label="form the private user"
        >
          <h1>Logga in</h1>
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="text"
            className="m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-fslate-900 focus:shadow-outline"
            placeholder="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <p>Var snäll att fylll i din email</p>}

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
          {errors.password && <p>Var snäll att fylll i ditt lösenord</p>}

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
                className="flex justify-evenly "
                style={
                  loginContainer === true
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <Link to={"/"}>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5"
                    aria-label="Button that will link back home for the user"
                  >
                    Hem
                  </button>
                </Link>
                <Link to={"/UserProductList"}>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5"
                    aria-label="Button that will link the user to their lists"
                  >
                    Dina listor
                  </button>
                </Link>
                <Link to={"/Toplist"}>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5"
                    aria-label="Button that will link the user to the Toplist"
                  >
                    Topplista
                  </button>
                </Link>
              </div>
              <button
                className="rounded w-7 absolute top-2 left-3 bg-blue-500 hover:bg-blue-700 text-white font-bold"
                aria-label="Button that will close the popup modal"
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
