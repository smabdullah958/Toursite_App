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
        <div className="absolute top-0 left-0 w-80 h-60 bg-gradient-to-br from-amber-200/20 to-yellow-300/10 rounded-full transform -translate-x-20 -translate-y-10 blur-3xl">

        </div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-amber-300/15 to-yellow-200/10 rounded-full transform translate-x-16 translate-y-16 blur-2xl"></div>
      </div>

      <div className="bg-gradient-to-br from-amber-50/95 to-yellow-50/90 w-full max-w-3xl max-h-4xl  rounded-2xl shadow-2xl shadow-amber-200/30 p-8 backdrop-blur-sm border border-amber-200/50 relative 2xl:max-w-[60vw]">
        {/* Decorative Border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-gradient-to-r from-amber-300/30 via-yellow-300/40 to-amber-400/30 pointer-events-none"></div>
        
        <h2 className="text-3xl xl:text-4xl font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 bg-clip-text text-transparent text-center mb-8 drop-shadow-sm">
          Post a Team
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

          {/* Name */}
          <div>
            <label className="block text-amber-900 font-semibold mb-2">
              Name
            </label>
            <input
              {...register("Name")}
              placeholder="e.g. ali"
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 placeholder-amber-600/60"
            />
            <p className="text-red-600 text-sm mt-1 font-medium">
              {errors.Name?.message}
            </p>
          </div>

          
                   <div>
            <label className="block text-amber-900 font-semibold mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/jpg, image/png ,image/jpeg"
              {...register("Img")}
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
            />
            <p className="text-red-600 text-sm mt-1 font-medium">{errors.Img?.message}</p>
              </div>

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

<h2 className="text-3xl xl:text-4xl font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 bg-clip-text text-transparent text-center mb-8 drop-shadow-sm">
Optional
</h2>

               {/* Facebook */}
          <div>
            <label className="block text-amber-900 font-semibold mb-2">
              Facebook
            </label>
            <input
              {...register("Facebook")}
              placeholder="e.g. Beautiful Beach"
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 placeholder-amber-600/60"
            />
          </div>

          {/* Linkedin*/}
          <div>
            <label className="block text-amber-900 font-semibold mb-2">
              Linkedin
            </label>
            <input
              {...register("Linkedin")}
              placeholder="e.g. Beautiful Beach"
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 placeholder-amber-600/60"
            />
          </div>

          {/* Facebook */}
          <div>
            <label className="block text-amber-900 font-semibold mb-2">
              Email
            </label>
            <input
              {...register("Email")}
              placeholder="e.g. Beautiful Beach"
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 placeholder-amber-600/60"
            />
          </div>

          {/* Submit Button */}
          <button
          disabled={Loading}
          onClick={handleSubmit(handleButton)}
            className={`w-full py-4 mt-6 rounded-xl font-bold shadow-lg text-lg transition-all duration-300 ${Loading?"opacity-50 bg-amber-300 cursor-not-allowed":"bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 hover:scale-105 hover:shadow-xl hover:shadow-amber-300/50 text-white"}`}>
            {Loading?<Loader/>:"🚀 About"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default PostDestination;