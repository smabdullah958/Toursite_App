//this is a pop up ofa  forget password 
"use client";
import Loader from "@/Components/Loader";
import ForgetPasswordThunck from "@/Libraries/ReduxToolkit/AsyncThunck/FogetPasswordThunck";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { HideLogIn } from "@/Libraries/ReduxToolkit/Slices/LogInSlice";
import {
  ShowForgetPassword,
  HideForgetPassword,
} from "@/Libraries/ReduxToolkit/Slices/ForgetPasswordSlice";
import { useDispatch, useSelector } from "react-redux";

const schema = yup.object({
  Email: yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgetPasswordPopUp() {
  //it will show and hide the popup
  let dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // ForgetPasswordSlice is come from a store bro
  let { Loading, success, errorMessage, DisplayForgetPassword } = useSelector(
    (state) => state.ForgetPasswordSlice
  );

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        //this is a hide the login form
        dispatch(HideLogIn());
        //this is hide the forget password bro
        dispatch(HideForgetPassword());
      }, 1000);
    }
  }, [success, dispatch]);

  let handlebutton = (Form) => {
    dispatch(ForgetPasswordThunck(Form));
  };

  return (
    <div>
      {/* For get Password link */}
      <button
        onClick={() => dispatch(ShowForgetPassword())}
        className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition duration-300"
      >
        Forgot Password?
      </button>

      {/* Modal */}
      {DisplayForgetPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[420px] max-w-full flex flex-col animate-fadeIn">
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
              Reset Password
            </h2>

            <div className="mb-4">
              <p className="text-red-500 text-sm ">{errors.Email?.message}</p>
              <span className={` text-sm ${(errorMessage==="User is not found")?"text-red-500":"text-green-300"}`}>{errorMessage}</span>

              <input
                type="email"
                placeholder="Enter your email"
                {...register("Email")}
                className="border w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              />

              <div className="flex justify-between gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(HideForgetPassword());
                    dispatch(HideLogIn());
                  }}
                  className="flex-1 px-6 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold shadow-md hover:bg-gray-200 transition duration-300"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit(handlebutton)}
                  type="submit"
                  disabled={Loading}
                  className={`flex-1 px-6 py-2 rounded-xl text-white font-semibold shadow-md transition-all duration-300 ${
                    Loading
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 hover:scale-105"
                  }`}
                >
                  {Loading ? <Loader /> : "Send Link"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
