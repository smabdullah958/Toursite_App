import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let GetFirst12PackagesThuck= createAsyncThunk(
    "GetFirst12Packages",
    async({limit,page},{rejectWithValue})=>{ 
        try{
            console.log(limit,page)
            let response=await axios.get(`${process.env.NEXT_PUBLIC_BackendURL}/Packages/getpackages/?limit=${limit}&page=${page}`);
            return response.data.result
        }
        catch(error){
            console.log("internal server error in GetFirst12Packages",error);
            return rejectWithValue(error.response?.data?.message || "An error occurred" );
        }
    }
)
export default GetFirst12PackagesThuck;