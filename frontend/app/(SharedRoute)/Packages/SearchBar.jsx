"use client"
import React from 'react'
import { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetSearch } from '@/Libraries/ReduxToolkit/Slices/Packages/SearchBarSlice'
import SearchBarThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Packages/SearchBarThunck"

const SearchBar = () => {
    let dispatch=useDispatch()
    let [FormState,SetFormState]=useState({
        SearchByAnyThing:"",
        SearchBySorting:""
    })

    useEffect(()=>{
        if(FormState.SearchByAnyThing==="" && FormState.SearchBySorting===""){
            dispatch(resetSearch())
    
        }    
    },[dispatch,FormState])
    

    let HandleField=(e)=>{
        SetFormState((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    let HandleButton=()=>{
        dispatch(SearchBarThunck({
            SearchByAnyThing:FormState.SearchByAnyThing,
            SearchBySorting:FormState.SearchBySorting
    }))
console.log(FormState)
    }

  return (
    <div className="xl:flex xl:justify-center ">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Input */}
        <input
          type="text"
          placeholder="🔍 Search..."
          value={FormState.SearchByAnyThing}
          name="SearchByAnyThing"
          onChange={HandleField}
          className="flex-1 border border-gray-300 rounded-lg  text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-400 outline-none sm:w-[40vw] p-3 hover:border-gray-500"/>

        {/* Select */}
        <select
          name="SearchBySorting"
          onChange={HandleField}
          value={FormState.SearchBySorting}
          className="border border-gray-300 rounded-lg p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-400 outline-none sm:w-[40vw] xl:w-[25vw] hover:border-gray-500" >
          <option value="">📂 Sorting</option>
          <option value="a">🔠 A-Z</option>
          <option value="0">🔢 0-9</option>
          <option value="time">⏰ Time</option>
        </select>

        {/* Button */}
        <button
          onClick={HandleButton}
          className=" sm:w-40 bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-3 text-sm transition">
          🚀 Go
        </button>
      </div>
    </div>
  )
}

export default SearchBar
