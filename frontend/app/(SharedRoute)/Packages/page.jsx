"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Link from "next/link";
import GetFirst12PackagesThuck from "@/Libraries/ReduxToolkit/AsyncThunck/Packages/GetPackages/GetFirst12PackagesThunck";
import DeletePackage from "@/Components/Buttons/Package/DeletePackage";
import UpdatePackages from "@/Components/Buttons/Package/UpdatePackagesButton";
import UpdatePackageForm from "@/Components/Form/PackageAndBookNowForm/UpdatePackageForm"
import SearchBar from "@/app/(SharedRoute)/Packages/SearchBar";

const PackagesPage = () => {
//hre the we get the formid from UpdatePackageSlice and also it is used to show a form
  const { FormID } = useSelector(state => state.UpdatePackageSlice);


  const dispatch = useDispatch();
  const { result, Loading, hasMore } = useSelector(
    (state) => state.GetFirst12PackagesSlice
  );

  // Get login state
  const { IsLogIn, Role } = useSelector((state) => state.CheckLogInSlice);

  const [currentPage, setCurrentPage] = useState(1);

  //it will shwo the result of a sraching
    let {SearchResult,loading,isSearched}=useSelector(state=>state.PackageSearchBarSlice)
  //is search is traack teh serch is done or not
    let displayResult = isSearched ? SearchResult : result;
  

  // Load first page on mount
  useEffect(() => {
    if (result.length === 0) {
      dispatch(GetFirst12PackagesThuck({ limit: 12, page: 1 }));
    }
  }, [dispatch, result.length]);

  // Load more packages
  const handleSeeMore = () => {
    if (!Loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      dispatch(GetFirst12PackagesThuck({ limit: 12, page: nextPage }));
    }
  };

    // Filter results according to role & slots
  // Admin → show all
  // Other users → show only slots > 0
  const filteredResult = displayResult.filter((tour) => {
    if (Role === "Admin") return true;
    return tour.Slots > 0;
  });


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="max-w-screen mx-auto px-6 py-8">
       
        
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-5 sm:mb-10">
          Explore Our Amazing Packages
        </h1>
          <SearchBar />
        
      </div>

      {/* Main Content */}
      <div className="max-w-screen mx-auto px-6 ">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Popular Packages
            <span className="text-lg text-gray-500 font-normal ml-2">
              ({filteredResult.length} loaded)
            </span>
          </h2>
        </div>

        {/* No Results */}
        { isSearched && filteredResult.length === 0 && !loading && !Loading && (
          <div className="text-center py-16">
            <div className="text-6xl text-gray-300 mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              No packages found
            </h3>
            <p className="text-gray-500">
              We couldn't find any packages at the moment
            </p>
          </div>
        )}

        {/* Packages Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {filteredResult?.map((pkg, index) => (
            <motion.div
              key={pkg._id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              {/* ✅ Image Section */}
              <div className="relative w-full aspect-[4/3] overflow-hidden flex">
                {pkg.Image?.length > 1 ? (
                  <>
                    {/* Left Image */}
                    <div className="relative w-1/2 h-full">
                      <Image
                        src={pkg.Image[0] || "/default.jpg"}
                        alt={pkg.Title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Right Image */}
                    <div className="relative w-1/2 h-full">
                      <Image
                        src={pkg.Image[1] || "/default.jpg"}
                        alt={pkg.Title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </>
                ) : (
                  // ✅ If only one image
                  <div className="relative w-full h-full">
                    <Image
                      src={pkg.Image?.[0] || "/default.jpg"}
                      alt={pkg.Title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Price Badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-lg font-bold text-blue-600">
                    Rs{pkg.BasePrice || "N/A"}
                  </span>
                </div>

                {/* Quick View on Hover */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <Link
                    href={`/Packages/${pkg._id}`}
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
                    {pkg.Title || "Amazing Package"}
                  </h3>
                </div>

                {/* Mobile View Button */}
                <Link
                  href={`/Packages/${pkg._id}`}
                  className="md:hidden block w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                >
                  View Details
                </Link>

                {/* Admin Buttons */}
                {IsLogIn && Role === "Admin" && (
                  <div className="flex gap-3 justify-between mt-3">
                    <DeletePackage id={pkg._id} />
                    <UpdatePackages id={pkg._id}/>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

             {/* //show update form if  */}
                {FormID && <UpdatePackageForm id={FormID} />}


        {/* Loading State */}
        {(Loading || loading) && (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600 animate-pulse">
                {result.length === 0
                  ? "Loading packages..."
                  : "Loading more packages..."}
              </p>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {  hasMore && !Loading && result.length > 0 && (
          <div className="flex justify-center mt-12">
            <button
              type="button"
              onClick={handleSeeMore}
              disabled={Loading}
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              See More Packages
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackagesPage;
