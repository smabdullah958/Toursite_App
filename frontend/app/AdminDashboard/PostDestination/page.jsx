"use client";
import React, { useEffect } from "react";
//usefieldarray is used for a dynamic input field like user can add and remove fields
import { useForm,useFieldArray  } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//import validation
import schema from "@/Components/yupValidation/Destination/DestinationValidation";

import { useSelector,useDispatch } from "react-redux";
import PostImageThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/PostImageThunck";
import { useRouter } from "next/navigation";
import Loader from "@/Components/Loader";
import { resetDestinationState } from "@/Libraries/ReduxToolkit/Slices/Destination/PostImageSlice";


const PostDestination = () => {
  const {
    register,
    handleSubmit,
    control,
    //for conditions
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues:{
      TravelTimes:[{time:""}], // start with one empty time input field

      //for dynamic category slots price and many more
      BookingOption:[{
          Category:"",
          BasePrice:null,
          //for a per person or  private booking
          PricingModel:null,
          // here capcity is a capcity of a car like a 5 seater 10 seater etc 
            CarCapcity:null,
            Slots:null,
            Duration:null
      }]
    }
  });
// fields: gives  the list of all time objects in your form.

// append: adds  new time object (like { time: "" }).

// remove: deletes one.
  const { fields, append, remove } = useFieldArray({
  control,  // comes from useForm(), it controls the whole form state 
    name: "TravelTimes",  //the name is must be match with a mongoose field bro 
    //tells react-hook-form that this field array is bound to your form's TravelTimes field.
    });

    //for a dynamic fields bro
    let {
      fields:bookingFields,
      append:appendBooking,
      remove:removeBooking
    }=useFieldArray({
    control,
      name: "BookingOption", // Must match the name in your Mongoose schema/yup

    })


  let router=useRouter()
  
  let dispatch=useDispatch()
//PostImageSlice is come from a store
  let {success,Loading}=useSelector((state)=>state.PostImageSlice)

  const handleButton = (Data) => {
    console.log("Form Data:", Data);
    dispatch(PostImageThunck(Data))
  };


   useEffect(()=>{
     if(success){
       setTimeout(() => { 
         router.push("/AdminDashboard")
          dispatch(resetDestinationState())   
       }, 1000);

     }
   },[success,router])


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 p-6 relative overflow-hidden">
      {/* Desert Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `radial-gradient(circle at 25% 25%, #8B4513 2px, transparent 2px),
                                radial-gradient(circle at 75% 75%, #D2691E 1px, transparent 1px)`,
               backgroundSize: '80px 80px, 40px 40px'
             }}>
        </div>
      </div>

      {/* Desert Dune Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-60 bg-gradient-to-br from-amber-200/20 to-yellow-300/10 rounded-full transform -translate-x-20 -translate-y-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-amber-300/15 to-yellow-200/10 rounded-full transform translate-x-16 translate-y-16 blur-2xl"></div>
      </div>

      <div className="bg-gradient-to-br from-amber-50/95 to-yellow-50/90 w-full max-w-3xl max-h-4xl  rounded-2xl shadow-2xl shadow-amber-200/30 p-8 backdrop-blur-sm border border-amber-200/50 relative 2xl:max-w-[60vw]">
        {/* Decorative Border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-gradient-to-r from-amber-300/30 via-yellow-300/40 to-amber-400/30 pointer-events-none"></div>
        
        <h2 className="text-3xl xl:text-4xl font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 bg-clip-text text-transparent text-center mb-8 drop-shadow-sm">
          🏝️ Post a Destination
        </h2>

        <div  className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-amber-900 font-semibold mb-2">
              Title
            </label>
            <input
              {...register("Title")}
              placeholder="e.g. Beautiful Beach"
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 placeholder-amber-600/60"
            />
            <p className="text-red-600 text-sm mt-1 font-medium">
              {errors.Title?.message}
            </p>
          </div>
             {/* for image */}
             <div>
            <label className="block text-amber-900 font-semibold mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/jpg, image/png ,image/jpeg"
              {...register("Image")}
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
            />
            <p className="text-red-600 text-sm mt-1 font-medium">{errors.Image?.message}</p>
              </div>


{/* Travel Times */}

<div>
  <label className="block text-amber-900 font-semibold mb-2">
    Travel Times
  </label>
  {fields.map((field, index) => (
    <div key={field.id} className=" sm:flex items-center gap-2 mb-2">
      <input
        type="time"
        {...register(`TravelTimes.${index}.time`)} // ✅ bind field
        className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200"
      />
      {fields.length>1 && (
      <button
        type="button"
        onClick={() => remove(index)}
        className="bg-gradient-to-r from-red-200 to-red-300 text-white px-3 py-3 rounded-lg hover:from-red-300 hover:to-red-400 duration-300 transition shadow-lg"
      >
        ❌
      </button>
      )}
    </div>
  ))}
  <p className="text-red-600 text-sm mt-1 font-medium">
    {errors.TravelTimes?.message || errors.TravelTimes?.[0]?.time?.message}
  </p>
  <button
    type="button"
    onClick={() => append({time:""})}
    className="mt-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2 rounded-lg hover:from-amber-600 hover:to-yellow-600 duration-300 transition shadow-lg font-medium"
  >
    ➕ Add Time
  </button>
</div>

         {/* ✨ DYNAMIC BOOKING OPTIONS SECTION ✨ */}
          {/* ======================================= */}
           <h3 className=" text-xl font-bold text-amber-800 border-b pb-2 mb-4">
            Booking Categories & Pricing
             </h3>

              {bookingFields.map((field, index) => {
                    // 💡 Must watch the field inside the map for reactivity
              const PricingModel = watch(`BookingOption.${index}.PricingModel`);
                  return (
                <div
                  key={field.id}
                className="p-4 border-2 border-amber-300 rounded-lg bg-yellow-100/30 space-y-4 relative"                >
                  {/* Remove Button */}
                 {bookingFields.length > 1 && (
                   <button
                     type="button"
                      onClick={() => removeBooking(index)}
                     className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-600 transition duration-200 shadow-md text-sm"         >
                         &times;
                        </button>
                         )}
                       <h4 className="text-lg font-semibold text-amber-800 border-b border-amber-200 pb-2">
                      Category #{index + 1}
                      </h4>

                        {/* Category Name & Pricing Model */}
                        <div className="grid grid-cols-1 sm:flex gap-4">
                         <div className="w-full sm:w-1/2">
                         <label className="block text-amber-900 font-semibold mb-2">Category Name</label>
                          <input
                         {...register(`BookingOption.${index}.Category`)}
                         placeholder="e.g. Standard, Private Car"
                        className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:ring-2 focus:ring-amber-400"            />
                       <p className="text-red-600 text-sm mt-1">{errors.BookingOption?.[index]?.Category?.message}</p>
                        </div>
                        <div className="w-full sm:w-1/2">
                      <label className="block text-amber-900 font-semibold mb-2">Pricing Model
                      </label>
                      <select 
                     {...register(`BookingOption.${index}.PricingModel`)}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:ring-2 focus:ring-amber-400">
                    <option value="">Select Pricing Model</option>
                   <option value="PerPerson">Per Person</option>
                   <option value="FixedUnit">Fixed Unit (Private)</option>
                    </select>
                   <p className="text-red-600 text-sm mt-1">{errors.BookingOption?.[index]?.PricingModel?.message}</p>
                       </div>
                      </div>
                          
                      {/* Base Price & Duration */}
                     <div className="grid grid-cols-1 sm:flex gap-4">
                    <div className="w-full sm:w-1/2">
                   <label className="block text-amber-900 font-semibold mb-2">
                  {PricingModel==="FixedUnit" ? 'Total Price Per Car (AED)' : 'Price Per Person (AED)'}                  </label>
                 <input
                 type="number"
              {...register(`BookingOption.${index}.BasePrice`)}
              placeholder={PricingModel==="FixedUnit"? "e.g. 500 (Total Car Price)" : "e.g. 250 (Per Person)"}
            className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:ring-2 focus:ring-amber-400"        />
             <p className="text-red-600 text-sm mt-1">{errors.BookingOption?.[index]?.BasePrice?.message}</p>
              </div>

                             {/* Duration */}
             <div className="w-full sm:w-1/2">
             <label className="block text-amber-900 font-semibold mb-2">Duration</label>
               <input
               {...register(`BookingOption.${index}.Duration`)}
                  placeholder="e.g. 4 Hours"
             className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:ring-2 focus:ring-amber-400"                      />
             <p className="text-red-600 text-sm mt-1">{errors.BookingOption?.[index]?.Duration?.message}</p>
             </div>
             </div>
                                
                                {/* Slots  & Car Capacity (Conditional) */}
               <div className="grid grid-cols-1 sm:flex gap-4">
               <div className={`w-full sm:w-1/2 ${PricingModel==="FixedUnit" ? '' : 'w-full'}`}>
              <label className="block text-amber-900 font-semibold mb-2">
           {PricingModel==="FixedUnit" ? 'Total Number of Cars' : 'Total Slots Available'}
                  </label>
                 <input
                   type="number"
                    {...register(`BookingOption.${index}.Slots`)}
               placeholder={PricingModel==="FixedUnit" ? "e.g. 5 available cars" : "e.g. 50 available slots"}
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:ring-2 focus:ring-amber-400"         />
             <p className="text-red-600 text-sm mt-1">{errors.BookingOption?.[index]?.Slots?.message}</p>
                </div>
                                    
                      {/* 💡 Conditional Field: Only show CarCapacity for FixedUnit (Private) */}
                   {PricingModel==="FixedUnit" && (
                   <div className="w-full sm:w-1/2">
                   <label className="block text-amber-900 font-semibold mb-2">
                     Car Capacity (Seats per Car)
                        </label>
                      <input
                         type="number"
                         {...register(`BookingOption.${index}.CarCapacity`)}
                         placeholder="e.g. 10 seats"
                        className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:ring-2 focus:ring-amber-400"         />
                       <p className="text-red-600 text-sm mt-1">{errors.BookingOption?.[index]?.CarCapacity?.message}</p>
                        </div>
                        )}
                        </div>
                        </div>
                    )}
                    )}
                    
                    {/* Add Booking Option Button */}
                    <button
                        type="button"
                        onClick={() => appendBooking({
                            Category: "",
                            BasePrice: null,
                            PricingModel: "PerPerson",
                            CarCapacity: null,
                            Slots: null,
                            Duration: null
                        })}
                        className="mt-4 w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg hover:from-amber-600 hover:to-yellow-600 duration-300 transition shadow-lg font-medium">
                        ➕ Add New Category
                    </button>
      
          {/* Description */}
          <div>
            <label className="block text-amber-900 font-semibold mb-2">
              Description
            </label>
            <textarea
              {...register("Description")}
              rows="4"
              placeholder="Write a short description..."
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 placeholder-amber-600/60 resize-none"
            />
            <p className="text-red-600 text-sm mt-1 font-medium">
              {errors.Description?.message}
            </p>
          </div>

          {/* Submit Button */}
          <button
          onClick={handleSubmit(handleButton)}
            disabled={Loading}
            className={`w-full py-4 mt-6 rounded-xl font-bold shadow-lg text-lg transition-all duration-300 ${Loading?"opacity-50 bg-amber-300 cursor-not-allowed":"bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 hover:scale-105 hover:shadow-xl hover:shadow-amber-300/50 text-white"}`}>
            {Loading?<Loader/>:"🚀 Post Destination"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default PostDestination;