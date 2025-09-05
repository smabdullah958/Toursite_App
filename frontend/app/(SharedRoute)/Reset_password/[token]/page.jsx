//this is used when we click on a link which is send to our email when we click ona link than this component is dispaaly
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
  const { Loading, success, errorMessage } = useSelector(
    (state) => state.ResetPasswordSlice
  );

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

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [success, router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-100 via-blue-50 to-purple-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🔒 Reset Your Password
        </h2>

        {/* Error message */}
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              {...register("Password")}
              className="border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.Password?.message}
            </p>
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter new password"
              {...register("confirmPassword")}
              className="border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <button
            onClick={handleSubmit(handleButton)}
            type="submit"
            disabled={Loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
              Loading
                ? "bg-green-200 text-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg"
            }`}
          >
            {Loading ?<Loader/> : "✅ Reset Password"}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          Make sure your new password is at least 6 characters long.
        </p>
      </div>
    </div>
  );
}