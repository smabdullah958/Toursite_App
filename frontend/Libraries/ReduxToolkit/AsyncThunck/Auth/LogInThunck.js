"use client"
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let URL=process.env.NEXT_PUBLIC_BackendURL
import { DisplayLogOut } from "@/Libraries/ReduxToolkit/Slices/Auth/CheckLogInSlice";
let LogInThunck=createAsyncThunk(
    "loginthunck",
    async(Form,{dispatch,rejectWithValue})=>{
        try{
            let response=await axios.post(`${URL}/AuthController/LogInAuth`,Form,
                {withCredentials:true})
            console.log(response.data)
                //  dispatch(DisplayLogOut())
            return response?.data
        }
        catch(error){
            console.log("internal erorr bro ",error)
            return rejectWithValue(error.response?.data?.message||"error")
        }
    }
)
export default LogInThunck