import  { createSlice } from "@reduxjs/toolkit";
import PostAboutThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Team/PostTeam";

let initialState={
    success:false,
    Loading:false,
    error:""
}

let PostAboutSlice=createSlice({
    name:"postdestination",
    initialState,
    reducers:{
        resetDestinationState:(state)=>{
            state.success=false
            state.Loading=false
            state.error=""
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(PostAboutThunck.pending,(state)=>{
            state.success=false
            state.Loading=true
            state.error=""
        })
        .addCase(PostAboutThunck.fulfilled,(state)=>{
            state.success=true
            state.Loading=false
            state.error=""
        })
        .addCase(PostAboutThunck.rejected,(state)=>{
            state.success=false
            state.Loading=false
            state.error=[]
        })
    }
})

export let {resetDestinationState}=PostAboutSlice.actions
export default PostAboutSlice.reducer