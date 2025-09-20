"use client"
import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import PackageBookNowSearchBarThunck from "@/Libraries/ReduxToolkit/AsyncThunck/PackagaBookNow/PackageBookNowSearchBar";
import {resetSearch} from "@/Libraries/ReduxToolkit/Slices/PackageBookNow/PackageBookNowSearch"
import GetFistTwentyPackagsBooking from "@/Libraries/ReduxToolkit/AsyncThunck/PackagaBookNow/GetFirstTwentyPackagesBooking";


const SearchBar = () => {
let dispatch=useDispatch()
    let [searchTerm, setSearchTerm] = useState({
    SearchByAnyThing: "",
    SearchByDate: "",
  });

  let HandleFields = (e) => {
    setSearchTerm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  let HandleButton = () => {
//if click and search bar is null than show only twenty booking
        if(searchTerm.SearchByAnyThing==="" && searchTerm.SearchByDate===""){
        dispatch(GetFistTwentyPackagsBooking({page:1,limit:20}))
return 
      }    


    dispatch(PackageBookNowSearchBarThunck({
        SearchByAnyThing: searchTerm.SearchByAnyThing,
        SearchByDate: searchTerm.SearchByDate
    }))
    console.log(searchTerm)
  };

useEffect(()=>{
    if(searchTerm.SearchByAnyThing==="" && searchTerm.SearchByDate===""){
        dispatch(resetSearch())
    }    
},[dispatch,searchTerm])

  return (
    <div className="xl:flex xl:justify-center mb-5 2xl:m-10">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Input */}
        <input
          type="text"
          placeholder="🔍 Search..."
          value={searchTerm.SearchByAnyThing}
          name="SearchByAnyThing"
          onChange={HandleFields}
          className="flex-1 border border-gray-300 rounded-lg  text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-400 outline-none sm:w-[40vw] p-3 hover:border-gray-500"/>

        {/* Select */}

        <input
          type="date"
          placeholder=" Search By Date"
          value={searchTerm.SearchByDate}
          name="SearchByDate"
          onChange={HandleFields}
          className="flex-1 border border-gray-300 rounded-lg  text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-400 outline-none sm:w-[40vw] p-3 hover:border-gray-500"/>

        {/* Button */}
        <button
          onClick={HandleButton}
className={`sm:w-40 rounded-lg p-3 text-sm transition bg-blue-500 hover:bg-blue-600 text-white"}`}>
          🚀 Go
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
