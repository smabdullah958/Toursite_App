"use client";

import Loader from "@/Components/Loader";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ResetPasswordThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Auth/ResetPasswordThunck";
import { useEffect } from "react";

const schema = yup.object({
  Password: yup.string().min(6, "At least 6 characters").required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("Password")], "Passwords must match")
    .required(),
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token;
//resetpasswordslice is come from a store
 const { Loading, success, errorMessage,Role } = useSelector((state) => state.ResetPasswordSlice );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();
//data represet full form 
  const handleButton = (data) => {
    dispatch(ResetPasswordThunck({ Password: data.Password, token }));
  };

  useEffect(()=>{
      if(success){
           if(Role==="Admin"){
        router.replace("/AdminDashboard")
         }
         else{
             router.replace("/")
         } 
          }

    },[success,router])
  
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100">
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 shadow-2xl rounded-2xl p-8 w-full max-w-md border border-amber-200 2xl:max-w-[30vw] ">
        <h2 className="text-2xl font-bold text-center text-amber-900 mb-6 2xl:text-5xl">
          🔒 Reset Your Password
        </h2>

        {/* Error message */}
        {errorMessage && (
          <p className="text-red-500 text-center mb-4 2xl:text-2xl">{errorMessage}</p>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-amber-700 text-sm mb-1 2xl:text-3xl">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              {...register("Password")}
              className="border border-amber-200 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
            />
            <p className="text-red-500 text-xs mt-1 2xl:text-2xl">
              {errors.Password?.message}
            </p>
          </div>

          <div>
            <label className="block text-amber-700 text-sm mb-1 2xl:text-3xl">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter new password"
              {...register("confirmPassword")}
              className="border border-amber-200 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
            />
            <p className="text-red-500 text-xs mt-1 2xl:text-2xl">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <button
            onClick={handleSubmit(handleButton)}
            type="submit"
            disabled={Loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
              Loading
                ? "bg-amber-200 text-amber-600 cursor-not-allowed opacity-30"
                : "bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg opacity-100"
            }`}
          >
            {Loading ?<Loader/> : "✅ Reset Password"}
          </button>
        </div>

        <p className="text-xs text-amber-600 text-center mt-6 2xl:text-xl">
          Make sure your new password is at least 6 characters long.
        </p>
      </div>
    </div>
  );
}