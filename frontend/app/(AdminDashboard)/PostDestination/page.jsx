"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector,useDispatch } from "react-redux";
import PostImageThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/PostImageThunck";
import { useRouter } from "next/navigation";
import Loader from "@/Components/Loader";
import { resetDestinationState } from "@/Libraries/ReduxToolkit/Slices/Destination/PostImageSlice";
const MAX_FILE_SIZE = 300 * 1024 ; // 300kb
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

// ✅ Validation Schema
const schema = yup.object({
  Title: yup.string().required("Title is required"),
Slots:yup.number().typeError("slots must be number").positive("slots must be positive number").required("price required"),
  BasePrice: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  Image: yup.mixed().required("Image is required")
   .test(
                 'fileSize',
                 'File must be less than 300kb',
                //  value => value[0] && value.size <= MAX_FILE_SIZE
                //here first it check the value of a field and field is a Image
// First, it checks if value exists (not null or undefined). If value is null, the whole condition becomes false.
//              value[0] means "the first file uploaded". If no file is selected, value[0] will be undefined.
                  value =>  value && value[0] && value[0].size <= MAX_FILE_SIZE

           )
            .test(
                'fileFormat',
                'Unsupported Format',
                // value => value && SUPPORTED_FORMATS.includes(value.type)
                value=>value && value[0] && SUPPORTED_FORMATS.includes(value[0].type)
              ),
  Description: yup.string().required("Description is required"),
});

const PostDestination = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
        dispatch(resetDestinationState())
         router.push("/Destination")
       }, 1000);

     }
   },[success])


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-8">
          🏝️ Post a Destination
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
                   <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/jpg, image/png ,image/jpeg"
              {...register("Image")}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
            />
            <p className="text-red-500 text-sm mt-1">{errors.Image?.message}</p>
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

          {/* Submit Button */}
          <button
          onClick={handleSubmit(handleButton)}
            disabled={Loading}
            className={`w-full py-3 mt-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg  ${Loading?"opacity-50 bg-blue-300":"opacity-100 hover:bg-indigo-700 hover:scale-105 transition-all"}`}>
            {Loading?<Loader/>:"🚀 Post Destination"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default PostDestination;
