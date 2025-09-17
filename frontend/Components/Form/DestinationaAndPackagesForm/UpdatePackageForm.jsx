"use client"

import React, { useEffect, useState } from 'react';
//usefieldarray is used for a dynamic input field like user can add and remove fields
import { useForm,useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "@/Components/yupValidation/UpdatePackageYupValidation"; //it contain the validation schema
import { useDispatch, useSelector } from 'react-redux';

import UpdatePackageThunck from '@/Libraries/ReduxToolkit/AsyncThunck/Packages/UpdatePackageThunck';
import Loader from '@/Components/Loader';
import { HidePackageForm, ResetPackage } from "@/Libraries/ReduxToolkit/Slices/Packages/UpdateSlice"
import GetFirst12PackagesThuck from "@/Libraries/ReduxToolkit/AsyncThunck/Packages/GetPackages/GetFirst12PackagesThunck"
import { resetProducts } from "@/Libraries/ReduxToolkit/Slices/Packages/GetPackages/GetFirst12PackagesSlice"

import GetByIDThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Packages/GetPackages/GetByIDThunck" //this will get the data for a prefilled 

//this is used to add a AM and PM bro 
import to12Hour from "@/Components/Form/DestinationaAndPackagesForm/AddingAMPM"


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
    formState: { errors }, setValue,
  } = useForm({
    resolver: yupResolver(schema) ,
         context: { existingImages } , defaultValues: {    //here in a yup we pass context and context is used to pass addintional information like i want that if a no image is selected or prefilled than at least 2 image must be filled but if a one imaage is selected or prefilled than another is images required but if both are already selected or prefilled than their is no need ofa  required
      Title: "",
      Slots: "",
      BasePrice: "",
      Description: "",
         TravelTimes: [{ time: "" }] ,// default 1 field
    existingImages
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

  // Fetch destination data by ID when component mounts
  useEffect(() => {
    dispatch(GetByIDThunck(id));
    console.log(id)
  }, [id, dispatch]);

  // Populate form with fetched data
  useEffect(() => {
    if (result) {
      setValue("Title", result.Title || "");
      setValue("Slots", result.Slots || "");
      setValue("BasePrice", result.BasePrice || "");
      setValue("Description", result.Description || "");
      setExistingImages(Array.isArray(result.Image) ? [...result.Image] : []); //  Image is array
    SetAddImages(result.Image?.length > 2 ? result.Image.length - 2 : 0);

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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
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
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center rounded-t-2xl relative">
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
    className="mt-2 px-4 py-2 bg-green-400 text-white rounded-lg text-sm hover:bg-green-500 duration-300 transition"
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
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
            />
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
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
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
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
              />
              <p className="text-red-500 text-sm mt-1">{errors.Image3?.message}</p>
            </div>
          )}
          {AddImages >= 2 && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Image Upload (4 is optional)
              </label>
              <input type="file" accept="image/png ,image/jpeg" {...register("Image4")}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
              />
              <p className="text-red-500 text-sm mt-1">{errors.Image4?.message}</p>
            </div>
          )}
          {AddImages >= 3 && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Image Upload (5 is optional)
              </label>
              <input type="file" accept=" image/png ,image/jpeg" {...register("Image5")}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
              />
              <p className="text-red-500 text-sm mt-1">{errors.Image5?.message}</p>
            </div>
          )}

          {/* add button */}
          {AddImages < 3 && (
            <button disabled={loading} onClick={() => SetAddImages(AddImages + 1)} className={`px-4 py-2  text-white rounded-lg shadow duration-300   ${loading ? "bg-blue-200 opacity-60" : "hover:bg-blue-300 transition bg-blue-400 opacity-100"}`}> ➕ Add More Images</button>
          )}

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
              className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 text-sm"
            >
              ❌ Cancel
            </button>
            <button
              onClick={handleSubmit(HandleButton)}
              disabled={loading}
              className={`flex-1 py-3 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-sm shadow-md  ${loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg transition-all duration-200 hover:scale-105 opacity-100"}`}>
              {loading ? <Loader /> : "🚀 Update"}
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default UpdatePackageForm
