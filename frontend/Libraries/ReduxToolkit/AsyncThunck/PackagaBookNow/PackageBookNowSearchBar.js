import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let PackageBookNowSearchBarThunck = createAsyncThunk(
    "PackageSearchBarThunck",
    async ({SearchByAnyThing,SearchByDate},{rejectWithValue}) => {
        try{
            let response=await axios.get(`${process.env.NEXT_PUBLIC_BackendURL}/PackageBooking/SearchBar`,{
                params:{SearchByAnyThing,SearchByDate},
                withCredentials:true
            })
            return response.data
        }
          catch(error){
            console.log(error)
            return rejectWithValue(error.response?.data?.message ||"internal error")
          }
    }
)
export default PackageBookNowSearchBarThunck