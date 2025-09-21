"use client";
import React, { useEffect,useState } from "react";
//usefieldarray is used for a dynamic input field like user can add and remove fields
import { useForm,useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { HideUpdateForm, ResetUpdateState } from "@/Libraries/ReduxToolkit/Slices/Destination/UpdateSlice";
import UpdateThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/UpdateThunck";

//import validation
import schema from "@/Components/yupValidation/DestinationValidation";

//it is used for refetch 
import GetFirstTwentyImage from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/Get/GetFirstTwentyImageThunck";
//it is used for reset the state of getfirsttwentyimage
import { resetProducts } from "@/Libraries/ReduxToolkit/Slices/Destination/get/GetFirstTwentyImage";
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
    Slots: "",
    BasePrice: "",
    Image: null,
    Description: "",
    TravelTimes: [{ time: "" }] // default 1 field is display

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
      setValue("Slots", result.Slots || "");
      setValue("BasePrice", result.BasePrice || "");
      setValue("Description", result.Description || "");
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


  let HandleButton = (data) => {
    const formData = new FormData();
    formData.append("Title", data.Title);
    formData.append("Slots", data.Slots);
    formData.append("BasePrice", data.BasePrice);
    formData.append("Description", data.Description);
    
      // ✅ TravelTimes (with AM/PM)
  (data.TravelTimes || []).forEach((t, index) => {
    const raw = typeof t === "string" ? t : (t.time ?? "");
    const timeWithAmPm = to12Hour(raw); // convert to 12h format (AM/PM)

    if (timeWithAmPm) {
      formData.append(`TravelTimes[${index}][time]`, timeWithAmPm);
    }
  });


    // If a new image is selected, append it; otherwise, append the existing image URL
    if (data.Image && data.Image[0]) {
      formData.append("Image", data.Image[0]);
    } else if (existingImage) { //apend existing image
      formData.append("ExistingImage", existingImage); // Send existing image URL
    }
    // Dispatch the update thunk with ID and form data
    dispatch(UpdateThunck({ id, data:formData }));
  };

  useEffect(() => {
    if (success) {
      dispatch(ResetUpdateState()); //this will reset the updatestate
      dispatch(resetProducts()); // this will reset all the tour it means now it will fetch again from a 0
      dispatch(GetFirstTwentyImage({ page: 1, limit: 20 })); //again refetch
      dispatch(HideUpdateForm());
    }
  }, [success]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
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
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center rounded-t-2xl relative">
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

            {/* Base Price */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">💰 Base Price (Rs)</label>
              <input
                type="number"
                {...register("BasePrice")}
                placeholder="e.g. 2500"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              />
              <p className="text-red-500 text-xs mt-1">{errors.BasePrice?.message}</p>
            </div>

            {/* Slots */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">🎫 Available Slots</label>
              <input
                type="number"
                {...register("Slots")}
                placeholder="e.g. 50"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              />
              <p className="text-red-500 text-xs mt-1">{errors.Slots?.message}</p>
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
    className="mt-2 px-4 py-2 bg-green-400 text-white rounded-lg text-sm hover:bg-green-500 duration-300 transition"
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
              className="w-full text-sm px-3 py-2 border rounded-lg file:mr-3 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
            />
            <p className="text-red-500 text-xs mt-1">{errors.Image?.message}</p>
            <p className="text-gray-500 text-xs mt-1">Leave empty to keep current image</p>
          </div>


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
              className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 text-sm"
            >
              ❌ Cancel
            </button>
            <button
              onClick={handleSubmit(HandleButton)}
              disabled={Loading}
              className={`flex-1 py-3 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 ${Loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"}`}
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
