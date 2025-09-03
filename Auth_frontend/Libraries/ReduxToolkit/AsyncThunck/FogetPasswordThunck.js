
const { createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";


let ForgetPasswordThunck=createAsyncThunk(
    "thunck",
    async(Form,{rejectWithValue})=>{
        try{
            let response=await axios.post(`${process.env.NEXT_PUBLIC_BackendURL}/AuthController/ForgetPassword`,Form,
                {withCredentials:true })
            console.log(response.data)
            
            return response.data
        }
        catch(error){
            console.log("internal error bro ")
            return rejectWithValue(error.response?.data?.message||"error")
        }
    }
)
export default ForgetPasswordThunck