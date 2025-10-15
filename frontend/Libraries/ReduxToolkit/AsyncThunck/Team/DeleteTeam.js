import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let DeleteTeamThunck=createAsyncThunk(
    "deleteTeamThunck",
async(id,{rejectWithValue})=>{
    try{
        let response=await axios.delete(`${process.env.NEXT_PUBLIC_BackendURL}/About/DeleteTeam/${id}`)
        return response.data
    }
    catch(error){
        return rejectWithValue(error.response.data?.message)
    }
})

export default DeleteTeamThunck