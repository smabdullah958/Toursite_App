import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DisplayLogOut } from "@/Libraries/ReduxToolkit/Slices/Auth/CheckLogInSlice";
import CheckLogIn from "@/Libraries/ReduxToolkit/AsyncThunck/Auth/CheckLoginThunck"

 let ResetPasswordThunck=createAsyncThunk(
    "thunck",
    async({Password,token},{dispatch,rejectWithValue})=>{
        try{
    let response=await axios.post(`${process.env.NEXT_PUBLIC_BackendURL}/AuthController/reset-password/${token}`,
        {Password},{withCredentials:true})
        console.log(response)
              dispatch(DisplayLogOut())
            //  await  dispatch(CheckLogIn()).unwrap()
            

        return response?.data
        
            }
            catch(error){
                console.log("internal error")
                return rejectWithValue(error.response?.data?.message||"error")
            }
    }
)
export default ResetPasswordThunck