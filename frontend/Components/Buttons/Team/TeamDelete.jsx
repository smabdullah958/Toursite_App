 "use client"
 import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import DeleteTeamThunck from '@/Libraries/ReduxToolkit/AsyncThunck/Team/DeleteTeam'
 import GetTeamThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Team/GetTeam";
import Loader from '@/Components/Loader';
 import {resetState} from "@/Libraries/ReduxToolkit/Slices/Team/DeleteTeam" //reset state of a delete slice

 const DeleteButton = ({id}) => {
    
    let dispatch=useDispatch()
    
    let {success,Loading}=useSelector((state)=>state.DeleteTeamSlice)

const deletebutton = () => {
       dispatch(DeleteTeamThunck(id))
    }

    useEffect(()=>{
     if(success){
        dispatch(GetTeamThunck())
        dispatch(resetState()) //reset delete
    }
    },[success])

    return (
     <div>
       <button onClick={deletebutton} disabled={Loading}    className={`px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-red-400 hover:scale-105 active:scale-95 ${Loading?"bg-red-400 ":"hover:bg-red-700 hover:shadow-lg transition-all duration-300 ease-in-out"}`}>{Loading?<Loader/>:"Delete"}</button>
     </div>
   )
 }

 export default DeleteButton


