"use client"
import React, { useState,useEffect } from 'react'
import LoginForm from '@/Components/Form/LoginForm'

import { useDispatch,useSelector } from 'react-redux';
import { DisplayLogin, HideLogIn} from '@/Libraries/ReduxToolkit/Slices/Auth/LogInSlice';  
  const LogIn = () => {
let dispatch=useDispatch()  
//LogInSlice is come from a store bro and showLogIn is come from a LogInSlice and also ShowLogIn is a state
  let {ShowLogIn}=useSelector((state)=>state.LogInSlice)
 //checklogin is a state in a loginslice whichs is used to check the user is login or not if a checklogin is true than it will show logout button while hide the login button and if a checklogin is false than it will shwo the login button while hide the logout button bro 
  let {IsLogIn}=useSelector((state)=>state.CheckLogInSlice)

    // 🚀 Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  let handlebutton=()=>{
    dispatch(DisplayLogin()) //this will display the form bro
  }

  return (
    <div>
{!IsLogIn&&
      <button  onClick={handlebutton} disabled={IsLogIn}
       className={`2xl:px-12 2xl:py-5 2xl:text-xl       px-6 py-2 rounded-xl bg-[#B8860B] hover:bg-[#CD853F] text-black font-semibold shadow-lg  hover:text-white transition-all duration-500 transform hover:scale-105 active:scale-95 ${IsLogIn?"opacity-0":"opacity-100"}`}>Log in</button>
}
      
          {ShowLogIn && (
        <div  className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="relative">
            <LoginForm />

            {/* Close Button */}
            <button
              onClick={()=>dispatch(HideLogIn())}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-3 py-1 hover:bg-red-600 transition 2xl:px-4 2xl:py-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}


    </div>
  )
}

export default LogIn
