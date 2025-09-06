import  { createSlice } from "@reduxjs/toolkit";
import PostImageThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/PostImageThunck";

let initialState={
    success:false,
    Loading:false,
    error:""
}

let PostImageSlice=createSlice({
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
        .addCase(PostImageThunck.pending,(state)=>{
            state.success=false
            state.Loading=true
            state.error=""
        })
        .addCase(PostImageThunck.fulfilled,(state)=>{
            state.success=true
            state.Loading=false
            state.error=""
        })
        .addCase(PostImageThunck.rejected,(state)=>{
            state.success=false
            state.Loading=false
            state.error=[]
        })
    }
})

export let {resetDestinationState}=PostImageSlice.actions
export default PostImageSlice.reducer