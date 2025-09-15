"use client"

import { schema } from "@/Components/yupValidation/BookNowValidation"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch } from "react-redux"
import { HideBookNowForm,ResetStates } from "@/Libraries/ReduxToolkit/Slices/Destination/DestinationBookNow"
import { useEffect } from "react"

let DestinationForm=({TravelTime,basePrice})=>{

let dispatch=useDispatch()
   
    let {
        register,
        handleSubmit,
        setValue,
        watch,
            formState: { errors }
    }=useForm({
        resolver:yupResolver(schema),
        defaultValues:{
            ContactNumber:null,
            WhatsAppNumber:null,
            PickUpAddress:"",
            Days:1,
            TotalPrice:0,
            NumberOfAdultChild:null,
            NumberOfNoneAdultChild:null,
            BasePrice:basePrice,  //prefill from a props
            TravelTimes:""
        }
    })
//calculate total price
    useEffect(()=>{
        let CalculateTotalPrice=()=>{
            let days=watch("Days")||1;
            let adultchild=watch("NumberOfAdultChild")||0
            let totalPrice=basePrice*days*adultchild

            setValue("TotalPrice",totalPrice)    
        }
        CalculateTotalPrice()
    },[watch("Days"),watch("NumberOfAdultChild"),basePrice,setValue])

    let HandleButton=(Data)=>{
        alert(id)
        console.log(Data)
    }

    let CloseForm=()=>{
        dispatch(ResetStates())
         dispatch(HideBookNowForm())
     
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">

    <div className="sticky top-0 z-20  text-center rounded-t-2xl">
        {/* Close Button */}
        <button
          onClick={CloseForm}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-all duration-200 hover:scale-110"
        >
          ✕
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center rounded-t-2xl relative">
          <h2 className="text-2xl font-bold text-white">🏝️ Book Your Destination</h2>
        </div>
</div>
        {/* Form */}
        <div className="p-6 space-y-6">
          <div className="grid  gap-6">
            {/* Contact Number */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">📍 Contact No</label>
              <input
              type="tel"
                {...register("ContactNumber")}
                placeholder="e.g. Paradise Beach Resort"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              />
              <p className="text-red-500 text-xs mt-1">{errors.ContactNumber?.message}</p>
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">WhatsAppNumber(Optional)</label>
              <input
                type="tel"
                {...register("WhatsAppNumber")}
                placeholder="e.g. 2500"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              />
              <p className="text-red-500 text-xs mt-1">{errors.WhatsAppNumber?.message}</p>
            </div>

             {/* PickUp Address */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">PickUp Address</label>
              <input
                {...register("PickUpAddress")}
                placeholder="e.g. GT road"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              />
              <p className="text-red-500 text-xs mt-1">{errors.PickUpAddress?.message}</p>
            </div>


           {/* Number of Days */}
             <div>
              <label className="block text-gray-800 font-semibold mb-2"> Number of Days</label>
              <input
                type="number"
                {...register("Days")}
                placeholder="eg 1,2"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              />
              <p className="text-red-500 text-xs mt-1">{errors.Days?.message}</p>
            </div>
          </div>


           {/* Number of Adult Child */}
             <div>
              <label className="block text-gray-800 font-semibold mb-2">Number of Adults(Parents)</label>
              <input
                type="number"
                {...register("NumberOfAdultChild")}
                placeholder="number of adults/parents"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              />
              <p className="text-red-500 text-xs mt-1">{errors.NumberOfAdultChild?.message}</p>
            </div>

                       {/* Number of none Adult Child */}
             <div>
              <label className="block text-gray-800 font-semibold mb-2">Number of none Adult Child</label>
              <input
                type="number"
                {...register("NumberOfNoneAdultChild")}
                placeholder="age less than 12"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              />
            </div>

                {/* select time */}
            <div>
                <label className="block text-gray-800 font-semibold mb-2">🕒 Travel Time</label>
           <select {...register("TravelTimes")}
           className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm">

                <option value="">Select a time</option>

                {TravelTime?.length?(
                    TravelTime.map((t,index)=>(
                        //becuase Travel time is object
                        <option key={index} value={t.time}>{t.time}</option>
                    ))
                )   :(
                   <option value="" disabled>
                    No times available
                  </option>
                )
                }
              </select>

            </div>

                      {/* Base Price */}
             <div>
              <label className="block text-gray-800 font-semibold mb-2">Base Price</label>
              <input
                type="number"
                {...register("BasePrice")}
                readOnly
                placeholder="age less than 12"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              />
            </div>

             {/* Total Price */}
             <div>
              <label className="block text-gray-800 font-semibold mb-2">Total Price</label>
              <input
                type="number"
                readOnly
                {...register("TotalPrice")}
                placeholder="total price"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              />
            </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
                    onClick={CloseForm}
              className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 text-sm"
            >
              ❌ Cancel
            </button>
            <button
              onClick={handleSubmit(HandleButton)}
            //   disabled={Loading}
              className="flex-1 py-3 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
              BookNow
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}
export default DestinationForm