
const { createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";


let ForgetPasswordThunck=createAsyncThunk(
    "thunck",
    async(Form,{rejectWithValue})=>{
        try{
            let response=await axios.post(`${process.env.NEXT_PUBLIC_BackendURL}/AuthController/ForgetPassword`,Form,
                {withCredentials:true })
            
            return response.data
        }
        catch(error){
            return rejectWithValue(error.response?.data?.message||"error")
        }
    }
)
export default ForgetPasswordThunck