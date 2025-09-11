"use client"
import { configureStore } from '@reduxjs/toolkit'
//auth slices
import LogInSlice  from '@/Libraries/ReduxToolkit/Slices/Auth/LogInSlice'
import PostFormSlice from '@/Libraries/ReduxToolkit/Slices/Auth/PostFormSlice'
import CheckLogInSlice from "@/Libraries/ReduxToolkit/Slices/Auth/CheckLogInSlice"
import LogOutSlice from "@/Libraries/ReduxToolkit/Slices/Auth/LogOutSlice"
// when user is click on a forget password link than its slice is this
import ForgetPasswordSlice from '@/Libraries/ReduxToolkit/Slices/Auth/ForgetPasswordSlice'
//when a user is click ona link which is sedn to gmail than its slice is this
import ResetPasswordSlice from '@/Libraries/ReduxToolkit/Slices/Auth/ResetPasswordSlice'

//destination slices
import PostImageSlice from "@/Libraries/ReduxToolkit/Slices/Destination/PostImageSlice"
import GetFirstTwentyImageSlice from '@/Libraries/ReduxToolkit/Slices/Destination/get/GetFirstTwentyImage'
import GetByIDSlice from "@/Libraries/ReduxToolkit/Slices/Destination/get/GetByID"
import GetSixImageSlice from "@/Libraries/ReduxToolkit/Slices/Destination/get/GetSixImage"
import DeleteSlice from "@/Libraries/ReduxToolkit/Slices/Destination/DeleteSlice"
import UpdateSlice from "@/Libraries/ReduxToolkit/Slices/Destination/UpdateSlice"
import SearchBarSlice from "@/Libraries/ReduxToolkit/Slices/Destination/SearchBarSlice"

//packages slices
import PostPackageSlice from "@/Libraries/ReduxToolkit/Slices/Packages/PostPackageSlice"
import GetFirst12PackagesSlice from "@/Libraries/ReduxToolkit/Slices/Packages/GetPackages/GetFirst12PackagesSlice"
import GetByIdSlice from "@/Libraries/ReduxToolkit/Slices/Packages/GetPackages/GetByIDSlice"
import GetSixPackagesSlice from "@/Libraries/ReduxToolkit/Slices/Packages/GetPackages/GetSixPackagesSlice"

export const store = configureStore({
  reducer: {
    LogInSlice,
    PostFormSlice,
    CheckLogInSlice,
    LogOutSlice,
    ForgetPasswordSlice,
    ResetPasswordSlice,
    PostImageSlice,
    GetFirstTwentyImageSlice,
  GetByIDSlice,
  GetSixImageSlice,
  DeleteSlice,
  UpdateSlice,
  SearchBarSlice,
  PostPackageSlice,
  GetFirst12PackagesSlice,
  GetByIdSlice,
  GetSixPackagesSlice
  },
})