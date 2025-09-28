"use client"
import React from 'react'
import PackageForm from '@/Components/Form/PackageAndBookNowForm/PackageBookNowForm'
import {DisplayBookNowForm} from "@/Libraries/ReduxToolkit/Slices/Packages/PackageBookNow"
import { useDispatch, useSelector } from 'react-redux'
const PackageBookNow = ({id,time,basePrice}) => {
  //DestinationBookNowSlice is come from a store
    let {ShowForm,PackageID}=useSelector((state)=>state.PackageBookNowSlice)

    //CheckLogInSlice si come from a store and also it is used to check user is login or not 
      const { IsLogIn} = useSelector((state) => state.CheckLogInSlice);

    let dispatch=useDispatch()

  return (
    <div>
      <button disabled={!IsLogIn} onClick={()=>{dispatch(DisplayBookNowForm(id))}} 
      className={`w-full group relative bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform ${
          IsLogIn 
            ? "hover:from-amber-500 hover:to-yellow-500 hover:scale-105 hover:shadow-xl opacity-100"
            : "opacity-50 cursor-not-allowed"
        } overflow-hidden`}>
                    Book Now
                  </button>
                  {ShowForm && PackageID===id && <PackageForm TravelTime={time} basePrice={basePrice} PackageID={id}/>}
    </div>
  )
}

export default PackageBookNow
