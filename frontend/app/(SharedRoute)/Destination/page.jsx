"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GetFirstTwentyImage from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/Get/GetFirstTwentyImageThunck";
import Link from "next/link";
import DeleteButton from "@/Components/Buttons/DeleteButton";
import Image from "next/image";

const DestinationPage = () => {
// ✅ read login + role state from CheckLoginSlice
  const { IsLogIn, Role } = useSelector((state) => state.CheckLogInSlice);

  const dispatch = useDispatch();
  const { result, page, Loading, hasMore } = useSelector(
    (state) => state.GetFirstTwentyImageSlice
  );

  useEffect(() => {
    if (result.length === 0) {
      dispatch(GetFirstTwentyImage({ page: 1, limit: 20 }));
    }

  }, [dispatch]);

  const handleSeeMore = () => { 
    
    if (!Loading && hasMore) {
      dispatch(GetFirstTwentyImage({ page: page + 1, limit: 20 }));
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Header Section */}
      {/* <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background Elements 
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 animate-pulse delay-1000"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Discover Amazing 
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Destinations
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Explore breathtaking locations, create unforgettable memories, and embark on the journey of a lifetime
          </p>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="max-w-screen mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Popular Destinations
            <span className="text-lg text-gray-500 font-normal ml-2">({result.length} found)</span>
          </h2>
        </div>

        {/* No Results State */}
        {result.length === 0 && !Loading && (
          <div className="text-center py-16">
            <div className="text-6xl text-gray-300 mb-4">🏝️</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No destinations found</h3>
            <p className="text-gray-500">We couldn't find any destinations at the moment</p>
          </div>
        )}

        {/* Destinations Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {result.map((tour, i) => (
            <div
              key={`${tour._id}-${i}`}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Image Section */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={tour.Image}
                  alt={tour.Title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Favorite Button
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button> */}

                {/* Price Badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-lg font-bold text-blue-600">${tour.BasePrice || "N/A"}</span>
                </div>

                {/* Quick View on Hover */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <Link
                    href={`Destination/${tour._id}`}
                    className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {tour.Title || "Amazing Destination"}
                  </h3>
                </div>

                {/* Rating */}
                {/* <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">4.8 (128 reviews)</span>
                </div>

                {/* Features */}
                {/* <div className="flex items-center gap-4 text-sm text-gray-600 mb-4"> 
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>Adventure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>3-5 days</span>
                  </div>
                </div> */}

                {/* Action Buttons */}
{
  IsLogIn && Role==="User" &&(

                <div className="flex gap-3">
                  <Link
                    href={`Destination/${tour._id}`}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                  >
                    Book Now
                  </Link>
                                 </div>
  )}
  
                {/* Action Buttons */}
{
  IsLogIn && Role==="Admin" &&(

                <div className="flex gap-3">
                  <DeleteButton id={tour._id}/>
                                 </div>
  )}
              </div>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {Loading && (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600 animate-pulse">Loading more destinations...</p>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && !Loading && (
          <div className="flex justify-center mt-12">
            <button
              type="button"
              onClick={handleSeeMore}
              disabled={Loading}
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
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

        {/* End of Results Message */}
        {/* {!hasMore && !Loading && result.length > 0 && (
          <div className="text-center py-12">
            <div className="text-4xl text-gray-300 mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">You've seen all destinations!</h3>
            <p className="text-gray-500">Check back later for new exciting places to explore</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default DestinationPage;