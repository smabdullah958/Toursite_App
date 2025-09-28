"use client"
import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import SearchBarThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/SearchBarThunck";
import {resetSearch} from "@/Libraries/ReduxToolkit/Slices/Destination/SearchBarSlice"

import GetFirstTwentyImage from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/Get/GetFirstTwentyImageThunck";

const SearchBar = () => {
let dispatch=useDispatch()
    let [searchTerm, setSearchTerm] = useState({
    SearchByAnyThing: "",
    SortByCategory: "",
  });

  let HandleFields = (e) => {
    setSearchTerm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  let HandleButton = () => {

//if click and search bar is null than show only twenty booking
        if(searchTerm.SearchByAnyThing==="" && searchTerm.SortByCategory===""){
        dispatch(GetFirstTwentyImage({page:1,limit:20}))
return 
      }    

    
    if(searchTerm.SearchByAnyThing===""&&searchTerm.SortByCategory===""){
      dispatch(GetFirstTwentyImage({limit:20,page:1}))
    }

    dispatch(SearchBarThunck({
        SearchByAnyThing: searchTerm.SearchByAnyThing,
        SortByCategory: searchTerm.SortByCategory
    }))
    console.log(searchTerm)
  };

useEffect(()=>{
    if(searchTerm.SearchByAnyThing==="" && searchTerm.SortByCategory===""){
        dispatch(resetSearch())

    }    
},[dispatch,searchTerm])

  return (
    <div className="xl:flex xl:justify-center ">
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
        <select
          name="SortByCategory"
          onChange={HandleFields}
          value={searchTerm.SortByCategory}
          className="border border-gray-300 rounded-lg p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-400 outline-none sm:w-[40vw] xl:w-[25vw] hover:border-gray-500" >
          <option value="">📂 Sorting</option>
          <option value="a">🔠 A-Z</option>
          <option value="0">🔢 0-9</option>
          <option value="time">⏰ Time</option>
        </select>

        {/* Button */}
        <button
          onClick={HandleButton}
          className=" sm:w-40 bg-gradient-to-r from-amber-700 to-yellow-700  hover:from-amber-600 hover:to-yellow-600 text-white rounded-lg p-3 text-sm transition">
          🚀 Go
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
