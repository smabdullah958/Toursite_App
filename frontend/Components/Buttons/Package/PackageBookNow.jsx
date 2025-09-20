"use client"
import React from 'react'
import PackageForm from '@/Components/Form/PackageAndBookNowForm/PackageBookNowForm'
import {DisplayBookNowForm} from "@/Libraries/ReduxToolkit/Slices/Packages/PackageBookNow"
import { useDispatch, useSelector } from 'react-redux'
const PackageBookNow = ({id,time,basePrice}) => {
  //DestinationBookNowSlice is come from a store
    let {ShowForm,PackageID}=useSelector((state)=>state.PackageBookNowSlice)
let dispatch=useDispatch()

  return (
    <div>
      <button onClick={()=>{dispatch(DisplayBookNowForm(id))}} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Book Now
                  </button>
                  {ShowForm && PackageID===id && <PackageForm TravelTime={time} basePrice={basePrice} PackageID={id}/>}
    </div>
  )
}

export default PackageBookNow
