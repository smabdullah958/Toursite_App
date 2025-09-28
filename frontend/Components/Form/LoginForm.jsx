// "use client"

// import Loader from "@/Components/Loader";
// import { HideLogIn, resetLoginState } from "@/Libraries/ReduxToolkit/Slices/Auth/LogInSlice";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { useDispatch,useSelector } from "react-redux";
// import LogInThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Auth/LogInThunck";

// import ForgetPasswordPopUp from "@/Components/ForgetPasswordPopUp";
// import CheckLogIn from '@/Libraries/ReduxToolkit/AsyncThunck/Auth/CheckLoginThunck'
// import { useRouter } from "next/navigation";
// const LoginForm = () => {
//   let route=useRouter()
// //it is check user is admin or not  if admin than redirect toa  admin panel
//   let {Role}=useSelector((state)=>state.CheckLogInSlice)

//   //LogInSlice is come from a store bro 
//   let {Loading,errorMessage,success}=useSelector((state)=>state.LogInSlice)
//   let dispatch=useDispatch()
//   let [Form, SetForm] = useState({
//     Email: "",
//     Password: "",
//   });

//   let HandleFields = (e) => {
//     SetForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   let CloseForm=()=>{
//     setTimeout(() => {
//       dispatch(HideLogIn())
//     }, 300);
//   }
  
//   let HandleButton=()=>{
//     dispatch(LogInThunck(Form))
//   } 

//   useEffect(()=>{
//     if(success){
//       setTimeout(() => {
//        dispatch(HideLogIn()) //close fomr 
//        dispatch(CheckLogIn());   // ✅ refetch role after login
//            if(Role!=="Admin"){
//                route.push("/")
//            }
//            else{
//              route.push("/AdminDashboard")
//            }
//    dispatch(resetLoginState()) // finally reset login slice
//       }, 500);    
//          }
//   },[success,dispatch])
  

//   return (
//     <div className="bottom-52">
//       {/* Card Container */}
//       <div  className="bg-blue-100 shadow-2xl rounded-2xl p-8 w-[90vw] sm:w-[350px] ">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Login
//         </h2>

//         <span className="my-3 text-red-300">{errorMessage}</span>

//         {/* Email Input */}
//         <input
//           type="email"
//           placeholder="test@gmail.com"
//           onChange={HandleFields}
//           name="Email"
//           value={Form.Email}
//           className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400" required
//         />
//         <ForgetPasswordPopUp/>
//         {/* Password Input */}
//         <input
//           type="password"
//           placeholder="******"
//           onChange={HandleFields}
//           name="Password"
//           value={Form.Password}
//           className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
//           required
//         />

//         {/* Button */}
//         <button disabled={Loading} 
//         onClick={HandleButton}
//         className={`w-full py-3 bg-[#67a1db] text-white font-semibold rounded-xl hover:bg-[#65a9ec] transition duration-300 shadow-md ${Loading?"opacity-40":"opacity-100"}`}>
//           {Loading?<Loader/>:"Login"}
//         </button>

//         {/* Extra Links */}
//         <div className="mt-4 text-center text-sm text-gray-500">
//           <p>
//             Don’t have an account?{" "}
//             <Link href="/SignUpForm" onClick={CloseForm} className="text-blue-600 hover:underline">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default LoginForm;






"use client"

import Loader from "@/Components/Loader";
import { HideLogIn, resetLoginState } from "@/Libraries/ReduxToolkit/Slices/Auth/LogInSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import LogInThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Auth/LogInThunck";

import ForgetPasswordPopUp from "@/Components/ForgetPasswordPopUp";
import CheckLogIn from '@/Libraries/ReduxToolkit/AsyncThunck/Auth/CheckLoginThunck'
import { useRouter } from "next/navigation";
const LoginForm = () => {
  let route=useRouter()
//it is check user is admin or not  if admin than redirect toa  admin panel
  let {Role}=useSelector((state)=>state.CheckLogInSlice)

  //LogInSlice is come from a store bro 
  let {Loading,errorMessage,success}=useSelector((state)=>state.LogInSlice)
  let dispatch=useDispatch()
  let [Form, SetForm] = useState({
    Email: "",
    Password: "",
  });

  let HandleFields = (e) => {
    SetForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  let CloseForm=()=>{
    setTimeout(() => {
      dispatch(HideLogIn())
    }, 300);
  }
  
  let HandleButton=()=>{
    dispatch(LogInThunck(Form))
  } 

  useEffect(()=>{
    if(success){
      setTimeout(() => {
       dispatch(HideLogIn()) //close fomr 
       dispatch(CheckLogIn());   // ✅ refetch role after login
           if(Role!=="Admin"){
               route.push("/")
           }
           else{
             route.push("/AdminDashboard")
           }
   dispatch(resetLoginState()) // finally reset login slice
      }, 500);    
         }
  },[success,dispatch])
  

  return (
    <div className="bottom-52">
      {/* Card Container */}
      <div  className="bg-gradient-to-br from-amber-50 to-yellow-50 shadow-2xl rounded-2xl p-8 w-[90vw] sm:w-[350px] border border-amber-200">
        <h2 className="text-2xl font-bold text-center text-amber-900 mb-6">
          Login
        </h2>

        <span className="my-3 text-red-500">{errorMessage}</span>

        {/* Email Input */}
        <input
          type="email"
          placeholder="test@gmail.com"
          onChange={HandleFields}
          name="Email"
          value={Form.Email}
          className="w-full px-4 py-3 mb-6 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white" required
        />
        <ForgetPasswordPopUp/>
        {/* Password Input */}
        <input
          type="password"
          placeholder="******"
          onChange={HandleFields}
          name="Password"
          value={Form.Password}
          className="w-full px-4 py-3 mb-6 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
          required
        />

        {/* Button */}
        <button disabled={Loading} 
        onClick={HandleButton}
        className={`w-full py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition duration-300 shadow-md ${Loading?"opacity-40":"opacity-100"}`}>
          {Loading?<Loader/>:"Login"}
        </button>

        {/* Extra Links */}
        <div className="mt-4 text-center text-sm text-amber-700">
          <p>
            Don't have an account?{" "}
            <Link href="/SignUpForm" onClick={CloseForm} className="text-amber-600 hover:underline font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default LoginForm;