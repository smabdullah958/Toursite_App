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
import UpdatePackageSlice from "@/Libraries/ReduxToolkit/Slices/Packages/UpdateSlice"
import PackageSearchBarSlice from "@/Libraries/ReduxToolkit/Slices/Packages/SearchBarSlice"
import PackageBookNowSlice from "@/Libraries/ReduxToolkit/Slices/Packages/PackageBookNow"

//DestinationBookNow
import DestinationBookNowSlice from '@/Libraries/ReduxToolkit/Slices/DestinationBookNow/DestinationBookNow'
import GetFirstTwentyBookingSlice from "@/Libraries/ReduxToolkit/Slices/DestinationBookNow/GetFirstTwentyBooking"
import GetBookingByIDSlice from "@/Libraries/ReduxToolkit/Slices/DestinationBookNow/GetByIDSlice";
import DestinationMarkAsPaid from "@/Libraries/ReduxToolkit/Slices/DestinationBookNow/DestinationMarkAsPaid"
import DestinationBookNowSearchBarSlice from "@/Libraries/ReduxToolkit/Slices/DestinationBookNow/DestinationBookNowSearchBar"

//PackagesBookNow
import PackageBookNow from "@/Libraries/ReduxToolkit/Slices/PackageBookNow/PackageBookNowSlice"
import GetFirstTwentyPackagesBookNow from "@/Libraries/ReduxToolkit/Slices/PackageBookNow/GetFirstTwentyPackageBookingSlice"
import GetPackageByIDSlice from "@/Libraries/ReduxToolkit/Slices/PackageBookNow/GetPackageByIDSlice"
import PackageMarkAsPaid from "@/Libraries/ReduxToolkit/Slices/PackageBookNow/PackageMarkAsPaidSLice"
import PackageBookNowSearchBarSlice from "@/Libraries/ReduxToolkit/Slices/PackageBookNow/PackageBookNowSearch"

export const store = configureStore({
  reducer: {
    //auth
    LogInSlice,
    PostFormSlice,
    CheckLogInSlice,
    LogOutSlice,
    ForgetPasswordSlice,
    ResetPasswordSlice,
    
    //destination
    PostImageSlice,
    GetFirstTwentyImageSlice,
  GetByIDSlice,
  GetSixImageSlice,
  DeleteSlice,
  UpdateSlice,
  SearchBarSlice,
DestinationBookNowSlice,

//packages
  PostPackageSlice,
  GetFirst12PackagesSlice,
  GetByIdSlice,
  GetSixPackagesSlice,
  UpdatePackageSlice,
  PackageSearchBarSlice,
  PackageBookNowSlice,
  
  //DestinationBookNow
  DestinationBookNowSlice,
GetFirstTwentyBookingSlice,
GetBookingByIDSlice,
DestinationMarkAsPaid,
DestinationBookNowSearchBarSlice,

//package book now
PackageBookNow,
GetFirstTwentyPackagesBookNow,
GetPackageByIDSlice,
PackageMarkAsPaid,
PackageBookNowSearchBarSlice
},
})