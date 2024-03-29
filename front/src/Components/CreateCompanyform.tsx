import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { INewCompany } from "../Models/Company/INewCompany";

const CreateCompanyform = () => {
  const [showModal, setShowModal] = useState(false);
  const [reponsText, setReponsText] = useState("");
  //react form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  //popup modal
  const handleModal = (e: any | void | undefined | HTMLDivElement) => {
    setShowModal(!showModal);
  };
  //submit
  const onSubmit = (data: any) => {
    if (data) {
      let company: INewCompany = {
        name: data.name,
        orgNumber: data.orgNumber,
        products: [],
        password: data.password,
        companyName: data.companyName,
      };

      handleCompanyUser(company);
    } else {
      console.log(errors);
    }
  };

  const handleCompanyUser = (data: any) => {
    if (!data.name || !data.orgNumber || !data.password) {
    } else {
      try {
        fetch("http://localhost:3000/api/register/Company", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.company) {
              setShowModal(true);
              reset({ name: "", orgNumber: "", companyName: "", password: "" });
              setReponsText(response.message);
              return;
            } else {
              reset({ name: "", orgNumber: "", companyName: "", password: "" });
              setReponsText(response.message);
              setShowModal(true);
            }
          });
      } catch (error) {
        console.log("fel", error);
      }
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Aktiekod{" "}
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-fslate-900 focus:shadow-outline"
            aria-label="shorter name for the company"
            placeholder="Aktiekod "
            {...register("name", { required: true, max: -2, maxLength: 12 })}
          />
          {errors.name && <p>Var snäll och skriv in namnet på företaget</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="orgNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Organisationsnummer
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-fslate-900 focus:shadow-outline"
            aria-label="org number input"
            placeholder="Organisationsnummer"
            {...register("orgNumber", { required: true, maxLength: 80 })}
          />
          {errors.orgNumber && (
            <p>Var snäll och skriv in ert organisationsnummer aktiekode</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Lösenord
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-fslate-900 focus:shadow-outline"
            aria-label="password input"
            placeholder="Lösenord"
            {...register("password", { required: true, maxLength: 100 })}
          />
          {errors.password && (
            <p>Var snäll och skriv in ert önskade lösenord </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="companyName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Företagsnamn
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-fslate-900 focus:shadow-outline"
            aria-label="full company name input"
            placeholder="Företagsnamn"
            {...register("companyName", { required: true, maxLength: 100 })}
          />
          {errors.companyName && (
            <p>Var snäll och skriv in namnet på ert företag</p>
          )}
        </div>

        <div className="flex items-center justify-center">
          <input
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </form>
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-around items-center"
        aria-label="close the modal"
        style={showModal === true ? { display: "block" } : { display: "none" }}
        onClick={handleModal}
      >
        <div className="flex justify-center justify-items-center align-middle text-center top-1/3 relative">
          <div className="bg-white p-6 rounded  h-2/5 w-2/5 relative">
            <p>{reponsText}</p>
            <button
              className="rounded w-7 absolute top-2 left-3 bg-blue-500 hover:bg-blue-700 text-white font-bold"
              aria-label="close the modal"
            >
              X
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCompanyform;
