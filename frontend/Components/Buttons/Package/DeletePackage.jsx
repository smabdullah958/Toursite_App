// // import React from 'react'

// // const DeletePackage = ({id}) => {

// //     let handleButton=()=>{
// //         console.log(id)
// //     }

// //   return (
// //     <div>      
// //       <button onClick={handleButton} className='flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl font-semibold transition-all duration-300'>delete</button>

// //     </div>
// //   )
// // }

// // export default DeletePackage


//  "use client"
//  import React, { useState } from 'react'
// import { useDispatch} from 'react-redux'
// import DeleteThunck from '@/Libraries/ReduxToolkit/AsyncThunck/Packages/DeleteThunck'
//  import GetFirst12PackagesThuck from "@/Libraries/ReduxToolkit/AsyncThunck/Packages/GetPackages/GetFirst12PackagesThunck";
// import Loader from '@/Components/Loader';
//  import {resetState} from "@/Libraries/ReduxToolkit/Slices/Packages/DeleteSlice" //reset state of a delete slice
//  import {resetProducts} from "@/Libraries/ReduxToolkit/Slices/Packages/GetPackages/GetFirst12PackagesSlice" 
//  //for reset the state of a fetch so that it can refech again
//  const DeletePackage = ({id}) => {
//     const [localLoading, setLocalLoading] = useState(false); // Local state for loading
 
//     let dispatch=useDispatch()
    

// const deletebutton = async () => {
//     setLocalLoading(true); // Start loading for this button only
// try { //here we use unwrap because here for dispatch we dont use try ,catch so for using it we use unwrap
// //here bro 
//       await dispatch(DeleteThunck(id)).unwrap(); // Wait for delete to succeed
    
//       dispatch(resetProducts()); // Clear existing package list
//       dispatch(GetFirst12PackagesThuck({ page: 1, limit: 12 })); // Re-fetch page 1
//       dispatch(resetState()); // Reset DeleteSlice state
//     } catch (error) {
//       console.error("Delete failed:", error);
//       // Optional: Show error to user (e.g., alert or toast)
//     } finally {
//       setLocalLoading(false); // Stop loading
//     }
//   };

//     return (
//      <div>
//        <button onClick={deletebutton} disabled={localLoading}    className={`px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-red-400 hover:scale-105 active:scale-95 ${localLoading?"bg-red-400 ":"hover:bg-red-700 hover:shadow-lg transition-all duration-300 ease-in-out"}`}>{localLoading?<Loader/>:"Delete"}</button>
//      </div>
//    )
//  }

//  export default DeletePackage





"use client"
import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import DeleteThunck from '@/Libraries/ReduxToolkit/AsyncThunck/Packages/DeleteThunck'
import GetFirst12PackagesThuck from "@/Libraries/ReduxToolkit/AsyncThunck/Packages/GetPackages/GetFirst12PackagesThunck";
import Loader from '@/Components/Loader';
import {resetState} from "@/Libraries/ReduxToolkit/Slices/Packages/DeleteSlice" //reset state of a delete slice
import {resetProducts} from "@/Libraries/ReduxToolkit/Slices/Packages/GetPackages/GetFirst12PackagesSlice" 
//for reset the state of a fetch so that it can refech again
const DeletePackage = ({id}) => {
    const [localLoading, setLocalLoading] = useState(false); // Local state for loading
 
    let dispatch=useDispatch()
    

const deletebutton = async () => {
    setLocalLoading(true); // Start loading for this button only
try { //here we use unwrap because here for dispatch we dont use try ,catch so for using it we use unwrap
//here bro 
      await dispatch(DeleteThunck(id)).unwrap(); // Wait for delete to succeed
    
      dispatch(resetProducts()); // Clear existing package list
      dispatch(GetFirst12PackagesThuck({ page: 1, limit: 12 })); // Re-fetch page 1
      dispatch(resetState()); // Reset DeleteSlice state
    } catch (error) {
      console.error("Delete failed:", error);
      // Optional: Show error to user (e.g., alert or toast)
    } finally {
      setLocalLoading(false); // Stop loading
    }
  };

    return (
     <div>
       <button 
         onClick={deletebutton} 
         disabled={localLoading}    
         className={`group relative px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300 transform ${localLoading ? "opacity-50 cursor-not-allowed" : "hover:from-amber-500 hover:to-yellow-500 hover:scale-105 hover:shadow-xl"} overflow-hidden`}
       >
         <span className="relative z-10">{localLoading ? <Loader/> : "Delete"}</span>
         <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%]"></span>
       </button>
     </div>
   )
 }

 export default DeletePackage