import React, { useState, useEffect,ChangeEvent } from "react";
import { NewUser } from "../Models/User/NewUser";
import { INewUser } from "../Models/User/INewUser";
import { INewCompany } from "../Models/Company/INewCompany";
import { NewCompany } from "../Models/Company/NewCompany";

const CreateUserForm = () => {
  const [userChoice, setUserChoice] = useState("");

  const handleClick = (userChoice:any) => {
    console.log(userChoice);
    console.log(userChoice);
    handleSex(userChoice);
  };

  const [activeCheckbox, setActiveCheckbox] = useState(false);

  const handleChange = (e:any) => {
    if (e !== e.checked) {
      setActiveCheckbox(true);
      handleSex(e);
    }
  };



    const [newUser, setNewUser] = useState<INewUser>({
      firstName: "",
      lastName: "",
      sex: "",
      phone: "",
      email: "",
      password: "",
      // _id: "",
      productList:[],
    });

  const handleSubmit = () => {
    // alert("A name was submitted: ", event);
    // event.preventDefault();
  };

  const handleFName = (e:ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    let firstName = e.target.value;
    console.log(firstName);
    setNewUser({ ...newUser, firstName:firstName})
  };

  const handleLName = (e: ChangeEvent<HTMLInputElement>) => {
    let lastName = e.target.value;
    setNewUser({ ...newUser, lastName:lastName})
  };
  const handleSex = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e, "SEX");
    let sex = e;
    setNewUser({ ...newUser, sex: sex });
  };
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    let email = e.target.value;
    setNewUser({ ...newUser, email: email });
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("Password", e.target.value);
    let password = e.target.value;
    setNewUser({ ...newUser, password: password });
  };

  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("phone", e.target.value);
    let phone = e.target.value;
    setNewUser({ ...newUser, phone: phone });
    console.log(newUser);
  };
  const handlePrivateUser =  () => {
    console.log("Innan",newUser);
    let costumer = { 
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    sex: newUser.sex,
    phone: newUser.phone,
    email: newUser.email,
    password: newUser.password,
    // _id:newUser._id,
    productList: newUser.productList,}

    // let costumer = newUser;
    console.log("Efter", JSON.parse(JSON.stringify({costumer})));
    try{
      console.log("I try",costumer)
       fetch('http://localhost:3000/api/CreateAccount',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(costumer)
        ,
      })
      .then((response) => response.json())
      .then((response) => {
        console.log("Result",response)
        // // document.getElementById('form').reset();
        if (response) {
          console.log("OK",response);
        } else {
          console.log("FEL",response);
        }
      });
    }catch(error){
      console.log("fel",error)
    }
  };

  // Company 
  
  const [newCompany, setNewCompany] = useState<INewCompany>({
    name: "",
    orgNumber: "",
    products: [],
    password: "",
  });
  const handleCompanyName = (e:ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    let companyName = e.target.value;
    console.log("Company",companyName);
    setNewCompany({ ...newCompany, name:companyName})
  };

  const handleCompanyNumber = (e:ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    let companyNumber = e.target.value;
    console.log("Company number",companyNumber);
    setNewCompany({ ...newCompany, orgNumber:companyNumber})
  };

  const handleCompanyPassword = (e:ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    let companyPassword = e.target.value;
    console.log("Company password",companyPassword);
    setNewCompany({ ...newCompany, password:companyPassword})
  };

  const handleCompany =()=>{
    console.log("FÖRETAGETXXXXX",newCompany);
    let company = {  
    name:newCompany.name,
    orgNumber:newCompany.orgNumber,
    products : newCompany.products,
    password : newCompany.password,}

    console.log("FÖRETAGET 2", company)

    console.log("Efter", JSON.parse(JSON.stringify({company})));
    try{
      console.log("I try",company)
       fetch('http://localhost:3000/api/CreateCompany',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({company})
        ,
      })
      .then((response) => response.json())
      .then((response) => {
        // console.log("Result",result)
        // // document.getElementById('form').reset();
        if (response) {
          console.log("OK",response);
        } else {
          console.log("FEL", response);
        }
      });
      return
    }catch{}
  }
  
  return (
    <div>
      {/* userchoice button private or company */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-evenly">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          // htmlFor="Privatperson"
          onClick={() => setUserChoice("Privatperson")}
        >
          Privatperson
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          // htmlFor="Företag"
          onClick={() => setUserChoice("Företag")}
        >
          Företag
        </button>
      </div>
      {/* Private user */}
      <div
        style={
          userChoice === "Privatperson"
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={() => handleSubmit()}
        >
          <div className="mb-4 ">
            <label
              htmlFor="firstname"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Förnamn
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstname"
              type="text"
              placeholder="Förnamn"
              required
              onChange={handleFName}
            />
          </div>
          <div className="mb-4 ">
            <label
              htmlFor="lastname"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Efternamn
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastname"
              type="text"
              placeholder="Efternamn"
              required
              onChange={handleLName}
            />
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              name="Man"
              value="Man"
              id="Man"
              disabled={activeCheckbox}
              onChange={() => handleChange("Man")}
            />
            <label htmlFor="Man" className="form-check-label">
              Man
            </label>

            <input
              type="checkbox"
              name="Kvinna"
              value="Kvinna"
              id="Kvinna"
              disabled={activeCheckbox}
              onChange={() => handleChange("Kvinna")}
            />
            <label htmlFor="Kvinna" className="form-check-label">
              Kvinna
            </label>

            <input
              type="checkbox"
              name="Annat"
              value="Annat"
              id="Annat"
              disabled={activeCheckbox}
              onChange={() => handleChange("Annat")}
            />
            <label htmlFor="Annat" className="form-check-label">
              Annat
            </label>
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              required
              onChange={handleEmail}
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
              type="text"
              placeholder="lösenord"
              required
              onChange={handlePassword}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="Telefon nummer"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Telefonnummer
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="number"
              placeholder="Telefonnummer"
              required
              // minLength="10"
              // maxLength="20"
              onChange={handlePhone}
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                handlePrivateUser();
              }}
            >
              Skapa konto
            </button>
          </div>
        </form>
      </div>
      {/* Company */}
      <div
        style={
          userChoice === "Företag" ? { display: "block" } : { display: "none" }
        }
      >
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
        <div className="mb-6">
            <label
              htmlFor="nameCompany"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Namn på företag
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="companyName"
              type="text"
              placeholder="Namn"
              required
              onChange={handleCompanyName}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="orgNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Org-nummer
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="orgNumber"
              type="text"
              placeholder="Org-Nummer"
              required
              onChange={handleCompanyNumber}
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
              type="text"
              placeholder="lösenord"
              required
              onChange={handleCompanyPassword}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={()=>{handleCompany()}}
            >
              Skapa konto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
      }

export default CreateUserForm;
