import React, { useState } from "react";
import CreateUserform from "./CreateUserform";
import LoginCompany from "./LoginCompany";
import LoginUser from "./LoginUser";

const LoginForm = () => {
  const [loginContainerCompany, setLoginContainerCompany] = useState(false);
  const [loginContainerUser, setLoginContainerUser] = useState(false);
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
          {/*Privat*/}
          <LoginUser />
        </div>
        <div
          style={
            loginContainerCompany === true
              ? { display: "block" }
              : { display: "none" }
          }
        >
          {/* Företag */}
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
