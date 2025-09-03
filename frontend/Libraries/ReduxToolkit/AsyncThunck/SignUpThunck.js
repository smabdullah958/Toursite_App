import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DisplayLogOut } from "@/Libraries/ReduxToolkit/Slices/CheckLogInSlice";
let URL=process.env.NEXT_PUBLIC_BackendURL
console.log(URL)
let PostFormThunck=createAsyncThunk(
    "postForm",
    async(UserData,{dispatch,rejectWithValue})=>{
        try{
            let response=await axios.post(`${URL}/AuthController/SignUpAuth`,UserData,
                {withCredentials:true })
            console.log(response.data)
            dispatch(DisplayLogOut())
            
            return response.data
        }
        catch(error){
            console.log("internal error bro ")
            return rejectWithValue(error.response?.data?.message||"error")
        }
    }
)
export default  PostFormThunck