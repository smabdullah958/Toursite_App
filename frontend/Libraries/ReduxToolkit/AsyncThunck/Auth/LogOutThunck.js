"use client"
const { createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";
import CheckLogIn from "@/Libraries/ReduxToolkit/AsyncThunck/Auth/CheckLoginThunck"

let URL=process.env.NEXT_PUBLIC_BackendURL
 let LogOutThunck=createAsyncThunk(
    "thunck",
    async(_,{dispatch,rejectWithValue})=>{
        try{
        let response=await axios.post(`${URL}/AuthController/LogOutAuth`,{},{withCredentials: true });
        console.log("logout successfully")
     
        dispatch(CheckLogIn())
     
        return response.data
    }
    catch(error){
        console.log("internal error bro",error)
        return rejectWithValue(error.response?.data?.message)
    }
}
)
export default LogOutThunck