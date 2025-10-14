"use client"
import React from 'react'

import {DisplayUpdateForm} from "@/Libraries/ReduxToolkit/Slices/Team/UpdateTeam"
import { useDispatch} from 'react-redux'
const UpdateTeamButton = ({id}) => {
    let dispatch=useDispatch()

  return (
    <div>
       <button onClick={()=>{dispatch(DisplayUpdateForm(id)); alert(id)}} className="px-6 py-2 rounded-xl  bg-gradient-to-r from-yellow-500 to-amber-500  hover:from-amber-500 hover:to-yellow-500 text-white font-semibold shadow-lg  transition-all duration-500 transform hover:scale-105 active:scale-95 mr-5 opacity-100 ">
       Update</button>
    </div>
  )
}

export default UpdateTeamButton
