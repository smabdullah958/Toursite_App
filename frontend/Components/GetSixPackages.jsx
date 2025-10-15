"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GetSixPackagesThunck from '@/Libraries/ReduxToolkit/AsyncThunck/Packages/GetPackages/GetSixPackagesThunck'
import Image from 'next/image'
import Link from 'next/link'

const GetSixPackages = () => {
  const dispatch = useDispatch()
  const { result, loading, error } = useSelector((state) => state.GetSixPackagesSlice)

  useEffect(() => {
    dispatch(GetSixPackagesThunck())
  }, [dispatch])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-amber-600 border-r-2  mx-auto mb-4"></div>
          <p className="text-amber-800 font-semibold text-sm sm:text-base">Loading premium packages...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-50 px-4">
        <div className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-xl max-w-md w-full border border-amber-200">
          <div className="text-amber-600 text-4xl sm:text-5xl mb-4">⚠️</div>
          <h2 className="text-lg sm:text-xl font-bold text-amber-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-amber-700 text-sm sm:text-base">{error}</p>
          <button 
            onClick={() => dispatch(GetSixPackagesThunck())} 
            className="mt-4 px-4 py-2 sm:px-6 sm:py-3 bg-amber-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-amber-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-50  px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen mx-auto">
        {/* Header */}
        <div className="text-center mb-12 ">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Premium Packages
          </h1>
          <p className="text-lg text-amber-800 max-w-2xl mx-auto mb-6">
            Carefully curated travel experiences designed for unforgettable journeys
          </p>
          <div className="w-20 h-1 bg-amber-600 mx-auto rounded-full"></div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {result && result.length > 0 ? (
            result.map((packageItem, i) => (
              <div 
                key={i} 
                className="group relative  transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100">
                  
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    {packageItem.Image?.length > 1 && (
                      // Two Images Side by Side
                      <div className="flex w-full h-full">
                        <div className="relative w-1/2 h-full overflow-hidden">
                          <Image
                            src={packageItem.Image[0] || "/default.jpg"}
                            alt={packageItem.Title || `Package ${i + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, 16vw"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNP6F3jYwAAAABJRU5ErkJggg=="
                          />
                        </div>
                        <div className="relative w-1/2 h-full overflow-hidden border-l border-white/20">
                          <Image
                            src={packageItem.Image[1] || "/default.jpg"}
                            alt={packageItem.Title || `Package ${i + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, 16vw"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNP6F3jYwAAAABJRU5ErkJggg=="
                          />
                        </div>
                      </div>
                      )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
               AED    {packageItem.BookingOption?.[0]?.BasePrice}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
             <h3 className="text-lg font-bold text-amber-900 mb-4 group-hover:text-amber-700 transition-colors duration-300 overflow-auto h-14">
                      {packageItem?.Title || `Premium Package ${i + 1}`}
                    </h3>
                    
                    <Link 
                      href={`Packages/${packageItem._id}`} 
                      className="block w-full bg-[#B8860B] hover:bg-[#CD853F] text-white py-3 px-6 rounded-lg font-semibold text-sm text-center transition-all duration-300 hover:scale-105 shadow-md"
                    >
                      View Package
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white/50 rounded-xl border border-amber-200">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">No packages available</h3>
              <p className="text-amber-700">New travel packages are being prepared!</p>
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
              href="/Packages" 
              className="group relative inline-block px-8 py-3 bg-gradient-to-r from-amber-700 to-yellow-700 text-white rounded-xl font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/30 overflow-hidden"
            >
              <span className="relative z-10 font-serif tracking-wider">VIEW ALL PACKAGES</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-800 to-yellow-800 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetSixPackages