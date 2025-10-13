"use client";
import React, { useEffect,useState } from "react";
//usefieldarray is used for a dynamic input field like user can add and remove fields
import { useForm,useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { HideUpdateForm, ResetUpdateState } from "@/Libraries/ReduxToolkit/Slices/Destination/UpdateSlice";
import UpdateThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/UpdateThunck";

//import validation
import schema from "@/Components/yupValidation/Destination/UpdateDestinationValidation";

//it is used for refetch 
import GetFirstTwentyImage from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/Get/GetFirstTwentyImageThunck";
//it is used for reset the state of getfirsttwentyimage
import { resetDestination } from "@/Libraries/ReduxToolkit/Slices/Destination/get/GetFirstTwentyImage";
import Loader from "@/Components/Loader";
//get by id for a prefill form thunck 
import FindByIdThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/Get/GetDestinationByID"

//this is used to add a AM and PM bro 
import to12Hour from "@/Components/Form/DestinationAndBookNowForm/AddingAMPM"


const UpdateForm = ({ id }) => {
  let { Loading, success } = useSelector((state) => state.UpdateSlice);
  const { register,
     handleSubmit,  
       control,
 formState: { errors },
 setValue,
 watch } = useForm({ 
    resolver: yupResolver(schema),
  defaultValues:{
    Title: "",
    Image: null,
    Description: "",
    TravelTimes: [{ time: "" }], // default 1 field is display

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

  let dispatch = useDispatch();
//for show the image 
  const [existingImage, setExistingImage] = useState(null);
   const [previewImage, setPreviewImage] = useState(null);
     const watchedImage = watch("Image");

  //result hold the data  and getbyidslice is come from a store 
let {result} =useSelector((state)=>state.GetByIDSlice)


    // Fetch destination data by ID when component mounts
  useEffect(() => {
    dispatch(FindByIdThunck(id));
  }, [id, dispatch]);

// Populate form with fetched data
  useEffect(() => {
    if (result) {
      setValue("Title", result.Title || "");
      setValue("Description", result.Description || "");

                  // --- 1. Pre-fill Booking Options like price , slotes car capcity and many more
 if (result.BookingOption && result.BookingOption.length > 0) {
         // Map 
        const mappedOptions = result.BookingOption.map(option => ({
          _id:option._id,
          Category: option.Category || "",
          BasePrice: option.BasePrice || null,
          PricingModel: option.PricingModel || "",
          CarCapacity: option.CarCapacity || option.CarCapcity || null, // Handle both spellings
          Slots: option.Slots ||0,
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


      setExistingImage(result.Image || null); // Assuming Image is a URL or path

        // ✅ Pre-fill travel times in 24h format
    if (result.TravelTimes?.length > 0) {
      const formattedTimes = result.TravelTimes.map(t => {
        let [time, modifier] = t.time.split(" ");
        let [hours, minutes] = time.split(":");

        if (modifier === "PM" && hours !== "12") {
          hours = String(parseInt(hours, 10) + 12);
        }
        if (modifier === "AM" && hours === "12") {
          hours = "00";
        }

        return { time: `${hours.padStart(2, "0")}:${minutes}` };
      });

      setValue("TravelTimes", formattedTimes);
    }

    }
  }, [result, setValue]);

    // Handle image preview when user selects new image
  useEffect(() => {
    if (watchedImage && watchedImage[0]) {
      const file = watchedImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [watchedImage]);


//   let HandleButton = (data) => {
//     const formData = new FormData();
//     formData.append("Title", data.Title);
//     formData.append("Description", data.Description);
    


//       //  travel time prefilled and also  TravelTimes (with AM/PM)
//   (data.TravelTimes || []).forEach((t, index) => {
//     const raw = typeof t === "string" ? t : (t.time ?? "");
//     const timeWithAmPm = to12Hour(raw); // convert to 12h format (AM/PM)

//     if (timeWithAmPm) {
//       formData.append(`TravelTimes[${index}][time]`, timeWithAmPm);
//     }
//   });

//       // append BookingOption array for submission ---
//     (data.BookingOption || []).forEach((option, index) => {
//         // Append all nested fields with array notation for the backend
//         //also send a _id for update
//         //  Only include _id if it exists (existing options)
//     // New options won't have _id, so backend will add them
//     if (option._id && option._id !== undefined && option._id !== null) {
//       formData.append(`BookingOption[${index}][_id]`, option._id);
//     }

//         formData.append(`BookingOption[${index}][Category]`, option.Category);
//         formData.append(`BookingOption[${index}][BasePrice]`, option.BasePrice);
//         formData.append(`BookingOption[${index}][PricingModel]`, option.PricingModel);
//         formData.append(`BookingOption[${index}][CarCapacity]`, option.CarCapacity? Number(option.CarCapacity) : 0);
//         formData.append(`BookingOption[${index}][Slots]`, option.Slots);
//         formData.append(`BookingOption[${index}][Duration]`, option.Duration);
//     });


//     // If a new image is selected, append it; otherwise, append the existing image URL
//     if (data.Image && data.Image[0]) {
//       formData.append("Image", data.Image[0]);
//     } else if (existingImage) { //apend existing image
//       formData.append("ExistingImage", existingImage); // Send existing image URL
//     }
//     // Dispatch the update thunk with ID and form data
//     dispatch(UpdateThunck({ id, data:formData }));
// console.log(formData);
//   };


let HandleButton = (data) => {
  const formData = new FormData();
  formData.append("Title", data.Title);
  formData.append("Description", data.Description);

  // Travel time with AM/PM
  (data.TravelTimes || []).forEach((t, index) => {
    const raw = typeof t === "string" ? t : (t.time ?? "");
    const timeWithAmPm = to12Hour(raw);

    if (timeWithAmPm) {
      formData.append(`TravelTimes[${index}][time]`, timeWithAmPm);
    }
  });

  //   Append BookingOption with proper handling for specially for  new vs existing slots and prices
  (data.BookingOption || []).forEach((option, index) => {
    // ✅ Only include _id if it exists (existing options)
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

  // Handle image
  if (data.Image && data.Image[0]) {
    formData.append("Image", data.Image[0]);
  } else if (existingImage) {
    formData.append("ExistingImage", existingImage);
  }

  // Debug: Log what you're sending
  console.log("📤 Sending FormData:");
  for (let pair of formData.entries()) {
    console.log(pair[0], ":", pair[1]);
  }

  // Dispatch the update
  dispatch(UpdateThunck({ id, data: formData }));
};

  useEffect(() => {
    if (success) {
      dispatch(ResetUpdateState()); //this will reset the updatestate
      dispatch(resetDestination()); // this will reset all the tour it means now it will fetch again from a 0
      dispatch(GetFirstTwentyImage({ page: 1, limit: 20 })); //again refetch
      dispatch(HideUpdateForm());
    }
  }, [success]);

  return (
    <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-sm z-50">
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">

    <div className="sticky top-0 z-20  text-center rounded-t-2xl">
        {/* Close Button */}
        <button
          onClick={() => dispatch(HideUpdateForm())}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-all duration-200 hover:scale-110"
        >
          ✕
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-yellow-600 p-6 text-center rounded-t-2xl relative">
          <h2 className="text-2xl font-bold text-white">🏝️ Update Destination</h2>
          <p className="text-indigo-100 text-sm">Transform your travel experience with stunning destinations</p>
        </div>
</div>
        {/* Form */}
        <div className="p-6 space-y-6">
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
        className="px-3 py-2 bg-red-200 text-white rounded-lg text-sm hover:bg-red-300 duration-300 
        transition"
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

          {/* Image Preview */}
          {previewImage && (
            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                📷 {watchedImage && watchedImage[0] ? "New Image Preview" : "Current Image"}
              </label>
              <div className="relative inline-block">
                <img
                  src={previewImage}
                  alt="Destination Preview"
                  className="w-32 h-32 object-cover rounded-lg border shadow-md"
                />
                {watchedImage && watchedImage[0] && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    New
                  </div>
                )}
              </div>
            </div>
          )}


          {/* Upload New Image */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">📸 Upload New Destination Image (Optional)</label>
            <input
              type="file"
              accept="image/jpg, image/png, image/jpeg"
              {...register("Image")}
              className="w-full text-sm px-3 py-2 border rounded-lg file:mr-3 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-amber-500 file:text-white hover:file:bg-yellow-700 duration-500 transition-all"
            />
            <p className="text-red-500 text-xs mt-1">{errors.Image?.message}</p>
            <p className="text-gray-500 text-xs mt-1">Leave empty to keep current image</p>
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
              onClick={() => dispatch(HideUpdateForm())}
              className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold bg-gradient-to-r from-amber-100 to-yellow-100 hover:from-amber-200 hover:to-yellow-200 duration-500 transition-all text-sm"
            >
              ❌ Cancel
            </button>
            <button
              onClick={handleSubmit(HandleButton)}
              disabled={Loading}
              className={`flex-1 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 ${Loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 opacity-100"}`}
            >
              {Loading ? <Loader /> : "🚀 Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
