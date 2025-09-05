"use client"
import { configureStore } from '@reduxjs/toolkit'
import LogInSlice  from '@/Libraries/ReduxToolkit/Slices/Auth/LogInSlice'
import PostFormSlice from '@/Libraries/ReduxToolkit/Slices/Auth/PostFormSlice'
import CheckLogInSlice from "@/Libraries/ReduxToolkit/Slices/Auth/CheckLogInSlice"
import LogOutSlice from "@/Libraries/ReduxToolkit/Slices/Auth/LogOutSlice"
// when user is enter a emial than this sice is for thsi it means for a popup bro
import ForgetPasswordSlice from '@/Libraries/ReduxToolkit/Slices/Auth/ForgetPasswordSlice'
//when a user is click ona link which is sedn to gmail than its slice is this
import ResetPasswordSlice from '@/Libraries/ReduxToolkit/Slices/Auth/ResetPasswordSlice'

import PostImageSlice from "@/Libraries/ReduxToolkit/Slices/Destination/PostImageSlice"
import GetFirstTwentyImageSlice from '@/Libraries/ReduxToolkit/Slices/Destination/get/GetFirstTwentyImage'
import GetByIDSlice from "@/Libraries/ReduxToolkit/Slices/Destination/get/GetByID"
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
  GetByIDSlice
  },
})