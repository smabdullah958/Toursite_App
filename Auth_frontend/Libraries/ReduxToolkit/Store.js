"use client"
import { configureStore } from '@reduxjs/toolkit'
import LogInSlice  from '@/Libraries/ReduxToolkit/Slices/LogInSlice'
import PostFormSlice from '@/Libraries/ReduxToolkit/Slices/PostFormSlice'
import CheckLogInSlice from "@/Libraries/ReduxToolkit/Slices/CheckLogInSlice"
import LogOutSlice from "@/Libraries/ReduxToolkit/Slices/LogOutSlice"
// when user is enter a emial than this sice is for thsi it means for a popup bro
import ForgetPasswordSlice from '@/Libraries/ReduxToolkit/Slices/ForgetPasswordSlice'
//when a user is click ona link which is sedn to gmail than its slice is this
import ResetPasswordSlice from '@/Libraries/ReduxToolkit/Slices/ResetPasswordSlice'

export const store = configureStore({
  reducer: {
    LogInSlice,
    PostFormSlice,
    CheckLogInSlice,
    LogOutSlice,
    ForgetPasswordSlice,
    ResetPasswordSlice
    
  },
})