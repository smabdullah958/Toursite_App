
// "use client"
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import GetSixImage from '@/Libraries/ReduxToolkit/AsyncThunck/Destination/Get/GetSixImages'
// import Image from 'next/image'
// import Link from 'next/link'

// const GetFiveDestination = () => {
//   const dispatch = useDispatch()
//   const { result, loading, error } = useSelector((state) => state.GetSixImageSlice)

//   useEffect(() => {
//     dispatch(GetSixImage())
//   }, [dispatch])

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-indigo-600 mx-auto mb-4"></div>
//           <p className="text-indigo-600 font-semibold text-sm sm:text-base">Loading amazing destinations...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 px-4">
//         <div className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-xl max-w-md w-full border border-red-100">
//           <div className="text-red-500 text-4xl sm:text-5xl mb-4 animate-pulse">⚠️</div>
//           <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
//           <p className="text-gray-600 text-sm sm:text-base">{error}</p>
//           <button 
//             onClick={() => dispatch(GetSixImage())} 
//             className="mt-4 px-4 py-2 sm:px-6 sm:py-3 bg-red-500 text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-red-600 transition-colors duration-300"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className=" p-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-6 px-3 sm:py-10 sm:px-6 lg:px-8">
//       <div className="max-w-screen mx-auto ">
//         {/* Header */}
//         <div className="text-center mb-6 sm:mb-10">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 sm:mb-3 animate-fade-in">
//             Top Destinations
//           </h1>
//           <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
//             Discover breathtaking places that will make your travel dreams come true
//           </p>
//           <div className="w-12 sm:w-16 md:w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-3 sm:mt-4 rounded-full"></div>
//         </div>

//         {/* Simple Grid - All 6 Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 ">
//           {result && result.length > 0 ? (
//             result.map((tour, i) => (
//               <div 
//                 key={i} 
//                 className="animate-slide-in"
//               >
//                 <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
//                   {/* Image */}
//                   <div 
//                   // className="relative h-40 sm:h-48 md:h-56 overflow-hidden rounded-t-xl bg-gray-200"
//                   className="relative w-full aspect-[4/3] overflow-hidden">
//                     {tour.Image ? (
//                       <Image
//                         src={tour.Image}
//                         alt={tour.title || tour.name || `Destination ${i + 1}`}
//                         fill
//                         className="object-cover group-hover:scale-105 transition-transform duration-500"
//                         sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
//                         loading="lazy"
//                         placeholder="blur"
//                         blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNP6F3jYwAAAABJRU5ErkJggg=="
//                       />
//                     ) : (
//                       <div className="flex items-center justify-center h-full bg-gray-300 text-gray-500 text-xs sm:text-sm">
//                         No Image Available
//                       </div>
//                     )}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                     <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-semibold shadow-sm">
//                       Rs {tour.BasePrice}
//                     </div>
//                   </div>
//                   {/* Content */}
//                   <div className="p-3 sm:p-4 md:p-5">
//                     <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-1 sm:mb-2 group-hover:text-indigo-600 transition-colors duration-300 truncate">
//                       {tour?.Title || `Amazing Destination ${i + 1}` }
//                     </h3>
//                     <Link  href={`Destination/${tour._id}`} className="w-full mt-2 sm:mt-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-1.5 sm:py-2 rounded-xl font-semibold text-xs sm:text-sm hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md block text-center">
//                       Explore Now
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center py-10 sm:py-12">
//               <div className="text-3xl sm:text-4xl mb-3 animate-bounce">🏝️</div>
//               <h3 className="text-base sm:text-lg font-bold text-gray-700 mb-2">No destinations found</h3>
//               <p className="text-gray-500 text-xs sm:text-sm">Check back later for amazing travel destinations!</p>
//             </div>
//           )}
//         </div>

//         {/* Explore More Link */}
//         <div className="text-center mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-white/80 to-indigo-50/80 backdrop-blur-md rounded-xl border border-indigo-100 shadow-md">
//           <Link 
//             href="/Destination" 
//             className="inline-block px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-xs sm:text-sm hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md"
//           >
//             Explore More Destinations
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default GetFiveDestination




"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GetSixImage from '@/Libraries/ReduxToolkit/AsyncThunck/Destination/Get/GetSixImages'
import Image from 'next/image'
import Link from 'next/link'

const GetFiveDestination = () => {
  const dispatch = useDispatch()
  const { result, loading, error } = useSelector((state) => state.GetSixImageSlice)

  useEffect(() => {
    dispatch(GetSixImage())
  }, [dispatch])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-amber-600 border-r-2  mx-auto mb-4"></div>
          <p className="text-amber-800 font-semibold text-sm sm:text-base font-serif">Discovering amazing destinations...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-50 px-4">
        <div className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-xl max-w-md w-full border border-amber-200">
          <div className="text-amber-600 text-4xl sm:text-5xl mb-4">⚠️</div>
          <h2 className="text-lg sm:text-xl font-bold text-amber-900 mb-2 font-serif">Oops! Something went wrong</h2>
          <p className="text-amber-700 text-sm sm:text-base">{error}</p>
          <button 
            onClick={() => dispatch(GetSixImage())} 
            className="mt-4 px-4 py-2 sm:px-6 sm:py-3 bg-amber-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-amber-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 py-8 px-4 sm:py-16 sm:px-6 lg:px-8">
      {/* Decorative Pattern Background */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-r from-amber-600 to-yellow-600"></div>
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B45309' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="max-w-screen mx-auto relative z-10">
        {/* Header with Arabian Design Elements */}
        <div className="text-center mb-12 sm:mb-16">
          {/* Decorative Top Element */}
          <div className="flex justify-center mb-6">
            <svg width="120" height="30" viewBox="0 0 120 30" className="text-amber-600">
              <path d="M10 15 L20 5 L30 15 L40 5 L50 15 L60 5 L70 15 L80 5 L90 15 L100 5 L110 15" 
                    stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M15 20 L25 10 L35 20 L45 10 L55 20 L65 10 L75 20 L85 10 L95 20 L105 10" 
                    stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-amber-900 mb-4 font-serif tracking-wide">
            <span className="bg-gradient-to-r from-amber-800 via-yellow-700 to-amber-600 bg-clip-text text-transparent">
              Premium Destinations
            </span>
          </h1>
          
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-600"></div>
            <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
            <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
            <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-600"></div>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl text-amber-800 max-w-2xl mx-auto font-serif italic leading-relaxed">
            "Embark on extraordinary journeys to the world's most captivating destinations, 
            where luxury meets adventure in perfect harmony"
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {result && result.length > 0 ? (
            result.map((tour, i) => (
              <div 
                key={i} 
                className="group relative transform hover:-translate-y-2 transition-all duration-500"
              >
                {/* Card Container with Arabian Border Design */}
                <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-amber-100 ">
                  
                  
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    {tour.Image ? (
                      <Image
                        src={tour.Image}
                        alt={tour.title || tour.name || `Destination ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNP6F3jYwAAAABJRU5ErkJggg=="
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-amber-100 text-amber-600 text-sm font-serif">
                        <div className="text-center">
                          <div className="text-4xl mb-2">🏜️</div>
                          <p>Destination Image</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                      <span className="text-xs">Rs</span> {tour.BasePrice}
                    </div>
                    
                    {/* Premium Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-amber-800 px-2 py-1 rounded-full text-xs font-semibold border border-amber-200">
                      ✨ Premium
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-3 group-hover:text-amber-700 transition-colors duration-300 font-serif line-clamp-2 h-14 overflow-auto">
                      {tour?.Title || `Exotic Destination ${i + 1}`}
                    </h3>
                    
                    
                    
                    {/* Explore Button */}
                    <Link 
                      href={`Destination/${tour._id}`} 
                      className="group/btn relative block w-full bg-[#B8860B] hover:bg-[#CD853F] text-white py-3 px-6 rounded-xl font-semibold text-sm text-center overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/25"
                    >
                      <span className="relative z-10 font-serif tracking-wide">Explore Journey</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-yellow-700 transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                      
                      {/* Button Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover/btn:translate-x-[-200%] transition-transform duration-700"></div>
                    </Link>
                  </div>
                  
                  
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border border-amber-200">
              <div className="text-6xl mb-4 animate-bounce">🏜️</div>
              <h3 className="text-xl font-bold text-amber-900 mb-2 font-serif">No destinations discovered yet</h3>
              <p className="text-amber-700 font-serif italic">New exotic destinations are being curated for you!</p>
            </div>
          )}
        </div>

        {/* Explore More Section */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="relative bg-white/80 backdrop-blur-md rounded-2xl border border-amber-200 shadow-xl p-8 max-w-md mx-auto">
            {/* Decorative Corner Elements */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-400 rounded-tl-lg"></div>
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-400 rounded-tr-lg"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-400 rounded-bl-lg"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-400 rounded-br-lg"></div>
            
            <h3 className="text-xl font-bold text-amber-900 mb-4 font-serif">Discover More Wonders</h3>
            
            <Link 
              href="/Destination" 
              className="group relative inline-block px-8 py-3 bg-gradient-to-r from-amber-700 to-yellow-700 text-white rounded-xl font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/30 overflow-hidden"
            >
              <span className="relative z-10 font-serif tracking-wider">VIEW ALL DESTINATIONS</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-800 to-yellow-800 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetFiveDestination