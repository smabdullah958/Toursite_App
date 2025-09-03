"use client"
import PostFormThunck from "@/Libraries/ReduxToolkit/AsyncThunck/SignUpThunck";
import { createSlice } from "@reduxjs/toolkit";

let initialState={
    Loading:false,
    error:[],
    success:false,
    errorMessage:"",
    Role:""
}

let PostFormSlice=createSlice({
    name:"slice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(PostFormThunck.pending,(state)=>{
            state.Loading=true
            state.error=null
            state.success=false
            state.errorMessage=null
        })
        .addCase(PostFormThunck.fulfilled,(state,action)=>{
              state.Loading=false
            state.error=null
            state.success=true
            state.errorMessage=null
            state.Role=action.payload.Role //here in a payload the role is come form a backend
        })
        .addCase(PostFormThunck.rejected,(state,action)=>{
              state.Loading=false
            state.error=action.payload
            state.success=false
            state.errorMessage=action.payload
        })
    }
})
export default PostFormSlice.reducer