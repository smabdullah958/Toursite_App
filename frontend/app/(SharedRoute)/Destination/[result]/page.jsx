"use client"
import { useParams } from "next/navigation";
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FindByIdThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/Get/GetDestinationByID"
import Image from "next/image";
import DestinationBookNow from "@/Components/Buttons/Destination/DestinationBookNowButton";
const FindById = () => {
  const { result } = useParams(); //result is come forma backend and it is include a dynamic id
  const dispatch = useDispatch()
  const { Loading, success, result: DisplayResult, error } = useSelector((state) => state.GetByIDSlice)
  
  //DestinationBookNowSlice is come froma a store
  let {updateSlots}=useSelector((state)=>state.DestinationBookNowSlice)

  useEffect(() => {
    if (result) {  
      dispatch(FindByIdThunck(result))
    }
  }, [result, dispatch])

  // Loading State
  if (Loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 animate-pulse">Loading amazing destination...</p>
        </div>
      </div>
    )
  }


  // Error State
  if (error && error.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md mx-4">
          <div className="text-red-500 text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600">Unable to load destination details</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Success State with Data
  if (success && DisplayResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative h-[80vh] overflow-hidden">
          <Image
            src={DisplayResult.Image||"/no image"}
            alt={DisplayResult.Title||"Destination"}
            fill
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          {/* Floating Back Button */}
          <button 
            onClick={() => window.history.back()}
            className="absolute top-6 left-6 bg-white/80 backdrop-blur-md text-black  px-4 py-2 rounded-full hover:bg-white/70 transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl md:text-4xl xl:text:5xl 3xl:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                {DisplayResult.Title || "Amazing Destination"}
              </h1>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">Premium Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>Available Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-full mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Description Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  About This Destination
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg h-48 overflow-y-auto">
                  {DisplayResult.Description || DisplayResult.Discription || "Discover an incredible journey filled with unforgettable experiences, breathtaking views, and memories that will last a lifetime. This destination offers everything you need for the perfect getaway."}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Best Value</h3>
                  </div>
                  <p className="text-white/90 mb-2">Starting from</p>
                  <p className="text-3xl font-bold">Rs {DisplayResult.BasePrice}</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Available Slots</h3>
                  </div>
                  <p className="text-white/90 mb-2">Spots remaining</p>
                  <p className="text-3xl font-bold"> 
                   {updateSlots?.Slots ?? DisplayResult.Slots ?? "Limited"}
</p>
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Book This Experience</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Price per person</span>
                    <span className="text-2xl font-bold text-blue-600">Rs {DisplayResult.BasePrice}</span>
                  </div>
                  
                   <DestinationBookNow 
                   id={DisplayResult._id}
                   basePrice={DisplayResult.BasePrice} 
                   time={DisplayResult.TravelTimes} />
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 text-yellow-700 mb-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Limited Availability</span>
                  </div>
                  <p className="text-sm text-yellow-600">Only {updateSlots?.Slots ?? DisplayResult.Slots ?? "Limited"} spots left! Book soon to secure your place.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } 

 }

export default FindById