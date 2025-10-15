"use client"
const { createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";
import CheckLogIn from "@/Libraries/ReduxToolkit/AsyncThunck/Auth/CheckLoginThunck"
import { resetLoginState } from "@/Libraries/ReduxToolkit/Slices/Auth/LogInSlice";
let URL=process.env.NEXT_PUBLIC_BackendURL
 let LogOutThunck=createAsyncThunk(
    "thunck",
    async(_,{dispatch,rejectWithValue})=>{
        try{
        let response=await axios.post(`${URL}/AuthController/LogOutAuth`,{},{withCredentials: true });
     
        await dispatch(CheckLogIn()).unwrap()
    
        dispatch(resetLoginState()); 

        return response.data
    }
    catch(error){
        return rejectWithValue(error.response?.data?.message)
    }
}
)
export default LogOutThunck