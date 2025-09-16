"use client"
import React from 'react'
import DestinationForm from '@/Components/Form/DestinationaAndPackages/DestinationBookNowForm'
import {DisplayBookNowForm} from "@/Libraries/ReduxToolkit/Slices/DestinationBookNow/DestinationBookNow"
import { useDispatch, useSelector } from 'react-redux'
const DestinationBookNow = ({id,time,basePrice}) => {
  //DestinationBookNowSlice is come from a store
    let {ShowForm,DestinationID}=useSelector((state)=>state.DestinationBookNowSlice)
let dispatch=useDispatch()

  return (
    <div>
      <button onClick={()=>{dispatch(DisplayBookNowForm(id))}} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Book Now
                  </button>
                  {ShowForm && DestinationID===id && <DestinationForm DestinationID={id} TravelTime={time} basePrice={basePrice}/>}
    </div>
  )
}

export default DestinationBookNow
