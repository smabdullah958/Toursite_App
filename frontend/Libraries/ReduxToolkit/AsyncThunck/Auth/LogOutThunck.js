"use client"
const { createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";
import { DisplayLogIn } from "@/Libraries/ReduxToolkit/Slices/Auth/CheckLogInSlice";
import {resetLoginState } from "@/Libraries/ReduxToolkit/Slices/Auth/LogInSlice";

let URL=process.env.NEXT_PUBLIC_BackendURL
 let LogOutThunck=createAsyncThunk(
    "thunck",
    async(_,{dispatch,rejectWithValue})=>{
        try{
        let response=await axios.post(`${URL}/AuthController/LogOutAuth`,{},{withCredentials: true });
        console.log("logout successfully")
     
              dispatch(DisplayLogIn()); // 👈 sets IsLogIn = false and also it shwo the login button
    //   dispatch(HideLogIn());    // 👈 resets ShowLogIn = false (form closed safely)
            // dispatch(resetLoginState()) //resets login slice flags 
     
        return response.data
    }
    catch(error){
        console.log("internal error bro",error)
        return rejectWithValue(error.response?.data?.message)
    }
}
)
export default LogOutThunck