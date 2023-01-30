import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Generator = () => {
  const [productArray, setProductArray] = useState([]);
  const [randomItemLayout, setRandomItemLayout] = useState(<></>);
  const [showGenerateItem, setShowGenerateItem] = useState(<></>);
  const [resultArray, setResultArray] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [counter, setCounter] = useState(1);
  const [showResult, setShowResult] = useState(true);
  const [questionText, setQuestionText] = useState(
    "Är det en kille eller tjej?"
  );
  const [showGeneratedItemLayout, setshowGeneratedItemLayout] = useState(false);
  useEffect(() => {
    if (productArray.length > 0) return;
    fetch("http://localhost:3000/api/products/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setProductArray(result);
      });
  }, []);
  // useEffect(() => {
  //   getRandomItemHandler();
  // }, []);
  const getRandomItemHandler = () => {
    if (productArray.length === 0) {
      console.log("Något gick fel....");
    } else {
      let randomItem =
        productArray[Math.floor(Math.random() * productArray.length)];
      console.log("Random:", randomItem);
      let randomItem2: any = [];
      randomItem2.push(productArray[58]);

      if (randomItem) {
        setRandomItemLayout(
          <div className="flex justify-center text-center flex-col h-2">
            <h2 className="sr-only">Products</h2>

            <div className="flex justify-center mb-1 flex-col">
              {randomItem2.map((i: any) => (
                <div key={i._id}>
                  <a
                    href={"http://localhost:3002/product/" + i._id}
                    className="group"
                  >
                    <div className="flex justify-center  mt-1">
                      <img
                        src={i.image[0]}
                        alt={i.image[0]}
                        className="h-fit w-fit object-cover object-center group-hover:opacity-75 rounded-2xl"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">{i.name}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {i.price}
                    </p>
                  </a>
                  <a href={"http://localhost:3002/product/" + i._id}>
                    <button>Till produkten</button>
                  </a>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                getRandomItemHandler();
              }}
            >
              Slumpa ny
            </button>
          </div>
        );
      }
    }
  };
  const questions = [
    {
      questionText: "Är det en kille eller tjej?",
      answerOptions: [
        { answerText: "Kille", isCorrect: "forHim" },
        { answerText: "Tjej", isCorrect: "ForHer" },
      ],
    },
    {
      questionText: "Är det personen över eller under 18 år?",
      answerOptions: [
        { answerText: "Under 18", isCorrect: "under18" },
        { answerText: "Över 18", isCorrect: "over18" },
      ],
    },
  ];

  let answer1: string = "";
  let answer2: string = "";
  const handleAnswerOptionClick = (userinput: any) => {
    setQuestionText("Är det personen över eller under 18 år?");

    console.log(userinput);
    if (counter === 1) {
      setCounter(counter + 1);
      console.log("counter", counter, userinput);

      // if (userinput === "forHim" || "ForHer") {
      answer1 = userinput;
      let resultProducts = productArray.filter(
        (product) => product["category"] === answer1
      );
      setResultArray(resultProducts);
      console.warn(resultProducts);
      console.log(productArray);
    }
    if (counter >= 2) {
      answer2 = "18";

      if (userinput === "over18") {
        let random =
          resultArray[Math.floor(Math.random() * resultArray.length)];
        let array: any = [];
        array.push(random);

        console.log("IS SISSTA ", random);
        setshowGeneratedItemLayout(!showGeneratedItemLayout);

        setShowGenerateItem(
          <div className="flex justify-center text-center">
            <h2 className="sr-only">Products</h2>

            <div className="flex justify-center mb-2 ">
              {array.map((i: any) => (
                <div key={i._id}>
                  <a
                    href={"http://localhost:3002/product/" + i._id}
                    className="group"
                  >
                    <div className="flex justify-center mt-2">
                      <img
                        src={i.image[0]}
                        alt={i.image[0]}
                        className="h-full w-full object-cover object-center group-hover:opacity-75 rounded-2xl"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">{i.name}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {i.price}
                    </p>
                  </a>
                  <a href={"http://localhost:3002/product/" + i._id}>
                    <button>Till produkten</button>
                  </a>
                </div>
              ))}
            </div>
            {/* <button onClick={() => setShowResult(!showResult)}>
              ta fram en ny produkt
            </button> */}
          </div>
        );
      } else {
        // answer2 = userinput;
        let random =
          resultArray[Math.floor(Math.random() * resultArray.length)];
        setResultArray([]);
        let array: any = [];
        array.push(random);

        setshowGeneratedItemLayout(!showGeneratedItemLayout);
        setShowGenerateItem(
          <div className="flex justify-center text-center">
            <h2 className="sr-only">Products</h2>

            <div className="flex justify-center mb-2 ">
              {array.map((i: any) => (
                <div key={i._id}>
                  <a
                    href={"http://localhost:3002/product/" + i._id}
                    className="group"
                  >
                    <div className="flex justify-center mt-2">
                      <img
                        src={i.image[0]}
                        alt={i.image[0]}
                        className="h-full w-full object-cover object-center group-hover:opacity-75 rounded-2xl"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">{i.name}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {i.price}
                    </p>
                  </a>
                  <a href={"http://localhost:3002/product/" + i._id}>
                    <button>Till produkten</button>
                  </a>
                </div>
              ))}
            </div>
            {/* <button onClick={() => setShowResult(!showResult)}>
              ta fram en ny produkt
            </button> */}
          </div>
        );
      }
    } else {
      console.log("i else");
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    }
  };
  return (
    <div className="h-full bg-white">
      <Navbar />
      <div className="h-screen bg-white">
        <div className="flex justify-center items-center h-5/6 flex-col w-12/12">
          <h1>Generator</h1>
          <div className="bg-slate-600 w-11/12 h-4/5 rounded-md flex justify-center items-center flex-col">
            {showResult ? (
              <div className="bg-red-400 h-5/6 w-11/12 flex justify-center align-middle items-center flex-col gap-3">
                <div className="bg-white w-full">{randomItemLayout}</div>
                <div className="">
                  <button
                    className="bg-white"
                    onClick={() => {
                      setShowResult(!showResult);
                    }}
                  >
                    Generator
                  </button>
                </div>

                <button
                  className="top-3 relative bg-red-100"
                  onClick={() => {
                    getRandomItemHandler();
                  }}
                >
                  Slumpa random
                </button>
              </div>
            ) : (
              <div className="bg-red-400 h-5/6 w-11/12 flex justify-center align-middle items-center flex-col gap-3">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div
                      style={
                        showGeneratedItemLayout === true
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <p>hej</p>
                      {showGenerateItem}
                    </div>
                    <div
                      className="sm:flex sm:items-start"
                      style={
                        showGeneratedItemLayout === false
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <div
                          className="h-6 w-6 text-red-600 text-center flex justify-center align-middle items-center"
                          aria-hidden="true"
                        />
                        <h2 className="text-center right-3 relative">
                          {counter}
                        </h2>
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Fråga:{questionText}
                        </h3>

                        <div className="mt-2">
                          {/* <p className="text-sm text-gray-500">
                            {/* Are you sure you want to deactivate your account?
                            All of your data will be permanently removed. This
                            action cannot be undone. */}
                          {/* </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-gray-50 px-4 py-3 sm:flex sm:flex justify-center gap-12 sm:px-6"
                    style={
                      showGeneratedItemLayout === false
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    {questions[currentQuestion].answerOptions.map(
                      (answerOption, i) => (
                        <button
                          key={i}
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() =>
                            handleAnswerOptionClick(answerOption.isCorrect)
                          }
                        >
                          {answerOption.answerText}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Generator;
