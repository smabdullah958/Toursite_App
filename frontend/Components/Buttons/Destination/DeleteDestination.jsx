//  "use client"
//  import React, { useState } from 'react'
// import { useDispatch} from 'react-redux'
// import DeleteThunck from '@/Libraries/ReduxToolkit/AsyncThunck/Destination/DeleteThunck'
//  import GetFirstTwentyImage from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/Get/GetFirstTwentyImageThunck";
// import Loader from '@/Components/Loader';
//  import {resetState} from "@/Libraries/ReduxToolkit/Slices/Destination/DeleteSlice" //reset state of a delete slice
//  import {resetDestination} from "@/Libraries/ReduxToolkit/Slices/Destination/get/GetFirstTwentyImage" //for reset the state of a fetch so that it can refech again
//  const DeleteButton = ({id}) => {
//     const [localLoading, setLocalLoading] = useState(false); // Local state for loading
 
//     let dispatch=useDispatch()
    

// const deletebutton = async () => {
//     setLocalLoading(true); // Start loading for this button only
// try { //here we use unwrap because here for dispatch we dont use try ,catch so for using it we use unwrap
// //here bro 
//       await dispatch(DeleteThunck(id)).unwrap(); // Wait for delete to succeed
    
//       dispatch(resetDestination()); // Clear existing destination list
//       dispatch(GetFirstTwentyImage({ page: 1, limit: 20 })); // Re-fetch page 1
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

//  export default DeleteButton





"use client"
import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import DeleteThunck from '@/Libraries/ReduxToolkit/AsyncThunck/Destination/DeleteThunck'
import GetFirstTwentyImage from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/Get/GetFirstTwentyImageThunck";
import Loader from '@/Components/Loader';
import {resetState} from "@/Libraries/ReduxToolkit/Slices/Destination/DeleteSlice" //reset state of a delete slice
import {resetDestination} from "@/Libraries/ReduxToolkit/Slices/Destination/get/GetFirstTwentyImage" //for reset the state of a fetch so that it can refech again
const DeleteButton = ({id}) => {
    const [localLoading, setLocalLoading] = useState(false); // Local state for loading
 
    let dispatch=useDispatch()
    

const deletebutton = async () => {
    setLocalLoading(true); // Start loading for this button only
try { //here we use unwrap because here for dispatch we dont use try ,catch so for using it we use unwrap
//here bro 
      await dispatch(DeleteThunck(id)).unwrap(); // Wait for delete to succeed
    
      dispatch(resetDestination()); // Clear existing destination list
      dispatch(GetFirstTwentyImage({ page: 1, limit: 20 })); // Re-fetch page 1
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
         className={`group relative px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300 transform ${localLoading ? "opacity-30 cursor-not-allowed" : "hover:from-amber-500 hover:to-yellow-500 hover:scale-105 hover:shadow-xl"}`}
       >
         {localLoading ? <Loader/> : "Delete"}
       </button>
     </div>
   )
 }

 export default DeleteButton