import React, { useState } from "react";
import { INewUser } from "../Models/User/INewUser";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import CreateCompanyform from "./CreateCompanyform";

const CreateUserForm = () => {

  const { register, handleSubmit,reset , formState: { errors } } = useForm();
  const [userChoice, setUserChoice] = useState("");
  const [reponsText,setReponsText]=useState('')
  const [showModal,setShowModal] = useState(false);


const onSubmit = (data:any) => {

  if(data){

    let costumer:INewUser = {
      firstName: data.firstName ,
      lastName: data.lastName,
      sex: data.sex,
      phone: data.phone,
      email: data.email,
      password: data.password,
      productList:[]
    }

    handlePrivateUser(costumer);
    
    }else{
      console.log(errors);
      }
    };
  

  const handleModal = (e:any|void|undefined|HTMLDivElement)=>{
    console.log(e);
    setShowModal(!showModal);
  }

  const handlePrivateUser =  (data:any) => { 
    if (!data.firstName||!data.lastName||!data.sex||!data.phone||!data.email||!data.password) {
    }else{
      try{
         fetch('http://localhost:3000/api/register',{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data)
          ,
        })
        .then((response) => response.json())
        .then((response) => {
          if (response.user) {
            setShowModal(true);
            reset({ firstName: '' ,lastName:'', sex:'',email:'',password:'',phone:''});
            setReponsText(response.message);
            return
          } else {
            setShowModal(true);
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
  return (
    <div>
      {/* userchoice button private or company */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-evenly relative">

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
          onClick={() => setUserChoice("Privatperson")}> Privatperson
        </button>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
          onClick={() => setUserChoice("Företag")}> Företag
        </button>

      </div>

         <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-around items-center" style={showModal ===true ? {display:"block"} : {display:"none"}}   onClick={handleModal}>
        <div className="flex justify-center justify-items-center align-middle text-center top-1/3 relative">

    <div className="bg-white p-6 rounded  h-2/5 w-2/5 relative" >
        <p>{reponsText}</p>
        <button className="rounded w-7 absolute top-2 left-3 bg-blue-500 hover:bg-blue-700 text-white font-bold">X</button>
        
    </div>
        </div>
        </div>

    <div id="createUserContainer" style={ userChoice === "Privatperson" ? { display: "block" } : { display: "none" }}>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

        <div className="mb-4 ">
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
              Förnamn
            </label>
             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-fslate-900 focus:shadow-outline" type="text" placeholder="Förnamn" {...register("firstName", {required: true, maxLength: 80})} />
              <ErrorMessage errors={errors} name="singleErrorInput" />
              <ErrorMessage errors={errors} name="singleErrorInput" render={({ message }) => <p>{message}</p>} />   
          </div>

            <div className="mb-4 ">
              <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                  Efternamn
              </label>
            
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-900 focus:shadow-outline" placeholder="Efternamn" {...register("lastName", {required: true, maxLength: 100})} />
            </div>

            <label htmlFor="sex" className="block text-gray-700 text-sm font-bold mb-2">
              Kön
            </label>

          <div className="mb-4 max-w-full rounded bg-slate-200 border-slate-800 border-2 flex items-center align-middle"> 
            <select className="w-full text-center"{...register("sex", { required: true })}>
                <option value="Man">Man</option>
                <option value="Kvinna">Kvinna</option>
                <option value="Annat">Annat</option>
            </select>
          </div>


          <div className="mb-6">
             <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
               <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-slate-900 focus:shadow-outline" type="email" placeholder="mail" {...register("email", {required: true, min: 1, pattern: /^\S+@\S+$/i})} />
          </div>
          
          <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  Lösenord
              </label>
              <input  className="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-slate-900 focus:shadow-outline" type="text" placeholder="Lösenord" {...register("password", {required: true})} />
         </div>

         <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">  
             Telefonnummer
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-slate-900 focus:shadow-outline" type="text" placeholder="Telefonnummer" {...register("phone", {required: true, maxLength: 12, pattern: /[0-9]/i})} />
         </div>
        
         <div className="flex items-center justify-center">
            <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/> 
         </div>
    </form>
      </div>
      {/* Company */}
      <div style={ userChoice === "Företag" ? { display: "block" } : { display: "none" } }>
        <CreateCompanyform/>
      </div>
    </div>
  );
      }

export default CreateUserForm;
