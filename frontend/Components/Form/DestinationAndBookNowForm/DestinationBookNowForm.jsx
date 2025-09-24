"use client"

import { schema } from "@/Components/yupValidation/BookNowValidation"
import { useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch, useSelector } from "react-redux"
import { HideBookNowForm,ResetStates} from "@/Libraries/ReduxToolkit/Slices/DestinationBookNow/DestinationBookNow"
import { useEffect, useState } from "react"

import BookNowFormThunck from "@/Libraries/ReduxToolkit/AsyncThunck/DestinationBookNow/BookNowFormThunck"

import Loader from "@/Components/Loader"

// form is present in a form folder
import StripeCheckoutForm from "./DestinationStripeCheckoutForm"

let DestinationForm=({TravelTime,basePrice,DestinationID})=>{

  let [clientSecret,setClientSecret]=useState(null);

    let [bookingId, setBookingId] = useState(null) // ✅ store bookingId for later


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
            BasePrice:basePrice,  //prefill from a props
          TotalPrice:null,
          NumberOfAdultChild:1,
          NumberOfNoneAdultChild:0,
          Days:1
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

    let HandleButton=async(Data)=>{
    let response= await dispatch(BookNowFormThunck({Data,DestinationID})).unwrap()      
      console.log(Data,DestinationID)
      
      if(Data.PaymentMethod==="Stripe" && response.clientSecret){
            setClientSecret(response.clientSecret); // store in state
            setBookingId(response.result._id) // ✅ save bookingId from backend

          }
      else{
        dispatch(ResetStates())
      } 
      
    }

     //  DestinationBookNowSlice is come from a store 
    let {loading,errorMessage}=useSelector((state)=>state.DestinationBookNowSlice)

    
    let CloseForm=()=>{
        dispatch(ResetStates())
         dispatch(HideBookNowForm())
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[95vh] lg:max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">

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
                placeholder="01234567890"
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
                placeholder="12345678909"
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
                placeholder=" eg 3"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              />
              <p className="text-red-500 text-xs mt-1">{errors.Days?.message}</p>
            </div>
          </div>


           {/* Number of Adult Child */}
             <div>
            {errorMessage ? <p className="text-red-500">{errorMessage}</p> : null}

              <label className="block text-gray-800 font-semibold mb-2">Number of Adults/Parents</label>
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

                 <p className="text-red-500 text-xs mt-1">{errors.NumberOfNoneAdultChild?.message}</p>
            </div>


                                   {/* Date */}
             <div>
              <label className="block text-gray-800 font-semibold mb-2">Select Booking Date</label>
              <input
                type="date"
                {...register("Date")}
                placeholder="Select Date"
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              />
               <p className="text-red-500 text-xs mt-1">{errors.Date?.message}</p>
            </div>


                {/* select time */}
            <div>
                <label className="block text-gray-800 font-semibold mb-2">🕒 Travel Time</label>
           <select {...register("TravelTime")}
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
                   <p className="text-red-500 text-xs mt-1">{errors.TravelTime?.message}</p>
            </div>

            <div>
              <label>Payment Method</label>
              <select {...register("PaymentMethod")} 
           className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm">

                <option value="">Select Payement Method</option>
                <option value="Stripe" >Stripe</option>
                <option value="Cash">Cash</option>
           </select>
            <p className="text-red-500 text-xs mt-1">{errors.PaymentMethod?.message}</p>
            </div>


                      {/* Base Price */}
             <div>
              <label className="block text-gray-800 font-semibold mb-2">Base Price</label>
              <input
                type="number"

                value={basePrice}
                  readOnly
                placeholder="age less than 12"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              />
            </div>

             {/* Total Price */}
             <div>
             <p className="text-red-500 text-xs mt-1">{errors.TotalPrice?.message}</p>
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
               disabled={loading}
              className={`flex-1 py-3 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-sm shadow-md ${loading?"opacity-50":"hover:shadow-lg transition-all duration-500 hover:scale-105 opacity-100"} `}>
              {loading?<Loader/>:"BookNow"}
            </button>


{/* //stripe form bro           */}
   
   {/* Stripe Payment Modal */}
{clientSecret && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl relative">
      
      {/* Close Stripe Payment Modal */}
      <button
        onClick={() => setClientSecret(null)}
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-all duration-200 hover:scale-110"
      >
        ✕
      </button>

      {/* Title */}
      <h3 className="text-xl font-bold mb-4 text-center text-indigo-600">
        💳 Complete Your Payment
      </h3>

      {/* Booking Summary */}
      <div className="mb-4 border rounded-lg p-4 bg-gray-50 text-sm">
        <p><strong>📍 Contact:</strong> {watch("ContactNumber")}</p>
        <p><strong>🏠 Pickup:</strong> {watch("PickUpAddress")}</p>
        <p><strong>🕒 Travel Time:</strong> {watch("TravelTime")}</p>
        <p><strong>📅 Date:</strong> {watch("Date")}</p>
        <p><strong>👨 Adults:</strong> {watch("NumberOfAdultChild")}</p>
        <p><strong>👶 Kids:</strong> {watch("NumberOfNoneAdultChild")}</p>
        <p className="font-bold text-indigo-600 mt-2">
          💰 Total: {watch("TotalPrice")} PKR
        </p>
      </div>

      {/* Stripe Form */}
      <StripeCheckoutForm
        clientSecret={clientSecret}
         bookingId={bookingId}   // ✅ pass bookingId here

        onSuccess={(pi) => {
          console.log("payment success", pi)
          setClientSecret(null) // close after success
          CloseForm()
        }}
      />
    </div>
  </div>
)}


            
          </div>
        </div>
      </div>
    </div>
    )
}
export default DestinationForm