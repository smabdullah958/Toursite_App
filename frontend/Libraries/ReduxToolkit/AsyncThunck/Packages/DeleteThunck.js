import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let DeleteThunck=createAsyncThunk(
    "deleteButton",
    async(id,{rejectWithValue})=>{
        try{
            let response=await axios.delete(`${process.env.NEXT_PUBLIC_BackendURL}/Packages/DeletePackage/${id}`)
            console.log("package is delete",response)
            return response.data
        }
        catch(error){
            console.log("internal error",error)
            return rejectWithValue(error.response?.data?.message||"internal error")
        }
    }
)

export default DeleteThunck