"use client"
const { createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";
let URL=process.env.NEXT_PUBLIC_BackendURL

//check the user is login or not on a reload or a refetch
let CheckLogIn=createAsyncThunk(
    "async thunck",
    async(_,{rejectWithValue})=>{
        try{
            let response=await axios.get(`${URL}/AuthController/checkLogIn`,{withCredentials:true})
            console.log(response.data)
        return response.data
        }
        catch(error){
            console.log("internal error brother",error)
           return rejectWithValue(error.response?.data?.message || { CheckLogin: false });

        }
    }
)
export default CheckLogIn