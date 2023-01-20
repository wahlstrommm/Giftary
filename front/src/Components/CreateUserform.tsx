import React, { useState, useEffect,ChangeEvent } from "react";
// import { NewUser } from "../Models/User/NewUser";
import { INewUser } from "../Models/User/INewUser";
import { INewCompany } from "../Models/Company/INewCompany";
// import { NewCompany } from "../Models/Company/NewCompany";
// import axios from 'axios';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';




// checkLS = () => {
//   let LS = localStorage.getItem('loggedinUser');
//   let LSParsed = JSON.parse(LS);

//   if (LSParsed) {
//     infoUserID.textContent = LSParsed._id;
//     infoUserEmail.textContent = LSParsed.email;

//     loggedInStateContainer.style.display = 'block';
//     LoginContainer.style.display = 'none';

//     if (LSParsed.subscribed) {
//       userSubcribeState.textContent = 'ja';
//       changeUserSub.checked = true;
//     } else {
//       userSubcribeState.textContent = 'nej';
//       changeUserSub.checked = false;
//     }
//   } else {
//     loggedInStateContainer.style.display = 'none';
//     LoginContainer.style.display = 'block';
//   }
// };

// checkLS();




const CreateUserForm = () => {
  const {register,handleSubmit, reset, formState: { errors }} = useForm<Profile>()
  const [userChoice, setUserChoice] = useState("");
  const [activeCheckbox, setActiveCheckbox] = useState(false);
  // const [modal,SetModal] = useState(false)
  // const handleClick = (userChoice:any) => {
  //   console.log(userChoice);
  //   console.log(userChoice);
  //   handleSex(userChoice);
  // };
  const [reponsText,setReponsText]=useState('')
const [showModal,setShowModal] = useState(false);
  type Profile = {
    firstName: string,
    lastName: string,
    sex: string,
    phone: string,
    email: string,
    password: string,
    productList:[],

  }
  const onSubmit = handleSubmit( (data)=>{
    console.log("Data",data);
// empty=false
  })


  const handleChange = (e:any) => {
    if (e !== e.checked) {
      setActiveCheckbox(true);
      handleSex(e);
    }
  };

const handleModal = (e:any|void|undefined|HTMLDivElement)=>{
  console.log(e);
  setShowModal(!showModal);
}

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
    productList: newUser.productList
  }
 
    // let costumer = newUser;
    console.log("Efter", JSON.parse(JSON.stringify({costumer})));
  
    if (!costumer.firstName||!costumer.lastName||!costumer.sex||!costumer.phone||!costumer.email||!costumer.password) {
      console.log("ÄR i IF",costumer);
    }else{
      console.log("I ELSE");
      try{
        console.log("I try",costumer)
         fetch('http://localhost:3000/api/register',{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(costumer)
          ,
        })
        .then((response) => response.json())
        .then((response) => {
          // console.log("Result",response)
          // // document.getElementById('form').reset();
          if (response.message==="OK") {
            console.log("Ok",response.message);
            setShowModal(true);
            console.log(reponsText);
            reset({ firstName: '' ,lastName:'', sex:'',email:'',password:'',phone:''});
            setReponsText(response.message);

            return
          } else {
            console.log("FE!!!!!",response.message)
            setShowModal(true);
            console.log(reponsText);
            reset({ firstName: '' ,lastName:'', sex:'',email:'',password:'',phone:''});
            setReponsText(response.message)

          }
        });
      }catch(error){
        console.log("fel",error)
        console.log("ÄR I CATCH");
      }
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
          setReponsText(response.message);
          console.log(reponsText);
        } else {
          console.log("FEL", response);
          console.log(reponsText);
          setReponsText(response.message)
        }
      });
      return
    }catch{
      console.log("I CATCH");
    }
  }
  
  return (
    <div>
      {/* userchoice button private or company */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-evenly relative">
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
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-around items-center"  style={showModal ===true ? {display:"block"} : {display:"none"}} onClick={handleModal}>
        <div className="flex justify-center justify-items-center align-middle text-center top-1/3 relative">

    <div className="bg-white p-6 rounded  h-2/5 w-2/5 relative" >
        <p>{reponsText}</p>
        <button className="rounded w-7 absolute top-2 left-3 bg-blue-500 hover:bg-blue-700 text-white font-bold">X</button>
        
    </div>
        </div>
  </div>
      {/* Private user */}
      <div id="createUserContainer"
        style={
          userChoice === "Privatperson"
            ? { display: "block" }
            : { display: "none" }  
        }
      >
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={(onSubmit)}
        >
          <div className="mb-4 ">
            <label
              htmlFor="firstName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Förnamn
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-900 focus:shadow-outline"
              {...register('firstName', { required: true })} 
              id="firstName"
              type="text"
              placeholder="Förnamn"
              required
              onChange={handleFName}
            />
            
            <ErrorMessage errors={errors} name="singleErrorInput" />
      
      <ErrorMessage
        errors={errors}
        name="singleErrorInput"
        render={({ message }) => <p>{message}</p>}
      />          </div>
          <div className="mb-4 ">
            <label
              htmlFor="lastName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Efternamn
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-900 focus:shadow-outline"
              {...register}
              id="lastName"
              type="text"
              placeholder="Efternamn"
              required
              onChange={handleLName}
            />
          </div>
          <div className="mb-4 flex justify-evenly">
            <input
              type="checkbox"
              value="Man"
              id="Man"
              // {...register('sex', { required: true })} 

              disabled={activeCheckbox}
              onChange={() => handleChange("Man")}
            />
            <label htmlFor="Man" className="form-check-label">
              Man
            </label>

            <input
              type="checkbox"
              value="Kvinna"
              id="Kvinna"
              // {...register('sex', { required: true })} 

              disabled={activeCheckbox}
              onChange={() => handleChange("Kvinna")}
            />
            <label htmlFor="Kvinna" className="form-check-label">
              Kvinna
            </label>

            <input
              type="checkbox"
              value="Annat"
              id="Annat"
              // {...register('sex', { required: true })} 

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
              {...register}
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-slate-900 focus:shadow-outline"
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
              className="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-slate-900 focus:shadow-outline"
              {...register('password', { required: true })} 

              id="password"
              type="text"
              placeholder="lösenord"
              required
              onChange={handlePassword}
            />
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
              id="phone"
              {...register('phone', { required: true })} 

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
              type="submit"
              // disabled={empty}
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
              Namn på företaget
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
              Org-Nummer
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
              placeholder="Lösenord"
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
            {/* <p               className="block text-gray-700 text-sm font-bold mb-2"
>
           </p> */}
          </div>

        </form>
      </div>
    </div>
  );
      }

export default CreateUserForm;
