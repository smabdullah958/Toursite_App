"use client";
import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//it contain the validation schema
import { schema } from "@/app/(AdminDashboard)/PostPackages/YupValidation";
import { useDispatch, useSelector } from "react-redux";
import PostPackageThunck  from "@/Libraries/ReduxToolkit/AsyncThunck/Packages/PostPackageThunck"
import Loader from "@/Components/Loader";
import { useRouter } from "next/navigation";
//clear all the state
import { clearState } from "@/Libraries/ReduxToolkit/Slices/Packages/PostPackageSlice";

const PostPackage = () => {
  let router=useRouter();
  let dispatch = useDispatch();
  //PostPackageSlice is come forma  store
  let {success,loading}=useSelector((state)=>state.PostPackageSlice)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let [AddImages,SetAddImages]=useState(0)

  const handleButton = (Data) => {
    console.log("Form Data:", Data);

    // Dispatch the action to post the package
    dispatch(PostPackageThunck(Data));
  };

  useEffect(()=>{
    if(success){
      router.push("/")
      dispatch(clearState())
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-8">
          🏝️ Post a Package
        </h2>

        <div  className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              {...register("Title")}
              placeholder="e.g. Beautiful Beach"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.Title?.message}
            </p>
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Price ($)
            </label>
            <input
              type="number"
              {...register("BasePrice")}
              placeholder="e.g. 250"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.BasePrice?.message}
            </p>
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Available Slots
            </label>
            <input
              type="number"
              {...register("Slots")}
              placeholder="e.g. 50"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.Slots?.message}
            </p>
          </div>
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
              {/* Optional */}
              {AddImages>=1 && (
              <div>
                      <label className="block text-gray-700 font-semibold mb-2">
              Image Upload (3 is optional)
            </label>
            <input
              type="file"
              accept="image/png ,image/jpeg"
              {...register("Image3")}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
            />
            <p className="text-red-500 text-sm mt-1">{errors.Image3?.message}</p>
              </div>
              )}
              {AddImages>=2 && (
              <div>
                      <label className="block text-gray-700 font-semibold mb-2">
              Image Upload (4 is optional)
            </label>
            <input
              type="file"
              accept="image/png ,image/jpeg"
              {...register("Image4")}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
            />
            <p className="text-red-500 text-sm mt-1">{errors.Image4?.message}</p>
              </div>
              )}
              {AddImages>=3 && (
              <div>
                      <label className="block text-gray-700 font-semibold mb-2">
              Image Upload (5 is optional)
            </label>
            <input
              type="file"
              accept=" image/png ,image/jpeg"
              {...register("Image5")}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
            />
            <p className="text-red-500 text-sm mt-1">{errors.Image5?.message}</p>
              </div>
              )}

              {/* add button */}
              {AddImages<3 && (
              <button    disabled={loading}    onClick={()=>SetAddImages(AddImages+1)}  className={`px-4 py-2 bg-blue-300 text-white rounded-lg shadow  ${loading?" cursor-not-allowed opacity-20":"hover:bg-blue-400 transition"}`}> ➕ Add More Images</button>
              )}
          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              {...register("Description")}
              rows="4"
              placeholder="Write a short description..."
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.Description?.message}
            </p>
          </div>

          {/* Submit Button */}
          <button disabled={loading}
          onClick={handleSubmit(handleButton)}
            className={`w-full py-3 mt-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg  opacity-100  ${loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-indigo-700 hover:scale-105 transition-all duration-300 opacity-100'}`}>
            {loading?<Loader/>:"🚀 Post PostPackage"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default PostPackage;