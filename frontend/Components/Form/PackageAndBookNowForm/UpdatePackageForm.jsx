"use client"

import React, { useEffect, useState } from 'react';
//usefieldarray is used for a dynamic input field like user can add and remove fields
import { useForm,useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "@/Components/yupValidation/Packages/UpdatePackageYupValidation"; //it contain the validation schema
import { useDispatch, useSelector } from 'react-redux';

import UpdatePackageThunck from '@/Libraries/ReduxToolkit/AsyncThunck/Packages/UpdatePackageThunck';
import Loader from '@/Components/Loader';
import { HidePackageForm, ResetPackage } from "@/Libraries/ReduxToolkit/Slices/Packages/UpdateSlice"
import GetFirst12PackagesThuck from "@/Libraries/ReduxToolkit/AsyncThunck/Packages/GetPackages/GetFirst12PackagesThunck"
import { resetProducts } from "@/Libraries/ReduxToolkit/Slices/Packages/GetPackages/GetFirst12PackagesSlice"

import GetByIDThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Packages/GetPackages/GetByIDThunck" //this will get the data for a prefilled 

//this is used to add a AM and PM bro 
import to12Hour from "@/Components/Form/DestinationAndBookNowForm/AddingAMPM"


const UpdatePackageForm = ({ id }) => {
  let dispatch = useDispatch()

  let { result } = useSelector((state) => state.GetByIdSlice)
  let { loading, success } = useSelector((state) => state.UpdatePackageSlice)

    let [AddImages, SetAddImages] = useState(0)
  const [existingImages, setExistingImages] = useState([]); //it will get the  URLs of a images from DB

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }, setValue,
  } = useForm({
    resolver: yupResolver(schema) ,
         context: { existingImages } , defaultValues: {    //here in a yup we pass context and context is used to pass addintional information like i want that if a no image is selected or prefilled than at least 2 image must be filled but if a one imaage is selected or prefilled than another is images required but if both are already selected or prefilled than their is no need ofa  required
      Title: "",
      Description: "",
     TravelTimes: [{ time: "" }] ,// default 1 field
     existingImages,
   
    //for dynamic category slots price and many more
      BookingOption:[{
          Category:null,
          BasePrice:null,
          //for a per person or  private booking
          PricingModel:null,
          // here capcity is a capcity of a car like a 5 seater 10 seater etc 
            CarCapacity:null,
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
    name: "TravelTimes", 
     //tells react-hook-form that this field array is bound to your form’s TravelTimes field.
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
    
  // Fetch destination data by ID when component mounts
  useEffect(() => {
    dispatch(GetByIDThunck(id));
    console.log(id)
  }, [id, dispatch]);

  // Populate form with fetched data
  useEffect(() => {
    if (result) {
      setValue("Title", result.Title || "");
      setValue("Description", result.Description || "");
      setExistingImages(Array.isArray(result.Image) ? [...result.Image] : []); //  Image is array
    SetAddImages(result.Image?.length > 2 ? result.Image.length - 2 : 0);

      // --- 1. Pre-fill Booking Options like price , slotes car capcity and many more
 if (result.BookingOption && result.BookingOption.length > 0) {
         // ✅  Map and 
                 const mappedOptions = result.BookingOption.map(option => ({
          Category: option.Category || "",
          BasePrice: option.BasePrice || null,
          PricingModel: option.PricingModel || "",
          CarCapacity: option.CarCapacity || option.CarCapcity || null, // Handle both spellings
          Slots: option.Slots || 0,
          Duration: option.Duration || null
        }));
        setValue("BookingOption", mappedOptions);
      } else {
        setValue("BookingOption", [{
          Category: "",
          BasePrice: null,
          PricingModel: "",
          CarCapacity: null,
          Slots: null,
          Duration: null
        }]);
      }


// ✅ Pre-fill travel times in 24h format
    if (result.TravelTimes?.length > 0) {
      const formattedTimes = result.TravelTimes.map(t => {
        if (!t.time) return { time: "" };
        let [time, modifier] = t.time.split(" ");
        let [hours, minutes] = time.split(":");

        if (modifier === "PM" && hours !== "12") {
          hours = String(parseInt(hours, 10) + 12);
        }
        if (modifier === "AM" && hours === "12") {
          hours = "00";
        }

        return { time: `${hours.padStart(2, "0")}:${minutes}` }; // 👉 "10:10"
      });

      setValue("TravelTimes", formattedTimes);
    }
  
  }
  }, [result, setValue]);

  let HandleButton = (data) => {
    const formData = new FormData();
    const newImages = []; // Declare newImages array
    formData.append("Title", data.Title);
    formData.append("Description", data.Description);

          // ✅ TravelTimes (with AM/PM)
  (data.TravelTimes || []).forEach((t, index) => {
    const raw = typeof t === "string" ? t : (t.time ?? "");
    const timeWithAmPm = to12Hour(raw); // convert to 12h format (AM/PM)

    if (timeWithAmPm) {
      formData.append(`TravelTimes[${index}][time]`, timeWithAmPm);
    }
  });

   // append BookingOption array for submission ---
    // (data.BookingOption || []).forEach((option, index) => {
    //     // Append all nested fields with array notation for the backend
    //     formData.append(`BookingOption[${index}][Category]`, option.Category);
    //     formData.append(`BookingOption[${index}][BasePrice]`, option.BasePrice);
    //     formData.append(`BookingOption[${index}][PricingModel]`, option.PricingModel);
    //     formData.append(`BookingOption[${index}][CarCapacity]`, option.CarCapacity? Number(option.CarCapacity) : 0);
    //     formData.append(`BookingOption[${index}][Slots]`, option.Slots);
    //     formData.append(`BookingOption[${index}][Duration]`, option.Duration);
    // });


    //   Append BookingOption with proper handling for specially for  new vs existing slots and prices

    (data.BookingOption || []).forEach((option, index) => {
    //  Only include _id if it exists (existing options)
    if (option._id && option._id !== 'undefined' && option._id !== 'null') {
      formData.append(`BookingOption[${index}][_id]`, option._id);
    }
    
    formData.append(`BookingOption[${index}][Category]`, option.Category || "");
    formData.append(`BookingOption[${index}][BasePrice]`, option.BasePrice || 0);
    formData.append(`BookingOption[${index}][PricingModel]`, option.PricingModel || "");
    formData.append(`BookingOption[${index}][Duration]`, option.Duration || "");
    
    const slots = option.Slots || 0;
    formData.append(`BookingOption[${index}][Slots]`, slots);
    
    //  For NEW options without _id, OriginalSlots should equal Slots
    // For EXISTING options, preserve OriginalSlots or fallback to Slots
    const originalSlots = option._id 
      ? (option.OriginalSlots) || slots 
      : slots;
    formData.append(`BookingOption[${index}][OriginalSlots]`, originalSlots);
    
    //  Only add CarCapacity for FixedUnit
    if (option.PricingModel === "FixedUnit") {
      formData.append(
        `BookingOption[${index}][CarCapacity]`, 
        option.CarCapacity ? option.CarCapacity : 0
      );
    }

    //  Handle SlotByDate if exists (only for existing options)
  if (option.SlotByDate && option.SlotByDate && option.SlotByDate.length > 0) {
      option.SlotByDate.forEach((slot, slotIndex) => {
        formData.append(`BookingOption[${index}][SlotByDate][${slotIndex}][Date]`, slot.Date);
        formData.append(`BookingOption[${index}][SlotByDate][${slotIndex}][RemainingSlots]`, slot.RemainingSlots || 0);
      });
    }
  });


    // Append all new uploaded images dynamically
    const imageFields = ["Image1", "Image2", "Image3", "Image4", "Image5"];
    imageFields.forEach((field,index) => {
      if (data[field] && data[field].length > 0) {
        Array.from(data[field]).forEach((file) => {
         formData.append(`Image[${index}]`, file); // Send with index through index we can eaasliy access and update the image
          newImages[index] = file; //new file 
        });
      }
    });

    // Append existing images so backend can keep them if no new file is uploaded
    existingImages.forEach((img,index) => {
      if (!newImages[index]) {
        formData.append(`ExistingImage[${index}]`, img);
      }
    });

    dispatch(UpdatePackageThunck({ id, data: formData }))
  }

  useEffect(() => {
    if (success) {
      dispatch(ResetPackage()) //thsi will reset the update package
      dispatch(resetProducts()) //now this will reset all the packages 
      dispatch(GetFirst12PackagesThuck({ limit: 12, page: 1 })) //refetch
      dispatch(HidePackageForm())
    }
  })

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        <div className="sticky top-0 z-20  text-center rounded-t-2xl">
          {/* Close Button */}
          <button
            onClick={() => dispatch(HidePackageForm())}
            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-all duration-200 hover:scale-110"
          >
            ✕
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-yellow-600 p-6 text-center rounded-t-2xl relative">
            <h2 className="text-2xl font-bold text-white">🏝️ Update Packages</h2>
            <p className="text-indigo-100 text-sm">Transform your travel experience with stunning destinations</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="grid  gap-6">
            {/* Title */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">📍 Destination Title</label>
              <input
                {...register("Title")}
                placeholder="e.g. Paradise Beach Resort"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              />
              <p className="text-red-500 text-xs mt-1">{errors.Title?.message}</p>
            </div>
          </div>
          {/* Travel Times */}
<div>
  <label className="block text-gray-800 font-semibold mb-2">🕒 Travel Times</label>

  {fields.map((field, index) => (
    <div key={field.id} className="flex items-center gap-3 mb-2">
      <input
        type="time"
        {...register(`TravelTimes.${index}.time`)}
        defaultValue={field.time}
        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
      />
      <button
        type="button"
        onClick={() => remove(index)}
        className="px-3 py-2 bg-red-200 text-white rounded-lg text-sm hover:bg-red-300 transition 
        duration-300"
      >
        ❌
      </button>
    </div>
  ))}

  <button
    type="button"
    onClick={() => append({ time: "" })}
  className="mt-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg text-sm duration-300 transition hover:from-amber-600 hover:to-yellow-600"
  >
    ➕ Add Time
  </button>

  <p className="text-red-500 text-xs mt-1">{errors.TravelTimes?.message}</p>
</div>

          {/* Image Preview Section */}
          {existingImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {existingImages.map((img, index) => (
                <div key={index} className="relative">
                  <img src={img} alt={`Existing ${index}`} className="w-full h-32 object-cover rounded-lg border" />
                </div>
              ))}
            </div>
          )}

          {/* required */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Image Upload (1 is required)
            </label>
            <input
              type="file"
              accept="image/png ,image/jpeg "
              {...register("Image1")}
              className="w-full text-sm px-3 py-2 border rounded-lg file:mr-3 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-amber-500 file:text-white hover:file:bg-yellow-700 duration-500 transition-all"            />
            <p className="text-red-500 text-sm mt-1">{errors.Image1?.message}</p>
          </div>

          {/* required */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Image Upload (2 is required)
            </label>
            <input
              type="file"
              accept="image/png ,image/jpeg "
              {...register("Image2")}
              className="w-full text-sm px-3 py-2 border rounded-lg file:mr-3 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-amber-500 file:text-white hover:file:bg-yellow-700 duration-500 transition-all"
            />
            <p className="text-red-500 text-sm mt-1">{errors.Image2?.message}</p>
          </div>

          {/* Optional extra images */}
          {AddImages >= 1 && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Image Upload (3 is optional)
              </label>
              <input type="file" accept="image/png ,image/jpeg" {...register("Image3")}
           className="w-full text-sm px-3 py-2 border rounded-lg file:mr-3 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-amber-500 file:text-white hover:file:bg-yellow-700 duration-500 transition-all"    />
              <p className="text-red-500 text-sm mt-1">{errors.Image3?.message}</p>
            </div>
          )}
          {AddImages >= 2 && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Image Upload (4 is optional)
              </label>
              <input type="file" accept="image/png ,image/jpeg" {...register("Image4")}
             className="w-full text-sm px-3 py-2 border rounded-lg file:mr-3 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-amber-500 file:text-white hover:file:bg-yellow-700 duration-500 transition-all" />
              <p className="text-red-500 text-sm mt-1">{errors.Image4?.message}</p>
            </div>
          )}
          {AddImages >= 3 && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Image Upload (5 is optional)
              </label>
              <input type="file" accept=" image/png ,image/jpeg" {...register("Image5")}
          className="w-full text-sm px-3 py-2 border rounded-lg file:mr-3 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-amber-500 file:text-white hover:file:bg-yellow-700 duration-500 transition-all"    />
              <p className="text-red-500 text-sm mt-1">{errors.Image5?.message}</p>
            </div>
          )}

          {/* add button */}
          {AddImages < 3 && (
            <button disabled={loading} onClick={() => SetAddImages(AddImages + 1)} className={`px-4 py-2  text-white rounded-lg shadow duration-300   ${loading ? "bg-blue-200 opacity-60" : "bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg text-sm duration-300 transition hover:from-amber-600 hover:to-yellow-600"}`}> ➕ Add More Images</button>
          )}

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
                            PricingModel: null,
                            CarCapacity: null,
                            Slots: null,
                            Duration: null
                        })}
                        className="mt-4 w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg hover:from-amber-600 hover:to-yellow-600 duration-300 transition shadow-lg font-medium">
                        ➕ Add New Category
                    </button>


          {/* Description */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">📝 Destination Description</label>
            <textarea
              {...register("Description")}
              rows="4"
              placeholder="Describe the magical experience..."
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
            />
            <p className="text-red-500 text-xs mt-1">{errors.Description?.message}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => dispatch(HidePackageForm())}
        className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold bg-gradient-to-r from-amber-100 to-yellow-100 hover:from-amber-200 hover:to-yellow-200 duration-500 transition-all text-sm"
                >
              ❌ Cancel
            </button>
            <button
              onClick={handleSubmit(HandleButton)}
              disabled={loading}
               className={`flex-1 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 opacity-100"}`}
         >
              {loading ? <Loader /> : "🚀 Update"}
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default UpdatePackageForm
