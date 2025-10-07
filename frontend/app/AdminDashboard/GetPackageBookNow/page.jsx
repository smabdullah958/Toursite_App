
"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SearchBar from "@/app/AdminDashboard/GetPackageBookNow/SearchBar";
import Loader from "@/app/loading"
//here we can get 20 bookings
import GetFistTwentyPackagsBooking from "@/Libraries/ReduxToolkit/AsyncThunck/PackagaBookNow/GetFirstTwentyPackagesBooking";
import Link from "next/link";

import PackageBookingMarkAsPaidButton from "@/Components/Buttons/MarkAsPaid/PackageMarkAsPaid";

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


  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 relative overflow-hidden">
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

      <div className="max-w-screen mx-auto px-6 py-5 md:py-10 relative z-10">
        {/* Page Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 bg-clip-text text-transparent text-center 
        mb-5 tracking-tight drop-shadow-sm sm:pb-5">
          All Packages Bookings
        </h1>

          <div >
          <SearchBar />
        </div>

                   {/* Booking Summary */}
        <div className="bg-gradient-to-br from-amber-50/95 to-yellow-50/90 rounded-3xl shadow-lg shadow-amber-200/20 p-4 sm:p-8 mb-5 2xl:mb-10 flex justify-between items-center border-2 border-amber-200/50 flex-wrap backdrop-blur-sm">
          <h2 className="text-lg md:text-3xl font-bold text-amber-900">
            Booking Summary
            <span className="text-sm md:text-lg text-amber-700 font-medium ">
              ({displayResult?.length} found)
            </span>
          </h2>
          <div className="text-amber-700 font-medium text-sm md:text-lg  ">
            Page: {page} | Limit: 20
          </div>
        </div>

        {/* No Results */}
        {isSearched && displayResult?.length === 0 && !Loading && !loading && (
          <div className="text-center py-20">
            <div className="text-8xl md:text-9xl text-amber-300 mb-6 animate-bounce">🏝️</div>
            <h3 className="text-3xl md:text-4xl font-bold text-amber-800 mb-2">
              No Bookings Found
            </h3>
            <p className="text-amber-600 text-lg md:text-xl">
              Currently, there are no destination bookings.
            </p>
          </div>
        )}


   {/* Booking Cards Grid */}
        <div className="grid gap-10 sm:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {displayResult.map((booking, i) => {
            //  Call the function here to get the selected option
            const selectedOption = findSelectedBookingOption(booking);
            
            return (
            <div
              key={`${booking._id}-${i}`}
              className="bg-gradient-to-br from-amber-50/95 to-yellow-50/90 rounded-3xl shadow-xl shadow-amber-200/20 hover:shadow-2xl hover:shadow-amber-300/30 transition-all duration-500 transform hover:-translate-y-2 border-2 border-amber-200/50 hover:border-amber-300/70 overflow-hidden backdrop-blur-sm"
            >
              {/* Card Header */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-amber-900 mb-1">
                  UserName: {booking.UserID?.Name || "Anonymous User"}
                </h3>
                <p className="text-amber-700 text-sm md:text-base mb-3">
                  {booking.UserID?.Email || "No Email"}
                </p>

                <h4 className="text-lg md:text-xl font-semibold text-amber-800 mb-2 truncate">
                  Destination: {booking.PackageID?.Title || "Unknown"}
                </h4>
                <p className="text-amber-700 mb-4">
                  Total Price: <span className="font-bold text-amber-800"> {booking.TotalPrice} AED</span>
                </p>

                {/* Payment Method */}
                <p className="text-amber-700 mb-2">
                  PaymentMethod: <span className="font-bold">{booking.PaymentMethod}</span>
                </p>

                <p className="text-amber-700 mb-2">
                  PaymentStatus:{" "}
                  <span className={`font-bold ${booking.PaymentStatus === "Paid" ? "text-green-700" : "text-red-700"}`}>
                    {booking.PaymentStatus}
                  </span>
                </p>


                  {/* Booking Details  like category car capcity and many more */}
                <div className="flex flex-wrap gap-2 text-amber-700 text-sm md:text-base mt-2">
                  <span className="bg-amber-100/80 text-amber-800 px-3 py-1 rounded-full shadow-sm border border-amber-200">
                    Category: {booking?.Category || "N/A"}
                  </span>
                  
                  {selectedOption?.PricingModel === "PerPerson" ? (
                    <>
                      <span className="bg-yellow-100/80 text-amber-800 px-3 py-1 rounded-full shadow-sm border border-amber-200">
                        Adults: {booking.NumberOfAdultChild}
                      </span>
                      <span className="bg-amber-100/80 text-amber-800 px-3 py-1 rounded-full shadow-sm border border-amber-200">
                        Children: {booking.NumberOfNoneAdultChild || 0}
                      </span>
                    </>
                  ) : (
                    <span className="bg-amber-100/80 text-amber-800 px-3 py-1 rounded-full shadow-sm border border-amber-200">
                      Car Capacity: {booking?.CarCapacity || "N/A"}
                    </span>
                  )}
                  
                  <span className="bg-yellow-100/80 text-amber-800 px-3 py-1 rounded-full shadow-sm border border-amber-200">
                    Booking Date: {booking.Date}
                  </span>
                </div>

                <div className="flex flex-wrap md:justify-between justify-normal">
                <Link href={`GetPackageBookNow/${booking._id}`} className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold shadow-lg  transition-all duration-500 transform hover:scale-105 active:scale-95 mr-5 opacity-100 mt-3">View Detail</Link>
                
                {
                  booking.PaymentMethod==="Cash" && booking.PaymentStatus==="Not Paid"   ?
                <PackageBookingMarkAsPaidButton id={booking?._id}/>   :
                  (<span className="text-yellow-500 font-bold mt-3">✔ Paid</span>)
                }
                
              </div>

              </div>
           
            </div>
          
          )}
          )}
        </div>

        {/* Loading State */}
        {(Loading || loading) && <Loader/>}

        {/* Load More Button */}
        { !isSearched && hasMore && !Loading && (
          <div className="flex justify-center mt-12">
            <button
              type="button"
              onClick={handleSeeMore}
              disabled={Loading}
              className="group relative bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-amber-300/50 flex items-center gap-3 text-sm sm:text-md md:text-xl shadow-lg"
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