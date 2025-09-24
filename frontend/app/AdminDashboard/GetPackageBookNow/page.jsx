
"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SearchBar from "@/app/AdminDashboard/GetPackageBookNow/SearchBar";

//here we can get 20 bookings
import GetFistTwentyPackagsBooking from "@/Libraries/ReduxToolkit/AsyncThunck/PackagaBookNow/GetFirstTwentyPackagesBooking";
import Link from "next/link";

import PackageBookingMarkAsPaidButton from "@/Components/Buttons/BookingNow/PackageMarkAsPaid";

const GetFirstTwentyPackageBookingNow = () => {

    //it will shwo the result of a searching
      let {SearchResult,loading,isSearched}=useSelector(state=>state.PackageBookNowSearchBarSlice)
    
  
  const dispatch = useDispatch();

  //GetFirstTwentyPackagesBookNow is come from a store
  const { Booking, page, Loading, hasMore } = useSelector(
    (state) => state.GetFirstTwentyPackagesBookNow
  );

    //is search is traack teh serch is done or not
  let displayResult = isSearched ? SearchResult : Booking;

  useEffect(() => {
if(displayResult.length===0){
    dispatch(GetFistTwentyPackagsBooking({ page: 1, limit: 20 }));
}
  }, [dispatch,dispatch.length]);


  const handleSeeMore = () => {
    if (!Loading && hasMore) {
      dispatch(GetFistTwentyPackagsBooking({ page: page + 1, limit: 20 }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-screen mx-auto px-6 py-5 md:py-10 ">
        {/* Page Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-5 tracking-tight">
          All Destination Bookings
        </h1>

          <div>
          <SearchBar />
        </div>

                   {/* Booking Summary */}
        <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-8 mb-5 2xl:mb-10 flex justify-between items-center border border-gray-200 flex-wrap ">
          <h2 className="text-lg md:text-3xl font-bold text-gray-900">
            Booking Summary
            <span className="text-sm md:text-lg text-gray-500 font-medium ">
              ({displayResult?.length} found)
            </span>
          </h2>
          <div className="text-gray-500 font-medium text-sm md:text-lg  ">
            Page: {page} | Limit: 20
          </div>
        </div>

        {/* No Results */}
        {isSearched && displayResult?.length === 0 && !Loading && !loading && (
          <div className="text-center py-20">
            <div className="text-8xl md:text-9xl text-gray-300 mb-6 animate-bounce">🏝️</div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-700 mb-2">
              No Bookings Found
            </h3>
            <p className="text-gray-500 text-lg md:text-xl">
              Currently, there are no destination bookings.
            </p>
          </div>
        )}

        {/* Booking Cards Grid */}
        <div className="grid gap-10 sm:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {displayResult.map((booking, i) => (
            <div
              key={`${booking._id}-${i}`}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-transparent hover:border-blue-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  UserName: {booking.UserID?.Name || "Anonymous User"}
                </h3>
                <p className="text-gray-500 text-sm md:text-base mb-3">
                  {booking.UserID?.Email || "No Email"}
                </p>

                <h4 className="text-lg md:text-xl font-semibold text-gray-700 mb-2 truncate">
                  Destination: {booking.PackageID?.Title || "Unknown"}
                </h4>
                <p className="text-gray-600 mb-4">
                  Total Price: <span className="font-bold text-blue-600">Rs {booking.TotalPrice}</span>
                </p>

                {/* Payment Method */}
                <p className="text-gray-600 mb-2">
                  PaymentMethod: <span className="font-bold">{booking.PaymentMethod}</span>
                </p>

                <p className="text-gray-600 mb-2">
                  PaymentStatus:{" "}
                  <span className={`font-bold ${booking.PaymentStatus === "Paid" ? "text-green-600" : "text-red-600"}`}>
                    {booking.PaymentStatus}
                  </span>
                </p>

                {/* Booking Details */}
                <div className="flex flex-wrap gap-2 text-gray-500 text-sm md:text-base mt-2">
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full shadow-sm">Days: {booking.Days||1}</span>

                  <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full shadow-sm">Adults: {booking.NumberOfAdultChild}</span>

                  <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full shadow-sm">Children: {booking.NumberOfNoneAdultChild || 0}</span>

                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full shadow-sm">Booking Date: {booking.Date}</span>

                </div> 

                <div className="flex flex-wrap md:justify-between justify-normal">
                <Link href={`GetPackageBookNow/${booking._id}`} className="px-6 py-2 rounded-xl  bg-gradient-to-r from-[#3fb7eb] to-[#23a4dc] text-white font-semibold shadow-lg  transition-all duration-500 transform hover:scale-105 active:scale-95 mr-5 opacity-100 hover:from-[#0693cf] hover:to-[#0f94cd] mt-3">View Detail</Link>
                
                {
                  booking.PaymentMethod==="Cash" && booking.PaymentStatus==="Not Paid"   ?
                <PackageBookingMarkAsPaidButton id={booking?._id}/>   :
                  (<span className="text-green-600 font-bold mt-3">✔ Paid</span>)
                }
                
              </div>

              </div>
           
            </div>

          ))}
        </div>

        {/* Loading State */}
        {(Loading || loading) && (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-b-4 mx-auto mb-4"></div>
              <p className="text-xl md:text-2xl text-gray-600 animate-pulse">Loading more bookings...</p>
            </div>
          </div>
        )}

        {/* Load More Button */}
        { !isSearched && hasMore && !Loading && (
          <div className="flex justify-center mt-12">
            <button
              type="button"
              onClick={handleSeeMore}
              disabled={Loading}
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-3 text-sm sm:text-md md:text-xl  "
            >
              Show More Bookings
              <svg
                className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetFirstTwentyPackageBookingNow;
