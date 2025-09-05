
// // "use client";
// // import React, { useEffect } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import GetFirstTwentyImage from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/Get/GetFirstTwentyImageThunck";
// // import Loader from "@/Components/Loader";
// // import Link from "next/link";
// // const DestinationPage = () => {
// //   const dispatch = useDispatch(); 
// //   const {result,page,Loading,hasMore } = useSelector(
// //     (state) => state.GetFirstTwentyImageSlice
// //   );
// //   useEffect(() => {
// //   if (result.length === 0) {   // ✅ only fetch if no data
// //     dispatch(GetFirstTwentyImage({ page: 1, limit: 20 }));
// //   }
// // }, []);


// //   let handleSeeMore=()=>{
// //     if(!Loading && hasMore){
// //     dispatch(GetFirstTwentyImage({page:page+1,limit:20}))
// //   }}
// //  return (
// //     <div className="p-6">
// //       {result.length === 0 && (
// //         <p className="text-center text-gray-500 text-lg">No destinations found</p>
// //       )}

// //       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
// //         {result.map((tour, i) => (
// //           <div
// //             key={`${tour.BasePrice_id||i}`}
// //             className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
// //           >
// //             {/* Image wrapper with responsive aspect ratio */}
// //             <div className="w-full aspect-[4/3] overflow-hidden">
// //               <img
// //                 src={tour.Image}
// //                 alt={tour.Title}
// //                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
// //               />
// //             </div>

// //             {/* Card content */}
// //             <div className="p-4">
// //               <h2 className="text-lg font-semibold text-gray-800 truncate">
// //                 {tour.Title || "No Title"}
// //               </h2>
// //               <div className="flex justify-between">
// //               <p className="text-md font-bold text-blue-600 mt-2">
// //                 ${tour.BasePrice || "N/A"}
// //               </p>
// //           <Link href={`Destination/${tour._id}`} className="text-md font-bold text-blue-600 mt-2 hover:underline-">
// //           more detail</Link> 
// //             </div>
// //             </div>
         
// //           </div>
// //         ))}
// //       </div>
      
// //       {/* Loader under grid */}
// // {Loading && <Loader className="text-blue-300" />}

// // {/* Show button only if more data exists */}
// // {hasMore && !Loading && (
// //   <div className="flex justify-center mt-6">
// //     <button
// //       type="button"
// //       onClick={handleSeeMore}
// //       disabled={Loading}
// //       className="px-6 py-2 rounded-lg shadow-md bg-blue-500 text-white hover:bg-blue-600 transition"
// //     >
// //       Show More
// //     </button>
// //   </div>
// // )}


// //     </div>
// //   );
// // };

// // export default DestinationPage;


// "use client";
// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import GetFirstTwentyImage from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/Get/GetFirstTwentyImageThunck";
// import Loader from "@/Components/Loader";
// import Link from "next/link";

// const DestinationPage = () => {
//   const dispatch = useDispatch();
//   const { result, page, Loading, hasMore } = useSelector(
//     (state) => state.GetFirstTwentyImageSlice
//   );

//   useEffect(() => {
//     if (result.length === 0) {
//       dispatch(GetFirstTwentyImage({ page: 1, limit: 20 }));
//     }
//   }, []);

//   const handleSeeMore = () => {
//     if (!Loading && hasMore) {
//       dispatch(GetFirstTwentyImage({ page: page + 1, limit: 20 }));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       {/* Hero Header Section */}
//       <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
//         <div className="absolute inset-0 bg-black/20"></div>
        
//         {/* Animated Background Elements */}
//         <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 animate-pulse delay-1000"></div>
        
//         <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
//             Discover Amazing 
//             <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
//               Destinations
//             </span>
//           </h1>
//           <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8 animate-fade-in-delay">
//             Explore breathtaking locations, create unforgettable memories, and embark on the journey of a lifetime
//           </p>
          
//           {/* Search Bar */}
//           <div className="max-w-xl mx-auto relative animate-fade-in-delay-2">
//             <input
//               type="text"
//               placeholder="Search destinations..."
//               className="w-full px-6 py-4 rounded-full bg-white/90 backdrop-blur-sm border-0 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30 text-gray-700 placeholder-gray-500"
//             />
//             <button className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-all duration-300 hover:scale-110">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Bar */}
//       <div className="bg-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-6 py-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             <div className="text-center">
//               <div className="text-2xl font-bold text-blue-600">{result.length}+</div>
//               <div className="text-gray-600">Destinations</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-green-600">50k+</div>
//               <div className="text-gray-600">Happy Travelers</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-purple-600">4.9★</div>
//               <div className="text-gray-600">Average Rating</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-orange-600">24/7</div>
//               <div className="text-gray-600">Support</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filter Section */}
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//           <div className="flex flex-wrap gap-4 items-center justify-between">
//             <h2 className="text-2xl font-bold text-gray-800">
//               Popular Destinations
//               <span className="text-lg text-gray-500 font-normal ml-2">({result.length} found)</span>
//             </h2>
            
//             <div className="flex gap-3">
//               <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option>Sort by Price</option>
//                 <option>Price: Low to High</option>
//                 <option>Price: High to Low</option>
//               </select>
//               <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
//                 </svg>
//                 Filters
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* No Results State */}
//         {result.length === 0 && !Loading && (
//           <div className="text-center py-16">
//             <div className="text-6xl text-gray-300 mb-4">🏝️</div>
//             <h3 className="text-2xl font-bold text-gray-600 mb-2">No destinations found</h3>
//             <p className="text-gray-500 mb-6">We couldn't find any destinations matching your criteria</p>
//             <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//               Browse All Destinations
//             </button>
//           </div>
//         )}

//         {/* Destinations Grid */}
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {result.map((tour, i) => (
//             <div
//               key={`${tour._id || i}`}
//               className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
//             >
//               {/* Image Section */}
//               <div className="relative w-full aspect-[4/3] overflow-hidden">
//                 <img
//                   src={tour.Image}
//                   alt={tour.Title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
                
//                 {/* Overlay Gradient */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
//                 {/* Favorite Button */}
//                 <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110">
//                   <svg className="w-5 h-5 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                   </svg>
//                 </button>

//                 {/* Price Badge */}
//                 <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
//                   <span className="text-lg font-bold text-blue-600">${tour.BasePrice || "N/A"}</span>
//                 </div>

//                 {/* Quick View on Hover */}
//                 <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
//                   <Link
//                     href={`Destination/${tour._id}`}
//                     className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>

//               {/* Card Content */}
//               <div className="p-6">
//                 <div className="flex items-start justify-between mb-3">
//                   <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
//                     {tour.Title || "Amazing Destination"}
//                   </h3>
//                 </div>

//                 {/* Rating */}
//                 <div className="flex items-center gap-2 mb-3">
//                   <div className="flex text-yellow-400">
//                     {[...Array(5)].map((_, i) => (
//                       <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                     ))}
//                   </div>
//                   <span className="text-gray-600 text-sm">4.8 (128 reviews)</span>
//                 </div>

//                 {/* Features */}
//                 <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
//                   <div className="flex items-center gap-1">
//                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//                     </svg>
//                     <span>Adventure</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//                     </svg>
//                     <span>3-5 days</span>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-3">
//                   <Link
//                     href={`Destination/${tour._id}`}
//                     className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
//                   >
//                     Book Now
//                   </Link>
//                   <Link
//                     href={`Destination/${tour._id}`}
//                     className="px-4 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-300 flex items-center justify-center"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Loading State */}
//         {Loading && (
//           <div className="flex justify-center items-center py-16">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-xl text-gray-600 animate-pulse">Discovering more amazing places...</p>
//             </div>
//           </div>
//         )}

//         {/* Load More Button */}
//         {hasMore && !Loading && (
//           <div className="flex justify-center mt-12">
//             <button
//               type="button"
//               onClick={handleSeeMore}
//               disabled={Loading}
//               className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
//             >
//               <span className="flex items-center gap-3">
//                 <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//                 </svg>
//                 Discover More Destinations
//                 <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//                 </svg>
//               </span>
//             </button>
//           </div>
//         )}

//         {/* End of Results Message */}
//         {!hasMore && !Loading && result.length > 0 && (
//           <div className="text-center py-12">
//             <div className="text-4xl text-gray-300 mb-4">🎉</div>
//             <h3 className="text-xl font-semibold text-gray-600 mb-2">You've seen all destinations!</h3>
//             <p className="text-gray-500">Check back later for new exciting places to explore</p>
//           </div>
//         )}
//       </div>

//       {/* Newsletter Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-purple-600 mt-16">
//         <div className="max-w-4xl mx-auto px-6 py-16 text-center">
//           <h2 className="text-3xl font-bold text-white mb-4">
//             Never Miss a New Adventure
//           </h2>
//           <p className="text-blue-100 mb-8 text-lg">
//             Subscribe to get notified about new destinations and exclusive travel deals
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-1 px-6 py-4 rounded-full border-0 focus:outline-none focus:ring-4 focus:ring-white/30"
//             />
//             <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105">
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DestinationPage;


"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GetFirstTwentyImage from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/Get/GetFirstTwentyImageThunck";
import Link from "next/link";

const DestinationPage = () => {
  const dispatch = useDispatch();
  const { result, page, Loading, hasMore } = useSelector(
    (state) => state.GetFirstTwentyImageSlice
  );

  useEffect(() => {
    if (result.length === 0) {
      dispatch(GetFirstTwentyImage({ page: 1, limit: 20 }));
    }
  }, []);

  const handleSeeMore = () => {
    if (!Loading && hasMore) {
      dispatch(GetFirstTwentyImage({ page: page + 1, limit: 20 }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background Elements */}
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
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
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
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {result.map((tour, i) => (
            <div
              key={`${tour._id || i}`}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Image Section */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img
                  src={tour.Image}
                  alt={tour.Title}
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
                <div className="flex items-center gap-2 mb-3">
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
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
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
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`Destination/${tour._id}`}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                  >
                    Book Now
                  </Link>
                  <Link
                    href={`Destination/${tour._id}`}
                    className="px-4 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-300 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </Link>
                </div>
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
        {!hasMore && !Loading && result.length > 0 && (
          <div className="text-center py-12">
            <div className="text-4xl text-gray-300 mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">You've seen all destinations!</h3>
            <p className="text-gray-500">Check back later for new exciting places to explore</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationPage;