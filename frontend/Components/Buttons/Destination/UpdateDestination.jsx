"use client"
import React from 'react'
import {DisplayUpdateForm} from "@/Libraries/ReduxToolkit/Slices/Destination/UpdateSlice"
import { useDispatch} from 'react-redux'
const UpdateButton = ({id}) => {
    let dispatch=useDispatch()

  return (
    <div>
       <button 
         onClick={()=>dispatch(DisplayUpdateForm(id))} 
         className="group relative px-6 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 
         hover:from-amber-500 hover:to-yellow-500 text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300 transform  hover:scale-105 hover:shadow-xl mr-5 overflow-hidden"
       >
         <span className="relative z-10">Update</span>
         <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%]"></span>
       </button>
    </div>
  )
}

export default UpdateButton