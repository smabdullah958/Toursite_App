"use client"
import React from 'react'

import {DisplayUpdateForm} from "@/Libraries/ReduxToolkit/Slices/Destination/UpdateSlice"
import { useDispatch} from 'react-redux'
const UpdateButton = ({id}) => {
    let dispatch=useDispatch()

  return (
    <div>
       <button onClick={()=>dispatch(DisplayUpdateForm(id))} className="px-6 py-2 rounded-xl  bg-gradient-to-r from-[#3fb7eb] to-[#23a4dc] text-white font-semibold shadow-lg  transition-all duration-500 transform hover:scale-105 active:scale-95 mr-5 opacity-100 hover:from-[#0693cf] hover:to-[#0f94cd]">
       Update</button>
    </div>
  )
}

export default UpdateButton
