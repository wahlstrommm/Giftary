import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
const SharedList = () => {
  const { id } = useParams();
  const [productArray, setProductArray] = useState([]);
  useEffect(() => {
    if (productArray.length > 0) return;

    fetch("http://localhost:3000/api/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.find[0]);
        setProductArray(result.find[0].productList);
        console.log(productArray);
        // setProductArray(result.products);
      });
  }, []);
  const produktHandler = async (produktID: any, product: any) => {
    console.log(produktID, product);
    try {
      await fetch("http://localhost:3000/api/products/details/" + produktID, {
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
            console.log(result);
            localStorage.setItem(
              "product",
              JSON.stringify(result.Foundproduct)
            );
            window.location.href = result.url;
          } else {
            console.log("Något fel hände...");
          }
        });
    } catch (error) {
      console.error("Fel ", error);
    }
  };
  console.log(window.location.href);
  console.log(id);
  return (
    <div>
      <Navbar />
      <h1>Någon har delat sin lista! </h1>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {productArray.map((product: any, id: any) => (
          <div key={id} className="group relative">
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-600 group-hover:opacity-75 lg:aspect-none lg:h-80 ">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
              <p>IMG</p>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  namn:
                  <button onClick={() => produktHandler(product._id, product)}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </button>
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Beskrivning: {product.summary}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                Pris: {product.price} kr
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedList;
