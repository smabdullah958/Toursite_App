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
    <div className=" bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 py-8 px-4 sm:py-16 sm:px-6 lg:px-8">
      {/* Decorative Pattern Background */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-r from-amber-600 to-yellow-600"></div>
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B45309' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="max-w-screen mx-auto relative z-10">
        {/* Header with Arabian Design Elements */}
        <div className="text-center mb-12 sm:mb-16">

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-amber-900 mb-4 font-serif tracking-wide">
            <span className="bg-gradient-to-r from-amber-800 via-yellow-700 to-amber-600 bg-clip-text text-transparent">
              Premium Destinations
            </span>
          </h1>
          
          
          <p className="text-base sm:text-lg md:text-xl text-amber-800 max-w-2xl mx-auto font-serif italic leading-relaxed">
            "Embark on extraordinary journeys to the world's most captivating destinations, 
            where luxury meets adventure in perfect harmony"
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {result && result.length > 0 ?(
            result.map((tour, i) => (
              <div 
                key={i} 
                className="group relative transform hover:-translate-y-2 transition-all duration-500"
              >
                {/* Card Container with Arabian Border Design */}
                <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-amber-100 ">
                  
                  
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    {tour.Image &&(
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
                    )}
          
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
 <span className="text-xs">AED</span> {tour.BookingOption?.[0]?.BasePrice || tour.BasePrice}
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
          ) :(
            <div className="col-span-full text-center py-16 bg-white/50 rounded-xl border border-amber-200">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">No destination available</h3>
              <p className="text-amber-700">New travel packages are being prepared!</p>
            </div>)}
        </div>

        {/* Explore More Section */}
      {result && result.length > 0 && (
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
      )}
      </div>
    </div>
  )
}

export default GetFiveDestination