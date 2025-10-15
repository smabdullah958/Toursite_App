import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let DeleteThunck=createAsyncThunk(
    "deleteThunck",
async(id,{rejectWithValue})=>{
    try{
        let response=await axios.delete(`${process.env.NEXT_PUBLIC_BackendURL}/Destination/delete/${id}`)
        return response.data
    }
    catch(error){
        return rejectWithValue(error.response.data?.message)
    }
})

export default DeleteThunck