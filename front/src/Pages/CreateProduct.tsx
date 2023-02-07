import Navbar from "../Components/Navbar";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IProduct } from "../Models/Product/IProduct";
import { Link } from "react-router-dom";

const CreateProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const [reponsText, setReponsText] = useState("");

  //react form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      summary: "",
      age: "",
      aimedFor: "",
      category: "",
      price: "",
      image: [null || undefined],
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      overAge: false,
      // exampleRequired: "",
    },
  });
  //created product submit
  const onSubmit = (data: any) => {
    if (data) {
      let product: IProduct = {
        name: data.name,
        summary: data.summary,
        age: data.age,
        aimedFor: data.aimedFor,
        price: data.price,
        image: [data.image1, data.image2, data.image3, data.image4],
        favorited: false,
        category: data.category,
        companyName: LocalS.name,
        overAge: data.overAge,
      };
      CreateProductHandler(product);
    }
    console.log(errors);
    console.log(data);
  };
  //post the created product
  const CreateProductHandler = async (product: IProduct) => {
    try {
      await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result) {
            reset();
            setReponsText(result.message);
            setShowModal(true);
          } else {
            reset();
            setReponsText(result.message);
            setShowModal(true);
          }
        });
    } catch (error) {
      console.error("Fel ", error);
    }
  };
  let LocalS: any;
  //check the loaclstorage and makes sure that the right user is logged in
  const checkLS = () => {
    let LS: any = localStorage.getItem("loggedinUser");
    let LSParsed = JSON.parse(LS);
    if (LSParsed) {
      if (LSParsed.isAllowed && LSParsed.type === "company") {
        console.log("finns och är allowed");
        LocalS = LSParsed;
        console.log(LSParsed);
      } else {
        console.log("den är nu:", "{}");
        window.location.href = "http://localhost:3002/";
      }
    } else {
      console.log("finns inget utan helt tom");
      window.location.href = "http://localhost:3002/";
      LocalS = {
        isAllowed: false,
      };
    }
  };
  checkLS();

  return (
    <div>
      <Navbar />
      <div className="w-3/3 flex justify-center mt-5 mb-2">
        <div className="mt-5 md:mt-0 w-3/4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            aria-label="form for create product"
          >
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="namn"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Namn
                    </label>
                    <div className="mt-1 flex w-full h-full flex-col">
                      <input
                        className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        aria-label="name input"
                        placeholder="Namn"
                        {...register("name", { required: true })}
                      />
                      {errors.name && (
                        <p>Var snäll att fylll i namnet på din produkt</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    About
                  </label>
                  <div className="mt-1">
                    <textarea
                      placeholder="Beskrivning om produkten"
                      className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      aria-label="summary input"
                      {...register("summary", { required: true })}
                    />
                    {errors.summary && (
                      <p>
                        Var snäll att skriv en bra beskrivande text om din
                        produkt
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="namn"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Passar ålderna
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm h-full flex-col">
                    <input
                      className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      aria-label="aimed for input"
                      type="text"
                      placeholder="Passar åldern"
                      {...register("aimedFor", { required: true })}
                    />
                    {errors.aimedFor && <p>Var snäll att fyll i fältet</p>}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700"
                  >
                    För vuxna
                  </label>
                  <input
                    className="h-6 w-6"
                    type="checkbox"
                    aria-label="checkbox for if the product is for adults"
                    placeholder="overAge"
                    {...register("overAge", {})}
                  />

                  {errors.overAge && (
                    <p>Var snäll att fyll i vilken ålder de passar</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Främst för åldern
                  </label>
                  <input
                    className="rounded-lg bg-gray-50 border text-white focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    aria-label="Input age input"
                    type="number"
                    placeholder="Ålder"
                    {...register("age", {
                      required: true,
                      min: 0,
                      pattern: /^[0-9]+$/,
                    })}
                  />
                  {errors.age && (
                    <p>Var snäll att fyll i vilken ålder de passar</p>
                  )}
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Pris
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm h-full flex-col">
                    <input
                      className="rounded-lg bg-gray-50 border text-white focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      placeholder="Pris"
                      aria-label="input for price"
                      {...register("price", { required: true })}
                    />
                    {errors.price && <p>Var snäll att fyll i vad det kostar</p>}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 pb-1"
                  >
                    Kategori
                  </label>
                  <select
                    className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("category", { required: true })}
                    aria-label="input for diffrent category"
                  >
                    <option value="ForHim" aria-label="option for him">
                      För han
                    </option>
                    <option value="ForHer" aria-label="option for her">
                      För henne
                    </option>
                    <option value="ForUS" aria-label="option for us">
                      För oss
                    </option>
                    <option value="Christmas" aria-label="option christmas">
                      Julklappar
                    </option>
                    <option value="ForLove" aria-label="for love">
                      Kärlek
                    </option>
                    <option value="Alkohol" aria-label="for option alcohol">
                      Alkohol
                    </option>
                    <option value="MomsDay" aria-label="for mothers day">
                      Morsdag
                    </option>
                    <option value="DadsDay" aria-label="for fathers day">
                      Farsdag
                    </option>
                  </select>
                  {errors.category && (
                    <p>Var snäll att fyll i vilken kategori som din passar i</p>
                  )}
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <div className="relative mb-6">
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-label="img of image icon"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M20.4 14.5L16 10 4 20" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Bild URL 1"
                      aria-label="for image url 1"
                      {...register("image1", { required: true })}
                      className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="text-left">
                    {errors.image1 && (
                      <p>
                        Var snäll att bidra med en url till din bild. Fler desto
                        bättre
                      </p>
                    )}
                  </div>
                </div>
                <div className="relative mb-6">
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-label="img of image icon"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M20.4 14.5L16 10 4 20" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Bild URL 2"
                      aria-label="icon for image url input "
                      {...register("image2", {})}
                      className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="relative mb-6">
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-label="img of image icon"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M20.4 14.5L16 10 4 20" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Bild URL 3"
                      aria-label="icon of image"
                      {...register("image3", {})}
                      className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex mb-2">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-label="img of image icon"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M20.4 14.5L16 10 4 20" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    defaultValue={""}
                    placeholder="Bild URL 4"
                    aria-label="input for image url"
                    {...register("image4", {})}
                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <input
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-around items-center"
        style={showModal === true ? { display: "block" } : { display: "none" }}
        // onClick={handleModal}
      >
        <div className="flex justify-center justify-items-center align-middle text-center top-1/3 relative">
          <div className="bg-white p-6 rounded  h-2/5 w-4/5 relative">
            <p>{reponsText}</p>
            <div className="flex justify-around">
              <Link to={"/"}>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-4"
                  aria-label="button that leads to home"
                >
                  Hem
                </button>
              </Link>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-4"
                aria-label="button that gives the user to create a new product"
                onClick={() => {
                  setShowModal(!showModal);
                }}
              >
                Skapa en ny produkt
              </button>
              <Link to={"/ProductOverview"}>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-4"
                  aria-label="that leads a overview of all products"
                >
                  Översikt över alla produkter
                </button>
              </Link>
            </div>
            <Link to={"/"}>
              <button
                className="rounded w-7 absolute top-2 left-3 bg-blue-500 hover:bg-blue-700 text-white font-bold"
                aria-label="that close the popup modal"
              >
                X
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
