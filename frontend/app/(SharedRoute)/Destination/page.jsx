"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GetFirstTwentyImage from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/Get/GetFirstTwentyImageThunck";
import Link from "next/link";
import DeleteButton from "@/Components/Buttons/DeleteDestination";
import Image from "next/image";
import UpdateButton from "@/Components/Buttons/UpdateDestination";
import UpdateForm from '@/Components/Form/UpdateForm';
import SearchBar from "@/app/(SharedRoute)/Destination/SearchBar";


const DestinationPage = () => {
//hre the we get the formid from updateslice and also it is used to show a form
  const { FormId } = useSelector(state => state.UpdateSlice);

// ✅ read login + role state from CheckLoginSlice
  const { IsLogIn, Role } = useSelector((state) => state.CheckLogInSlice);

  const dispatch = useDispatch();
  const { result, page, Loading, hasMore } = useSelector(
    (state) => state.GetFirstTwentyImageSlice
  );
//it will shwo the result of a sraching
  let {SearchResult,loading,isSearched}=useSelector(state=>state.SearchBarSlice)
//is search is traack teh serch is done or not
  let displayResult = isSearched ? SearchResult : result;

  useEffect(() => {
    if (displayResult.length === 0) {
      dispatch(GetFirstTwentyImage({ page: 1, limit: 20 }));
    }

  }, [dispatch,displayResult.length]);

  const handleSeeMore = () => {

    if (!Loading && hasMore) {
      dispatch(GetFirstTwentyImage({ page: page + 1, limit: 20 }));
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-screen mx-auto px-6 py-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Explore Our Exciting Destinations
        </h1>
        <div>
          <SearchBar />
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-screen mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Popular Destinations
            <span className="text-lg text-gray-500 font-normal ml-2">({displayResult.length} found)</span>
          </h2>
        </div>

        {/* No Results State */}
        { isSearched && displayResult.length === 0 && !loading && !Loading && (
          <div className="text-center py-16">
            <div className="text-6xl text-gray-300 mb-4">🏝️</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No destinations found</h3>
            <p className="text-gray-500">We couldn't find any destinations at the moment</p>
          </div>
        )}

        {/* Destinations Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {displayResult.map((tour, i) => (
            <div
              key={`${tour._id}-${i}`}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Image Section */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={tour.Image||"/no imaae.jpg"}
                  alt={tour.Title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 truncate">
                    {tour.Title || "Amazing Destination"}
                  </h3>
                </div>

                {/* Action Buttons */}

 {/* { IsLogIn && Role==="User" &&(

                <div className="flex gap-3">
                  <Link
                    href={`Destination/${tour._id}`}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                  >
                    Book Now
                  </Link>
                                 </div>
  )} */}

  {/* Default action for non-logged users */}
                                 
                                    <Link
                                        href={`/Destination/${tour._id}`}
                                        className="md:hidden block w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                                    >
                                        View Details
                                    </Link>
                                

                {/* Action Buttons */}
{
  IsLogIn && Role==="Admin" &&(

                <div className="flex gap-3 justify-between mt-3">
                  <DeleteButton id={tour._id}/>
                     <UpdateButton id={tour._id}/>
                                 </div>
  )}
              </div>
            </div>
          ))}
        </div>
{/* //show update form if  */}
                {FormId && <UpdateForm id={FormId} />}


        {/* Loading State */}
        {(Loading || loading) && (
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

      </div>
    </div>
  );
};

export default DestinationPage;