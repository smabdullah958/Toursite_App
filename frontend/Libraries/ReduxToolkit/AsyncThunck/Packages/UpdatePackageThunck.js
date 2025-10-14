import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let UpdatePackageThunck=createAsyncThunk(
    "Updatethunk",
    async({id,data},{rejectWithValue})=>{
        try{
            let response=await axios.put(`${process.env.NEXT_PUBLIC_BackendURL}/Packages/UpdatePackage/${id}`,data,{
                header:{"Content-Type":"multipart/form-data"},
        withCredentials:true
            })
            return response.data
        }
        catch(error){
            console.log('internal error bro ',error)
            return rejectWithValue(error.response?.data?.message ||"internal error")
        }
    }
)
export default UpdatePackageThunck