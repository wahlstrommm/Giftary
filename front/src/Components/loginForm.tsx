import React, { useState,ChangeEvent} from "react";
import CreateUserform from "./CreateUserform";
const LoginForm = () => {

  const  [userInfo,setUserInfo]=useState({
    username:"",
    password:""
  })

  const [showContainer, setShowContainer] = useState(false);

  const handleClick = () => {
    setShowContainer(!showContainer);
  };

  const handleLogin =()=>{
    console.log("USER OBJ",userInfo)
  }

  const handleUsername = (e:ChangeEvent<HTMLInputElement>) => {  
    let username = e.target.value;
    console.log("username",username);
    setUserInfo({ ...userInfo, username:username})
  };

  const handlePassword = (e:ChangeEvent<HTMLInputElement>) => {
    let password = e.target.value;
    console.log("password",password);
    setUserInfo({ ...userInfo, password:password})
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Användarnamn
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Användarnamn"
              onChange={handleUsername}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Lösenord
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={handlePassword}
            />
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={()=>handleLogin()}
            >
              Logga in
            </button>
          </div>
        </form>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <button
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            onClick={() => handleClick()}
          >
            Skapa ett konto
          </button>
        </div>
        <div style={showContainer ? { display: "block" } : { display: "none" }}>
          <CreateUserform></CreateUserform>
        </div>
        <p className="text-center text-gray-500 text-xs">
          &copy;2023 MW Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
