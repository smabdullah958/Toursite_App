"use client";

import React, { useEffect } from "react";

//import validation
import schema from "@/Components/yupValidation/TeamValidation";

//loader
import Loader from "@/Components/Loader";
//thunck
import PostAboutThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Team/PostTeam"

import { useRouter } from "next/navigation";
import { resetDestinationState } from "@/Libraries/ReduxToolkit/Slices/Team/PostTeam";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

const PostDestination = () => {
  let router=useRouter()
    let dispatch=useDispatch()
    //PostAboutSlice is come froma  store
    let {Loading,success}=useSelector((state)=>state.PostAboutSlice)

    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });

  const handleButton = (Data) => {
    console.log("Form Data:", Data);

    dispatch(PostAboutThunck(Data))

  };

  useEffect(()=>{
       if(success){
         setTimeout(() => { 
           router.push("/OurTeam")
            dispatch(resetDestinationState())   
         }, 1000);
  
       }
     },[success])
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white w-full max-w-3xl max-h-4xl  rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl xl:text-4xl font-bold text-indigo-600 text-center mb-8">
          Post a About
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

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              {...register("Name")}
              placeholder="e.g. ali"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.Name?.message}
            </p>
          </div>

          
                   <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/jpg, image/png ,image/jpeg"
              {...register("Img")}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
            />
            <p className="text-red-500 text-sm mt-1">{errors.Img?.message}</p>
              </div>

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

<h2 className="text-3xl xl:text-4xl font-bold text-indigo-600 text-center mb-8">
Optional
</h2>

               {/* Facebook */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Facebook
            </label>
            <input
              {...register("Facebook")}
              placeholder="e.g. Beautiful Beach"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Linkedin*/}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Linkedin
            </label>
            <input
              {...register("Linkedin")}
              placeholder="e.g. Beautiful Beach"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Facebook */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              {...register("Email")}
              placeholder="e.g. Beautiful Beach"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Submit Button */}
          <button
          disabled={Loading}
          onClick={handleSubmit(handleButton)}
            className={`w-full py-3 mt-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg  ${Loading?"opacity-50 bg-blue-300":"opacity-100 hover:bg-indigo-700 hover:scale-105 transition-all"}`}>
            {Loading?<Loader/>:"🚀 About"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default PostDestination;
