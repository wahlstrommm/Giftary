import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Generator = () => {
  const [productArray, setProductArray] = useState([]);
  const [randomItemLayout, setRandomItemLayout] = useState(<></>);
  const [genderArray, setGenderArray] = useState([]);
  const [ageArray, setAgeArray] = useState([]);
  const [resultArray, setResultArray] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [counter, setCounter] = useState(1);
  const [showResult, setShowResult] = useState(true);
  const [questionText, setQuestionText] = useState(
    "Är det en kille eller tjej?"
  );
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

  const getRandomItemHandler = () => {
    if (productArray.length === 0) {
      console.log("Något gick fel....");
    } else {
      let randomItem =
        productArray[Math.floor(Math.random() * productArray.length)];
      console.log("Random:", randomItem);
      let randomItem2: any = [];
      randomItem2.push(productArray[58]);

      // randomItem2.push(randomItem);
      if (randomItem) {
        setRandomItemLayout(
          <div className="flex justify-center text-center">
            <h2 className="sr-only">Products</h2>

            <div className="flex justify-center mb-2 ">
              {randomItem2.map((i: any) => (
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
    // {
    //   questionText: "The iPhone was created by which company?",
    //   answerOptions: [
    //     { answerText: "Apple", isCorrect: true },
    //     { answerText: "Intel", isCorrect: false },
    //     { answerText: "Amazon", isCorrect: false },
    //     { answerText: "Microsoft", isCorrect: false },
    //   ],
    // },
    // {
    //   questionText: "How many Harry Potter books are there?",
    //   answerOptions: [
    //     { answerText: "1", isCorrect: false },
    //     { answerText: "4", isCorrect: false },
    //     { answerText: "6", isCorrect: false },
    //     { answerText: "7", isCorrect: true },
    //   ],
    // },
  ];

  let answer1: string = "";
  let answer2: string = "";
  // let counter = 0;
  const handleAnswerOptionClick = (userinput: any) => {
    // questions[counter - 1].questionText
    setQuestionText("Är det personen över eller under 18 år?");

    // setQuestionText();
    // console.log(questions[counter - 1].questionText);
    console.log(userinput);
    if (counter < 2) {
      setCounter(counter + 1);
      console.log("counter", counter);

      if (userinput === "kille" || "Tjej") {
        answer1 = userinput;
      } else if (userinput === "Över 18" || "Under 18")
        if ("Över 18") {
          answer2 = "over age";
          return;
        } else {
          answer2 = "under age";
          return;
        }
    }
    // if (isCorrect) {
    // setScore(score + 1);
    // }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // setShowScore(true);
    }
  };
  return (
    <div className="h-full bg-white">
      <Navbar />
      <div className="h-screen bg-white">
        <div className="flex justify-center items-center h-5/6 flex-col w-12/12">
          <h1>Generator</h1>

          {/* <div className="bg-green-300 w-/5 rounded-t-lg"> */}
          {/* <h1>hej</h1> */}
          {/* </div> */}
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
                {/* <div className="flex gap-7relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <button className="bg-green-100">1</button>
                  <button className="bg-green-100">2</button>
                </div> */}
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
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
                          <p className="text-sm text-gray-500">
                            {/* Are you sure you want to deactivate your account?
                            All of your data will be permanently removed. This
                            action cannot be undone. */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex justify-center gap-12 sm:px-6">
                    {questions[currentQuestion].answerOptions.map(
                      (answerOption, i) => (
                        <button
                          key={i}
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() =>
                            handleAnswerOptionClick(answerOption.answerText)
                          }
                        >
                          {answerOption.answerText}
                        </button>
                        /* <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() =>
                              handleAnswerOptionClick(
                                answerOption.answerText[1]
                              )
                            }
                            // ref={cancelButtonRef}
                          >
                            {answerOption.answerText}
                          </button> */
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Generator;
