import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { INewUser } from "../Models/User/INewUser";

const LoginUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showModal, setShowModal] = useState(false);
  const [reponsText, setReponsText] = useState("");

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

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handlePrivateUser = async (data: any) => {
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
          } else {
            reset({ email: "", password: "" });
            setReponsText(result.message);
            setShowModal(true);
          }

          let loggedUser = {
            isAllowed: result.isAllowed,
            _id: result._id,
          };
          localStorage.setItem("loggedinUser", JSON.stringify(loggedUser));
        });
    } catch (error) {
      console.error("Fel ", error);
    }
  };
  return (
    <div className="flex justify-center w-full">
      <div className=" bg-slate-50 flex justify-center items-center align-middle text-center shadow-md rounded px-1 pt-6 pb-8">
        <form onSubmit={handleSubmit(onSubmit)} className="p-11">
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
            <div className="bg-white p-6 rounded  h-2/5 w-2/5 relative">
              <p>{reponsText}</p>
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

export default LoginUser;
