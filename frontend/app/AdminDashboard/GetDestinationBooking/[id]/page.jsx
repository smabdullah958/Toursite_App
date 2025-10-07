"use client"
import { useParams } from "next/navigation";
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import GetBookingByIDThunck from "@/Libraries/ReduxToolkit/AsyncThunck/DestinationBookNow/GetBookingByID"
import Loader from "@/app/loading"

const page = () => {
  const { id } = useParams(); //id is come forma backend and it is include a dynamic id
  const dispatch = useDispatch()
  const { Loading, success, UserDetail, error } = useSelector((state) => state.GetBookingByIDSlice)
  
  useEffect(() => {
      dispatch(GetBookingByIDThunck(id))
  }, [id, dispatch])

  // Loading State
  if (Loading) return  <Loader/>
       

  // Error State
  if (error && error.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-red-50 to-pink-100 flex items-center justify-center relative overflow-hidden">
        {/* Desert Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{
                 backgroundImage: `radial-gradient(circle at 25% 25%, #8B4513 2px, transparent 2px),
                                  radial-gradient(circle at 75% 75%, #D2691E 1px, transparent 1px)`,
                 backgroundSize: '120px 120px, 80px 80px'
               }}>
          </div>
        </div>
        
        <div className="text-center bg-gradient-to-br from-amber-50/95 to-yellow-50/90 rounded-2xl shadow-xl shadow-amber-200/30 p-10 max-w-md mx-4 border-2 border-amber-200/50 backdrop-blur-sm relative z-10">
          <div className="text-red-500 text-6xl mb-6 animate-pulse">😞</div>
          <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-3">Oops! Something went wrong</h2>
          <p className="text-amber-700 mb-6">Unable to load User Detail</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full transition-all duration-300 shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }


  //  function to find which booking option was selected  in a array like ina array we have a 10  option but  we dont know which one is selected so for finding a selected option we use this funciton
  const findSelectedBookingOption = (booking) => {
    if (!booking.DestinationID?.BookingOption) return null;
    
    const options = booking.DestinationID.BookingOption;
    
    // If there's only one option, return it
    if (options.length === 1) {
      return options[0];
    }

    
    
    // Try to find the matching option by price
    const selectedOption = options.find(option => {
      if (option.PricingModel === "PerPerson") {
        // For per person: BasePrice * NumberOfAdults (children might be free or different price)
        const calculatedPrice = option.BasePrice * (booking.NumberOfAdultChild || 0);
        // Allow some tolerance in price comparison
        return Math.abs(calculatedPrice - booking.TotalPrice) < 10;
      } else if (option.PricingModel === "FixedUnit") {
        // For fixed unit: Just compare BasePrice with TotalPrice
        return Math.abs(option.BasePrice - booking.TotalPrice) < 10;
      }
      return false;
    });
    
    // If we found a match, return it, otherwise return the first option as fallback
    return selectedOption || options[0];
  };



  // Success State with Data
  if (success &&UserDetail) {

        //  Call the function here to get selected option
    const selectedOption = findSelectedBookingOption(UserDetail);


    return (
      <div className="min-h-[100vh] bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 py-12 relative overflow-hidden">
        {/* Desert Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{
                 backgroundImage: `radial-gradient(circle at 25% 25%, #8B4513 2px, transparent 2px),
                                  radial-gradient(circle at 75% 75%, #D2691E 1px, transparent 1px)`,
                 backgroundSize: '120px 120px, 80px 80px'
               }}>
          </div>
        </div>

        {/* Desert Dune Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-64 bg-gradient-to-br from-amber-200/15 to-yellow-300/10 rounded-full transform -translate-x-32 -translate-y-20 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-amber-300/15 to-yellow-200/10 rounded-full transform translate-x-20 translate-y-20 blur-2xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 2xl:py-56 relative z-10">
          
          {/* Title */}
          <div className="mb-8 text-center 2xl:flex 2xl:flex-col justify-center items-center">
            <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 bg-clip-text text-transparent mb-2 drop-shadow-sm">
              User Details
            </h1>
            <p className="text-amber-700 text-lg">
              Detailed information of the selected booking
            </p>
          </div>

          {/* User Detail Card */}
          <div className="bg-gradient-to-br from-amber-50/95 to-yellow-50/90 2xl:min-w-[50vw] 2xl:p-36 rounded-3xl shadow-xl shadow-amber-200/30 p-8 space-y-6 border-2 border-amber-200/50 backdrop-blur-sm">
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <h2 className="text-2xl md:text-3xl 2xl:text-5xl font-bold text-amber-900">
                {UserDetail.UserID?.Name || "Anonymous User"}
              </h2>
              <p className="text-amber-700 md:text-lg 2xl:text-2xl">{UserDetail.UserID?.Email || "No Email"}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-amber-100/80 2xl:p-7 2xl:text-xl text-amber-800 px-4 py-2 rounded-2xl font-medium border border-amber-200">
              Contact: {UserDetail.ContactNumber || "N/A"}</div>

              <div className="bg-yellow-100/80 2xl:p-7 2xl:text-xl text-amber-800 px-4 py-2 rounded-2xl font-medium border border-amber-200">
              WhatsApp: {UserDetail.WhatsAppNumber || "N/A"}</div>

              <div className="bg-amber-100/80 text-amber-800 2xl:p-7 2xl:text-xl px-4 py-2 rounded-2xl font-medium border border-amber-200">
              Pickup Address: {UserDetail.PickUpAddress || "N/A"}</div>

              <div className="bg-yellow-100/80 text-amber-800 2xl:p-7 2xl:text-xl px-4 py-2 rounded-2xl font-medium border border-amber-200">
              Destination: {UserDetail.DestinationID?.Title || "Unknown"}</div>

                             {/*  Show Category */}
              <div className="bg-amber-100/80 text-amber-800 2xl:p-7 2xl:text-xl px-4 py-2 rounded-2xl font-medium border border-amber-200">
                Category: {selectedOption?.Category || "N/A"}
              </div>

               <div className="bg-amber-100/80 text-amber-800 2xl:p-7 2xl:text-xl px-4 py-2 rounded-2xl font-medium border border-amber-200">
                Duration: {selectedOption?.Duration || "N/A"}
              </div>

                              {selectedOption?.PricingModel === "PerPerson" ? (
                <>
                  <div className="bg-yellow-100/80 text-amber-800 2xl:p-7 2xl:text-xl px-4 py-2 rounded-2xl font-medium border border-amber-200">
                    Adults: {UserDetail.NumberOfAdultChild || 0}
                  </div>
                  <div className="bg-amber-100/80 text-amber-800 2xl:p-7 2xl:text-xl px-4 py-2 rounded-2xl font-medium border border-amber-200">
                    Children: {UserDetail.NumberOfNoneAdultChild || 0}
                  </div>
                </>
              ) : (
                <div className="bg-yellow-100/80 text-amber-800 2xl:p-7 2xl:text-xl px-4 py-2 rounded-2xl font-medium border border-amber-200">
                  Car Capacity: {selectedOption?.CarCapacity || "N/A"}
                </div>
              )}


              <div className="bg-yellow-100/80 text-amber-800 2xl:p-7 2xl:text-xl px-4 py-2 rounded-2xl font-medium border border-amber-200">
              Booking Date: {UserDetail.Date || "N/A"}</div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <div className="bg-amber-200/80 text-amber-900 2xl:p-7 2xl:text-xl px-4 py-2 rounded-full font-semibold border border-amber-300">Total Price:  {UserDetail.TotalPrice || 0} AED</div>
              <div className="bg-yellow-200/80 text-amber-900 2xl:p-7 2xl:text-xl px-4 py-2 rounded-full font-semibold border border-amber-300">Payment Method: {UserDetail.PaymentMethod || "N/A"}</div>
              <div className="bg-amber-200/80 text-amber-900 2xl:p-7 2xl:text-xl px-4 py-2 rounded-full font-semibold border border-amber-300">Payment Status: {UserDetail.PaymentStatus || "N/A"}</div>
            </div>

          </div>
        </div>
      </div>
    )
  } 
}

export default page;