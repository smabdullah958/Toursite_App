import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let SearchBarThunck=createAsyncThunk(
    "searchbar",
    async({SearchByAnyThing,SearchBySorting},{rejectWithValue})=>{
 try{
            let response=await axios.get(`${process.env.NEXT_PUBLIC_BackendURL}/Packages/Searching`,{
                params:{SearchByAnyThing,SearchBySorting},
                withCredentials:true
            })
            return response.data
        }
          catch(error){
            console.log(error)
            return rejectWithValue(error.response?.data?.message ||"internal error")
          }
        })
    
        
        export default SearchBarThunck