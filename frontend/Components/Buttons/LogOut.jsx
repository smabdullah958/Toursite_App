'use client'
import LogOutThunck from '@/Libraries/ReduxToolkit/AsyncThunck/Auth/LogOutThunck'
import React, { useState,useEffect } from 'react' 
import { useDispatch,useSelector } from 'react-redux'
import CheckLogIn from '@/Libraries/ReduxToolkit/AsyncThunck/Auth/CheckLoginThunck'
// set role is nul and 
 import { resetLogOut } from '@/Libraries/ReduxToolkit/Slices/Auth/LogOutSlice'
const LogOut = () => {
let dispatch=useDispatch()
//IsLogIn is a state in a CheckLogInSlice whichs is used to check the user is login or not if a checklogin is true than it will show logout button while hide the login button and if a checklogin is false than it will shwo the login button while hide the logout button bro 
 let {IsLogIn,Role}=useSelector((state)=>state.CheckLogInSlice)
 let {Loading,success}=useSelector((state)=>state.LogOutSlice)
let HandleButton=()=>{
  setTimeout(() => {
dispatch(LogOutThunck())    
}, 700);
  }

  useEffect(()=>{
   if(success){
  dispatch(resetLogOut())
    dispatch(CheckLogIn());   // ✅ refetch role after login
  
  }
 },[success,dispatch])

  //  useEffect(()=>{
  //   alert(Role)
  //  },[Role])

    // 🚀 Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div>
{IsLogIn &&
      <button onClick={HandleButton} disabled={Loading}        
      className={`px-6 py-2 rounded-xl  bg-gradient-to-r from-[#3fb7eb] to-[#23a4dc] text-white font-semibold shadow-lg  transition-all duration-500 transform hover:scale-105 active:scale-95 mr-5 ${IsLogIn?"opacity-100 hover:from-[#0693cf] hover:to-[#0f94cd]":"opacity-0"} ${Loading?"opacity-40 cursor-not-allowed bg-gray-200":""}`}>Log Out</button>
}
    </div>
  )
}

export default LogOut
