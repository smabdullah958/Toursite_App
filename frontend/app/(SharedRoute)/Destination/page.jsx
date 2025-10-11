"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GetFirstTwentyImage from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/Get/GetFirstTwentyImageThunck";
import Link from "next/link";
import DeleteButton from "@/Components/Buttons/Destination/DeleteDestination";
import Image from "next/image";
import UpdateButton from "@/Components/Buttons/Destination/UpdateDestination";
import UpdateForm from '@/Components/Form/DestinationAndBookNowForm/UpdateFormDestination';
import SearchBar from "@/app/(SharedRoute)/Destination/SearchBar";


const DestinationPage = () => {

  // State for selected dates per tour
 
  const { FormId } = useSelector(state => state.UpdateSlice);
  const { IsLogIn, Role } = useSelector((state) => state.CheckLogInSlice);

  const dispatch = useDispatch();
  const { result, page, Loading, hasMore } = useSelector(
    (state) => state.GetFirstTwentyImageSlice
  );
  
  let {SearchResult, loading, isSearched} = useSelector(state => state.SearchBarSlice);
  let displayResult = isSearched ? SearchResult : result;

  useEffect(() => {
    if (displayResult.length === 0) {
      dispatch(GetFirstTwentyImage({ page: 1, limit: 20 }));
    }
  }, [dispatch, displayResult.length]);

  const handleSeeMore = () => {
    if (!Loading && hasMore) {
      dispatch(GetFirstTwentyImage({ page: page + 1, limit: 20 }));
    }
  };

  const filteredResult = displayResult.filter((tour) => {
    if (Role === "Admin") return true;
    return tour.BookingOption?.some(option=>option.Slots > 0
    );
    });

      // Helper function to get available booking option price
  // This ensures we only show prices for booking options with available slots
  const getAvailablePrice = (tour) => {
    // If no booking options exist, return N/A
    if (!tour.BookingOption || tour.BookingOption.length === 0) return "N/A";
    
    // Find first booking option with slots > 0
    const availableOption = tour.BookingOption.find(opt => opt.Slots > 0);
    
    // If available option found, return its base price
    if (availableOption) {
      return availableOption.BasePrice;
    }
    
    // If admin and no slots available, show first option price anyway
    if (Role === "Admin" && tour.BookingOption[0]) {
      return tour.BookingOption[0].BasePrice;
    }
    
    // Otherwise return N/A
    return "N/A";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Header Section */}
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Explore Our <span className="bg-gradient-to-r from-amber-800 via-yellow-700 to-amber-600 bg-clip-text text-transparent">Premium Destinations</span>
          </h1>
          <p className="text-amber-700 text-sm sm:text-lg max-w-2xl mx-auto mb-8">
            Discover extraordinary places and create unforgettable memories with our carefully curated travel experiences.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto"> 
          <SearchBar />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen mx-auto px-6 pb-16">
        {/* Results Header */}
        <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl shadow-lg p-6 mb-8 border border-amber-200">
          <h2 className="text-2xl font-bold text-amber-900">
            Popular Destinations
            <span className="text-lg text-amber-600 font-normal ml-2">({filteredResult.length} found)</span>
          </h2>
        </div>

        {/* No Results State */}
        {isSearched && filteredResult.length === 0||result.length===0 && !loading && !Loading && (
          <div className="text-center py-16">
            <div className="text-6xl text-amber-300 mb-6">🏝️</div>
            <h3 className="text-3xl font-bold text-amber-800 mb-2">No destinations found</h3>
            <p className="text-amber-600">We couldn't find any destinations </p>
          </div>
        )}

        {/* Destinations Grid */} 
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {filteredResult.map((tour, i) => (

              <div
                key={`${tour._id}-${i}`}
                className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-3 border border-amber-200"
              >
                {/* Image Section */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={tour.Image || "/no-image.jpg"}
                    alt={tour.Title || "destination"}
                    loading="lazy"
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Price Badge */}
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-4 py-2 rounded-full shadow-lg">
                    <span className="text-lg font-bold">AED  {" "+getAvailablePrice(tour)}</span>
                  </div>

                  {/* Quick View on Hover */}
                  <div className="absolute inset-0 bg-amber-900/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <Link
                      href={`Destination/${tour._id}`}
                      className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg hover:shadow-xl"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-amber-900 group-hover:text-amber-700 transition-colors line-clamp-2 h-12 overflow-y-auto sm:h-20">
                      {tour.Title || "Amazing Destination"}
                    </h3>
                  </div>

                  {/* Mobile View Details Button */}
                  <Link
                    href={`/Destination/${tour._id}`}
                    className="md:hidden block w-full bg-gradient-to-r from-amber-700 to-yellow-700 hover:from-amber-600 hover:to-yellow-600 text-white text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                  >
                    View Details
                  </Link>

                  {/* Admin Controls */}
                  {IsLogIn && Role === "Admin" && (
                    <div className="flex gap-3 justify-between mt-4 pt-4 border-t border-amber-200">
                      <DeleteButton id={tour._id} />
                      <UpdateButton id={tour._id} />
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>

        {/* Update Form Modal */}
        {FormId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative border border-amber-200 max-h-[90vh] overflow-y-auto">
              <UpdateForm id={FormId} />
            </div>
          </div>
        )}

        {/* Loading State */}
        {(Loading || loading) && (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600 mx-auto mb-4"></div>
              <p className="text-xl text-amber-700 animate-pulse">Loading more destinations...</p> 
            </div> 
          </div>
        )}

        {/* Load More Button */}
        {hasMore && filteredResult.length >= 20 && !Loading && !loading &&  (
          <div className="flex justify-center mt-12">
            <button
              type="button"
              onClick={handleSeeMore}
              disabled={Loading}
              className="group relative bg-gradient-to-r from-amber-700 to-yellow-700 hover:from-amber-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                Show More Destinations
                <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationPage;