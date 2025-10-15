import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DisplayLogOut } from "@/Libraries/ReduxToolkit/Slices/Auth/CheckLogInSlice";

 let ResetPasswordThunck=createAsyncThunk(
    "thunck",
    async({Password,token},{dispatch,rejectWithValue})=>{
        try{
    let response=await axios.post(`${process.env.NEXT_PUBLIC_BackendURL}/AuthController/reset-password/${token}`,
        {Password},{withCredentials:true})
              dispatch(DisplayLogOut())
            

        return response?.data
        
            }
            catch(error){
                return rejectWithValue(error.response?.data?.message||"error")
            }
    }
)
export default ResetPasswordThunck