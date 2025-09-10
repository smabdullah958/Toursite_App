import { createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

let GetByIDThunck=createAsyncThunk(
    "GetByIDThunck",
    async(id,{rejectWithValue})=>{
        try{
            let response=await axios.get(`${process.env.NEXT_PUBLIC_BackendURL}/Packages/getbyid/${id}`)
            console.log(response)
            return response.data.result
        }
        catch(error){
                console.log("internal error",error)
           return rejectWithValue(error.response?.data?.message || "An error occurred" )   
        }
    }
)

export default GetByIDThunck