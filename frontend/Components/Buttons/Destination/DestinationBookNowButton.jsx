"use client"
import React from 'react'
import DestinationForm from '@/Components/Form/DestinationAndBookNowForm/DestinationBookNowForm'
import {DisplayBookNowForm} from "@/Libraries/ReduxToolkit/Slices/DestinationBookNow/DestinationBookNow"
import { useDispatch, useSelector } from 'react-redux'
const DestinationBookNow = ({id,time,basePrice}) => {
  //DestinationBookNowSlice is come from a store
    let {ShowForm,DestinationID}=useSelector((state)=>state.DestinationBookNowSlice)
let dispatch=useDispatch()

//CheckLogInSlice si come from a store and also it is used to check user is login or not 
  const { IsLogIn} = useSelector((state) => state.CheckLogInSlice);


  return (
    <div>
      <button disabled={!IsLogIn}
       onClick={()=>{dispatch(DisplayBookNowForm(id))}} className={`w-full bg-gradient-to-r from-amber-700 to-yellow-700  text-white font-semibold py-4 px-6 rounded-xl   shadow-lg hover:shadow-xl ${IsLogIn?"hover:from-amber-500 hover:to-yellow-500 hover:scale-105 hover:shadow-xl opacity-100 transition-all duration-500":"opacity-15"}`}>
                    Book Now
                  </button>
                  {ShowForm && DestinationID===id && <DestinationForm DestinationID={id} TravelTime={time} basePrice={basePrice}/>}
    </div>
  )
}

export default DestinationBookNow
