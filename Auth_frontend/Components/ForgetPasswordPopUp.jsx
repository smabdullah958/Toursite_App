//this form is open when user is click on a forget password  

"use client";
import Loader from "@/Components/Loader";
import ForgetPasswordThunck from "@/Libraries/ReduxToolkit/AsyncThunck/FogetPasswordThunck";
import {  useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { HideLogIn } from "@/Libraries/ReduxToolkit/Slices/LogInSlice";
import {ShowForgetPassword,HideForgetPassword} from "@/Libraries/ReduxToolkit/Slices/ForgetPasswordSlice"
import { useDispatch,useSelector } from "react-redux";
const schema = yup.object({
  Email: yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgetPasswordPopUp() {
    //it will show and hid ethe popup
  let dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // ForgetPasswordSlice is come froma store bro 
  let {Loading,success,errorMessage,DisplayForgetPassword}=useSelector((state)=>state.ForgetPasswordSlice)

  useEffect(()=>{
    if(success){
        setTimeout(() => {
//this is a hide the login form 
            dispatch(HideLogIn())
            //this is hide the forget password bro 
            dispatch(HideForgetPassword())
        }, 1000);
    }
  },[success,dispatch])

  let handlebutton=(Form)=>{
    dispatch(ForgetPasswordThunck(Form))
  }

  return (
    <div>
      {/* For get Password link */}
      <button
        onClick={()=>dispatch(ShowForgetPassword())}
        className="text-blue-500 hover:text-blue-600 hover:scale-110 duration-500 mb-2 "
      >
        Forgot Password?
      </button>

      {/* Modal */}
      {DisplayForgetPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-60 flex flex-col  ">
            <h2 className="text-lg font-bold  mt-3">Reset Password</h2>
            <div  className="space-y-3">
              {/* {errors.email } */}
              <p className="text-red-500 text-sm my-3">{errors.Email?.message}</p>
            <span className="text-red-300 ">{errorMessage}</span>

              <input
                type="email"
                placeholder="Enter your email"
                {...register("Email")}
                className="border w-full p-2 mb-5  rounded-xl"
              />
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => {dispatch(HideForgetPassword()) ; dispatch((HideLogIn()))}}
                  className="px-6 py-2 rounded-xl bg-[#eff2f4]  text-black font-semibold shadow-lg hover:bg-gradient-to-r from-[#e1e6e9] to-[#d2d6d9]  transition-all duration-500 transform hover:scale-105 active:scale-95"
                >
                  Cancel
                </button>
                <button
                        onClick={handleSubmit(handlebutton)}
                  type="submit" disabled={Loading}
                  className={`px-6 py-2 rounded-xl bg-[#eff2f4]  text-black font-semibold shadow-lg hover:bg-gradient-to-r from-[#e1e6e9] to-[#d2d6d9]  transition-all duration-500 transform  active:scale-95 ${Loading?"opacity-50 cursor-not-allowed":"opacity-100 hover:scale-105"}`}>
                  {Loading?<Loader/>:"Send Link"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
