import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let SearchBarThunck = createAsyncThunk(
    "SearchBarThunck",
    async ({SearchByAnyThing,SortByCategory},{rejectWithValue}) => {
        try{
            let response=await axios.get(`${process.env.NEXT_PUBLIC_BackendURL}/Destination/search`,{
                params:{SearchByAnyThing,SortByCategory},
                withCredentials:true
            })
            return response.data
        }
          catch(error){
            return rejectWithValue(error.response?.data?.message ||"internal error")
          }
    }
)
export default SearchBarThunck