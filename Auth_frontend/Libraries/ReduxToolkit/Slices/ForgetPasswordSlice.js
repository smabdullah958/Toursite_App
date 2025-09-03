const { createSlice } = require("@reduxjs/toolkit");
import ForgetPasswordThunck from "@/Libraries/ReduxToolkit/AsyncThunck/FogetPasswordThunck";

let initialState={
    Loading:false,
    error:false,
    success:false,
    errorMessage:"",
    DisplayForgetPassword:false,
}

let ForgetPasswordSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        //this wil shwo the popup for a where we can add email 
         ShowForgetPassword:(state)=>{
            state.DisplayForgetPassword=true
        },
        //this is for a hide bro 
        HideForgetPassword:(state)=>{
            state.DisplayForgetPassword=false,
            state.errorMessage=""
            state.success=false
        },
    },
    extraReducers:(builder)=>{
        builder        
        .addCase(ForgetPasswordThunck.pending,(state)=>{
            state.Loading=true
            state.error=null
            state.success=false
            state.errorMessage=null
        })
        .addCase(ForgetPasswordThunck.fulfilled,(state,action)=>{
              state.Loading=false
            state.error=null
            state.success=true
            state.errorMessage=null 
        })
        .addCase(ForgetPasswordThunck.rejected,(state,action)=>{
              state.Loading=false
            state.error=action.payload
            state.success=false
            state.errorMessage=action.payload
        })
}})

export let {ShowForgetPassword,HideForgetPassword}=ForgetPasswordSlice.actions;

export default ForgetPasswordSlice.reducer