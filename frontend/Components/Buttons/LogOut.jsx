'use client'
import LogOutThunck from '@/Libraries/ReduxToolkit/AsyncThunck/Auth/LogOutThunck'
import React, { useState,useEffect } from 'react' 
import { useDispatch,useSelector } from 'react-redux'

// set role is nul and 
 import { resetLogOut } from '@/Libraries/ReduxToolkit/Slices/Auth/LogOutSlice'
import { useRouter } from 'next/navigation'
const LogOut = () => {
let dispatch=useDispatch()
let route=useRouter()
//IsLogIn is a state in a CheckLogInSlice whichs is used to check the user is login or not if a checklogin is true than it will show logout button while hide the login button and if a checklogin is false than it will shwo the login button while hide the logout button bro 
 let {IsLogIn}=useSelector((state)=>state.CheckLogInSlice)
 let {Loading,success}=useSelector((state)=>state.LogOutSlice)
let HandleButton=()=>{
dispatch(LogOutThunck())   
  }

  useEffect(()=>{
   if(success){
  dispatch(resetLogOut())
}
 },[success,dispatch,route])

 const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div>
{IsLogIn &&
      <button onClick={HandleButton} disabled={Loading}        
      className={`2xl:px-12 2xl:py-5 2xl:text-xl  px-6 py-2 rounded-xl  bg-[#B8860B] hover:bg-[#CD853F] text-white font-semibold shadow-lg  transition-all duration-500 transform hover:scale-105 active:scale-95 mr-5 ${IsLogIn?"opacity-100 hover:bg-[#D4A373]":"opacity-0"} ${Loading?"opacity-40 cursor-not-allowed bg-gray-200":""}`}>Log Out</button>
}
    </div>
  )
}

export default LogOut
