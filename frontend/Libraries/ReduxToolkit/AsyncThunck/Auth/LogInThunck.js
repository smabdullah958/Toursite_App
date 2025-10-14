"use client"
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let URL=process.env.NEXT_PUBLIC_BackendURL
import CheckLogIn from "@/Libraries/ReduxToolkit/AsyncThunck/Auth/CheckLoginThunck"

let LogInThunck=createAsyncThunk(
    "loginthunck",
    async(Form,{dispatch,rejectWithValue})=>{
        try{
            let response=await axios.post(`${URL}/AuthController/LogInAuth`,Form,
                {withCredentials:true})
                        await dispatch(CheckLogIn()).unwrap()
                
            return response?.data
        }
        catch(error){
            console.log("internal erorr bro ",error)
            return rejectWithValue(error.response?.data?.message||"error")
        }
    }
)
export default LogInThunck