import React, { useState } from "react";
import CreateUserform from "./CreateUserform";
// import { useForm } from "react-hook-form";
import LoginCompany from "./LoginCompany";
import LoginUser from "./LoginUser";

const LoginForm = () => {
  // const { register, handleSubmit,reset , formState: { errors } } = useForm();
  // const [userChoice, setUserChoice] = useState("");
  const [loginContainerCompany, setLoginContainerCompany] = useState(false);
  const [loginContainerUser, setLoginContainerUser] = useState(false);
  // const  [userInfo,setUserInfo]=useState({
  //   username:"",
  //   password:""
  // })

  // const checkWhatTypeLogin = (user:string)=>{
  //   return /^\d+$/.test(str)
  // }
  // const handleTypeOfLogin = (e:any|undefined)=>{
  //   console.log(e.target.event);
  //   setUserChoice(e);
  // }
  // const onSubmit = (data:any) => {
  //   let email = data.email
  //   console.log(data)
  //   // if(/^[0-9]+$/.test(email)){
  //   //   console.log("nummer");
  //   // }else{
  //   //   console.log("sträng");
  //   // }

  //   // console.log(errors);
  // };

  const [showContainer, setShowContainer] = useState(false);

  const handleClick = () => {
    setShowContainer(!showContainer);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xs">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-row justify-evenly">
          <div className="flex justify-evenly gap-6">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              name="privat"
              value="privat"
              onClick={() => setLoginContainerUser(!loginContainerUser)}
            >
              Privat
            </button>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              name="company"
              value="company"
              onClick={() => setLoginContainerCompany(!loginContainerCompany)}
            >
              Företag
            </button>
          </div>
        </div>
        <div
          style={
            loginContainerUser === true
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <h1>ÄR i Privat</h1>
          <LoginUser />
        </div>
        {/* className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-around items-center"  */}
        <div
          style={
            loginContainerCompany === true
              ? { display: "block" }
              : { display: "none" }
          }
        >
          {/* <h1>ÄR i Företag</h1> */}
          <LoginCompany />
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center">
          <button
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            onClick={() => handleClick()}
          >
            {" "}
            Skapa ett konto
          </button>
        </div>
        <div style={showContainer ? { display: "block" } : { display: "none" }}>
          <CreateUserform />
        </div>
        <p className="text-center text-gray-500 text-xs">
          &copy;2023 MW Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
