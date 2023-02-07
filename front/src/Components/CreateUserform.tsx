import React, { useState } from "react";
import { INewUser } from "../Models/User/INewUser";
import { useForm } from "react-hook-form";
import CreateCompanyform from "./CreateCompanyform";

const CreateUserForm = () => {
  const [userChoice, setUserChoice] = useState("");
  const [reponsText, setReponsText] = useState("");
  const [showModal, setShowModal] = useState(false);
  //React form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    if (data) {
      let costumer: INewUser = {
        firstName: data.firstName,
        lastName: data.lastName,
        sex: data.sex,
        phone: data.phone,
        email: data.email,
        password: data.password,
        productList: [],
      };

      handlePrivateUser(costumer);
    } else {
      console.log(errors);
    }
  };

  const handleModal = (e: any | void | undefined | HTMLDivElement) => {
    console.log(e);
    setShowModal(!showModal);
  };

  const handlePrivateUser = (data: any) => {
    if (
      !data.firstName ||
      !data.lastName ||
      !data.sex ||
      !data.phone ||
      !data.email ||
      !data.password
    ) {
    } else {
      try {
        fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.user) {
              setShowModal(true);
              reset({
                firstName: "",
                lastName: "",
                sex: "",
                email: "",
                password: "",
                phone: "",
              });
              setReponsText(response.message);
              return;
            } else {
              setShowModal(true);
              reset({
                firstName: "",
                lastName: "",
                sex: "",
                email: "",
                password: "",
                phone: "",
              });
              setReponsText(response.message);
            }
          });
      } catch (error) {
        console.log("fel", error);
      }
    }
  };
  return (
    <div>
      {/* userchoice button private or company */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-evenly relative">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          aria-label="button for the choice for type private user"
          type="button"
          onClick={() => setUserChoice("Privatperson")}
        >
          {" "}
          Privat
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          aria-label="button for the choice for type company user"
          onClick={() => setUserChoice("Företag")}
        >
          {" "}
          Företag
        </button>
      </div>

      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-around items-center"
        style={showModal === true ? { display: "block" } : { display: "none" }}
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

      <div
        id="createUserContainer"
        style={
          userChoice === "Privatperson"
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4 ">
            <label
              htmlFor="firstName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Förnamn
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-fslate-900 focus:shadow-outline"
              type="text"
              placeholder="Förnamn"
              aria-label="First name input"
              {...register("firstName", { required: true, maxLength: 80 })}
            />
            {errors.firstName && <p>Var snäll och skriv in ditt förnamn</p>}
          </div>

          <div className="mb-4 ">
            <label
              htmlFor="lastName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Efternamn
            </label>

            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-900 focus:shadow-outline"
              aria-label="Last name inpute"
              placeholder="Efternamn"
              {...register("lastName", { required: true, maxLength: 100 })}
            />
            {errors.lastName && <p>Var snäll och skriv in ditt efternamn</p>}
          </div>

          <label
            htmlFor="sex"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Kön
          </label>

          <div className="mb-4 max-w-full rounded bg-slate-200 border-slate-800 border-2 flex items-center align-middle">
            <select
              className="w-full text-center"
              aria-label="select form for what type of sex"
              {...register("sex", { required: true })}
            >
              <option value="Man" aria-label="type man">
                Man
              </option>
              <option value="Kvinna" aria-label="type woman">
                Kvinna
              </option>
              <option value="Annat" aria-label="type diffrent nonbinary">
                Annat
              </option>
            </select>
            {errors.sex && <p>Var snäll och välj ditt kön</p>}
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-slate-900 focus:shadow-outline"
              aria-label="type email"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: true,
                min: 1,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors.email && <p>Var snäll och skriv in din email</p>}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Lösenord
            </label>
            <input
              className="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-slate-900 focus:shadow-outline"
              type="text"
              aria-label="password input"
              placeholder="Lösenord"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p>Var snäll och skriv in ditt önskade lösenord</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Telefonnummer
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-slate-900 focus:shadow-outline"
              type="text"
              aria-label="input phone"
              placeholder="Telefonnummer"
              {...register("phone", {
                required: true,
                maxLength: 12,
                pattern: /[0-9]/i,
              })}
            />
            {errors.phone && <p>Var snäll och skriv in ditt telefonnummer</p>}
          </div>

          <div className="flex items-center justify-center">
            <input
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </div>
        </form>
      </div>
      {/* Company */}
      <div
        style={
          userChoice === "Företag" ? { display: "block" } : { display: "none" }
        }
      >
        <CreateCompanyform />
      </div>
    </div>
  );
};

export default CreateUserForm;
