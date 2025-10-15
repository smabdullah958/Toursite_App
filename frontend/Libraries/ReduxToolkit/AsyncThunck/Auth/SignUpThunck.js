import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DisplayLogOut } from "@/Libraries/ReduxToolkit/Slices/Auth/CheckLogInSlice";
let URL=process.env.NEXT_PUBLIC_BackendURL
console.log(URL)
let PostFormThunck=createAsyncThunk(
    "postForm",
    async(UserData,{dispatch,rejectWithValue})=>{
        try{
            let response=await axios.post(`${URL}/AuthController/SignUpAuth`,UserData,
                {withCredentials:true })
            dispatch(DisplayLogOut())
            
            return response.data
        }
        catch(error){
            return rejectWithValue(error.response?.data?.message||"error")
        }
    }
)
export default  PostFormThunck