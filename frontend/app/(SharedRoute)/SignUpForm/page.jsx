"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import PostFormThunck from "@/Libraries/ReduxToolkit/AsyncThunck/SignUpThunck";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/Components/Loader";


const schema = yup.object({
  Name: yup.string().required("Full Name is required"),
  Email: yup.string().email("Invalid email").required("Email is required"),
  Password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function SignUpPage() {
  let dispatch=useDispatch()
 let router=useRouter()

  //PostFormSlice is come foram a store bro 
  let {Loading,success,errorMessage}=useSelector((state)=>state.PostFormSlice)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
        //UserData is pass to a thunck
let   SubmitForm =(UserData)=>{
  console.log(UserData)
   dispatch(PostFormThunck(UserData))
}

useEffect(()=>{
  if(success){
    setTimeout(() => {
      
      router.push("/")
    }, 1000);
  }
},[success,router])

  return (
    <div className=" h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200
     via-purple-200 to-pink-200 sm:overflow-y-hidden">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Create an Account
        </h2>

        <div  className="space-y-5">
        <span className="text-red-300 ">{errorMessage}</span>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              {...register("Name")}
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 mt-1 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            <p className="text-red-500 text-sm mt-1">{errors.Name?.message}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              {...register("Email")}
              placeholder="you@example.com"
              className="w-full px-4 py-2 mt-1 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            <p className="text-red-500 text-sm mt-1">{errors.Email?.message}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input type="password"
              {...register("Password")}
              
              placeholder="••••••••"
              className="w-full px-4 py-2 mt-1 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.Password?.message}
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit(SubmitForm)}
            className={`w-full py-2 text-white font-semibold bg-indigo-600 rounded-xl shadow-md
             hover:bg-indigo-700 transition duration-200 ${Loading?"opacity-50":"opacity-100"}`} >
            {Loading?<Loader/>:"Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
