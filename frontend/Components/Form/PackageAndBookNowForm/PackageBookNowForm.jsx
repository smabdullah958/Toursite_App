
"use client"
import { getDubaiDateString } from "@/Components/DubaiTimeZone"

import { schema } from "@/Components/yupValidation/BookNowValidation"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch, useSelector } from "react-redux"
import { HideBookNowForm,ResetStates } from "@/Libraries/ReduxToolkit/Slices/PackageBookNow/PackageBookNowSlice"
import { useEffect, useState } from "react"

import PackageBookNowFormThunck from "@/Libraries/ReduxToolkit/AsyncThunck/PackagaBookNow/BookNowFormThunck"

import Loader from "@/Components/Loader"

// form is present in a form folder
import StripeCheckoutForm from "./PackageStripeCheckoutForm"

let PackageForm=({TravelTime,BookingOption,PackageID})=>{

   let todayDate=getDubaiDateString()

  let [ShowCarCapacityError,SetShowCarCapacityError]=useState(null)
  
  let [clientSecret,setClientSecret]=useState(null);
    let [bookingId, setBookingId] = useState(null) // ✅ store bookingId for later
  let [selectedOption, setSelectedOption] = useState(null);


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
          BasePrice:null,
          TotalPrice:null,
          NumberOfAdultChild:1,
          NumberOfNoneAdultChild:0,
          Duration:"",
          Category:"",
          BookingOptionId:"",  // Store the actual booking option ID
          CarCapacity:""
        }
    })

    const category = watch("Category");
  const bookingOptionId = watch("BookingOptionId");
  const adultChild = watch("NumberOfAdultChild");
  const noneAdult = watch("NumberOfNoneAdultChild");

  // Update selected option based on BookingOptionId
  useEffect(() => {
    //  Immediately reset selectedOption and price/counts if bookingOptionId is not selected
    if (!bookingOptionId) {
        setSelectedOption(null);
        setValue("BasePrice", null);
        setValue("TotalPrice", null);
        setValue("Duration", "");
        // Also reset the fields that depend on PricingModel
        setValue("NumberOfAdultChild", 1); 
        setValue("NumberOfNoneAdultChild", 0); 
        return; // Stop execution until bookingOptionId is selected
    }

    //  Only proceed if bookingOptionId is selected
    if (BookingOption && bookingOptionId) {
        const option = BookingOption.find(opt => opt._id === bookingOptionId);
        
        if (option) {
            setSelectedOption(option);
            setValue("BasePrice", option.BasePrice);
            setValue("Duration", option.Duration);
            setValue("Category", option.Category);
            
            // set default counts based on the new PricingModel
            if (option.PricingModel === "PerPerson") {
                // Keep the current values or set a valid default (e.g., min: 1 adult)
                // Use current watched values instead of calling watch() inside useEffect
                setValue("NumberOfAdultChild", adultChild < 1 ? 1 : adultChild);
                setValue("NumberOfNoneAdultChild", noneAdult < 0 ? 0 : noneAdult);
            } else {
                // If  fixed price like private booking, ensure the person counters are reset/set to non-influential values
                // This ensures if the user switches back, the counters don't hold bad values
                setValue("NumberOfAdultChild", 1); 
                setValue("NumberOfNoneAdultChild", 0); 
            }
        } else {
            // If option is not found
            setSelectedOption(null);
            setValue("BasePrice", null);
        }
    }
}, [bookingOptionId, BookingOption, setValue, adultChild, noneAdult]);

  // Calculate total price
  useEffect(() => {
    if (selectedOption) {    
        let totalPrice;
        if (selectedOption.PricingModel === "PerPerson") {
            totalPrice = (selectedOption.BasePrice * adultChild) + (selectedOption.BasePrice * noneAdult * 0.5);
        } else {
            totalPrice = selectedOption.BasePrice;
        }
        
        setValue("TotalPrice", totalPrice);
    }
    }, [adultChild, noneAdult, selectedOption, setValue]);

//watch the car capacity and selected option if pricing model is fixed unit and car capacity is not selected show error

    useEffect(() => {
      if (selectedOption?.PricingModel === "FixedUnit" && !watch("CarCapacity")) {
        SetShowCarCapacityError("Please select Car Capacity for Private Booking");
      } else {
        SetShowCarCapacityError(null);
      }
    }, [selectedOption, watch("CarCapacity")]);
    

    let HandleButton=async(Data)=>{
    let response= await dispatch(PackageBookNowFormThunck({Data,PackageID})).unwrap()      
      console.log(Data,PackageID)
      
      if(Data.PaymentMethod==="Stripe" && response.clientSecret){
            setClientSecret(response.clientSecret); // store in state
            setBookingId(response.result._id) // ✅ save bookingId from backend

          }
      else{
        dispatch(ResetStates())
      } 
      
    }

    let CloseForm=()=>{
        dispatch(ResetStates())
         dispatch(HideBookNowForm())
     
    }

    //  DestinationBookNowSlice is come from a store 
    let {loading,errorMessage}=useSelector((state)=>state.PackageBookNow)

        // Filter available options (exclude 0 slots)
    const availableOptions = BookingOption?.filter(opt => 
        opt.Slots === undefined || opt.Slots > 0
    ) || [];

    // Get unique categories
    const uniqueCategories = [...new Set(availableOptions?.map(opt => opt.Category) || [])];
    
    // Get booking options for selected category (keep all options, don't filter duplicates)
    const categoryOptions = availableOptions?.filter(opt => opt.Category === category) || [];



        // Remove duplicates with same Duration + PricingModel
const uniqueCategoryOptions = [];
const seenCombinations = new Set();

for (const opt of categoryOptions) {
  const key = `${opt.Duration}-${opt.PricingModel}`;
  if (!seenCombinations.has(key)) {
    seenCombinations.add(key);
    uniqueCategoryOptions.push(opt);
  }
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
        <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white p-6 text-center rounded-t-2xl relative">
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


            {/* Category Selection */}
            <div>
                <label className="block text-gray-800 font-semibold mb-2">Category</label>
           <select {...register("Category")}
           onChange={(e) => {
               setValue("Category", e.target.value);
               setValue("BookingOptionId", ""); // Reset booking option when category changes
           }}
           className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm">

                <option value="">Select a Category</option>

                {uniqueCategories.length > 0 ? (
                    uniqueCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))
                ) : (
                   <option value="" disabled>
                    No Category available
                  </option>
                )}
              </select>
                   <p className="text-red-500 text-xs mt-1">{errors.Category?.message}</p>
            </div>

                     {/* Booking Option Selection (Duration + Pricing Model andcombined) */}
            <div>
                <label className="block text-gray-800 font-semibold mb-2">Duration & Type</label>
           <select {...register("BookingOptionId")}
           disabled={!category}
           className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed">

                <option value="">Select Duration & Type</option>

                {uniqueCategoryOptions.length > 0 ? (
  uniqueCategoryOptions.map((opt) => (
    <option key={opt._id} value={opt._id}>
      {opt.Duration} - {opt.PricingModel === "PerPerson" ? "Per Person" : "Private Booking"}
    </option>
  ))
) : (
                   <option value="" disabled>
                    {category ? "No options available" : "Please select a category first"}
                  </option>
                )}
              </select>
                   <p className="text-red-500 text-xs mt-1">{errors.Duration?.message}</p>
            </div>

                  {/*select car capacity */}
            {selectedOption?.PricingModel === "FixedUnit" && (
            <div>
                <label className="block text-gray-800 font-semibold mb-2">Car Capacity</label>
           <select {...register("CarCapacity")}
           disabled={!category}
           className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed">

                <option value="">Select Car Capacity</option>

   {/* ✅ Filter only capacities matching same Duration + PricingModel */}
      {categoryOptions.length > 0 ? (
        [...new Set(
          categoryOptions
            .filter(opt =>
              opt.Duration === selectedOption.Duration &&
              opt.PricingModel === selectedOption.PricingModel
            )
            .map(opt => opt.CarCapacity)
        )].map((capacity, index) => (
          <option key={index} value={capacity}>
            {capacity}
          </option>
        ))
      ) : (                   <option value="" disabled>
                    {category ? "No options available" : "Please select a category first"}
                  </option>
                )}
              </select>
                   <p className="text-red-500 text-xs mt-1">{ShowCarCapacityError}</p>
            </div>
            )}

            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

           {/* Adult field - only for PerPerson */}
            {selectedOption?.PricingModel === "PerPerson" && (
             <div>
              <label className="block text-gray-800 font-semibold mb-2">Number of Adults/Parents</label>
              <input
                type="number"
                min="1"
                {...register("NumberOfAdultChild")}
                placeholder="number of adults/parents"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              />
              <p className="text-red-500 text-xs mt-1">{errors.NumberOfAdultChild?.message}</p>
            </div>
            )}

           {/* Children field - only for PerPerson */}
            {selectedOption?.PricingModel === "PerPerson" && (          
             <div>
              <label className="block text-gray-800 font-semibold mb-2">Number of Children (under 12)</label>
              <input
                type="number"
                min="0"
                {...register("NumberOfNoneAdultChild")}
                placeholder="age less than 12"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              />
              <p className="text-red-500 text-xs mt-1">{errors.NumberOfNoneAdultChild?.message}</p>
            </div>
            )}


                                   {/* Date */}
             <div>
              <label className="block text-gray-800 font-semibold mb-2">Select Booking Date</label>
              <input
                type="date"
                {...register("Date")}
                placeholder="Select Date"
                min={todayDate}
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

                              <div>
              <label className="block text-gray-800 font-semibold mb-2">Base Price</label>
              <input
                type="number"
                value={selectedOption?.BasePrice||""}
                readOnly
                placeholder="base price"
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-sm"
              />
            </div>

            <div>
             <p className="text-red-500 text-xs mt-1">{errors.TotalPrice?.message}</p>
              <label className="block text-gray-800 font-semibold mb-2">Total Price</label>
              <input
                type="number"
                readOnly
                {...register("TotalPrice")}
                placeholder="total price"
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-sm"
              />
            </div>


          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
                    onClick={CloseForm}
              className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold bg-amber-100 hover:bg-amber-200 duration-500 transtion-all text-sm"
            >
              ❌ Cancel
            </button>
            
            <button
              onClick={handleSubmit(HandleButton)}
               disabled={loading}
              className={`flex-1 py-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white to-pink-600  font-semibold text-sm shadow-md ${loading?"opacity-40":"hover:shadow-lg transition-all duration-500 hover:scale-105 opacity-100 "} `}>
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

{/* title */}
 <h3 className="text-xl font-bold mb-4 text-center text-amber-600">
        Complete Your Payment
      </h3>

      <div className="mb-4 border rounded-lg p-4 bg-gray-50 text-sm">
        <p><strong>Contact:</strong> {watch("ContactNumber")}</p>
        <p><strong>Pickup:</strong> {watch("PickUpAddress")}</p>
        <p><strong>Travel Time:</strong> {watch("TravelTime")}</p>
        <p><strong>Date:</strong> {watch("Date")}</p>

     {selectedOption?.PricingModel === "PerPerson" && (
         <p><strong>Adults:</strong> {watch("NumberOfAdultChild")}</p>
     )}

       {selectedOption?.PricingModel === "PerPerson" && (
        <p><strong>Kids:</strong> {watch("NumberOfNoneAdultChild")}</p>
       )}
        <p className="font-bold text-yellow-600 mt-2">
          Total: {watch("TotalPrice")} AED
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
    </div>
    )
}
export default PackageForm

