import { createSlice } from "@reduxjs/toolkit";
import PostPackageThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Packages/PostPackageThunck";

let initialState={
    loading:false,
    error:[],
    success:false
}

let PostPackageSlice=createSlice({
    name:"PostPackageSlice",
    initialState,
    reducers:{
        clearState:(state)=>{
            state.loading=false;
            state.error=null;
            state.success=false;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(PostPackageThunck.pending,(state)=>{
            state.loading=true;
            state.error=null;
            state.success=false;
        })
        builder.addCase(PostPackageThunck.fulfilled,(state)=>{
            state.loading=false;
            state.error=null;
            state.success=true;
        })
        builder.addCase(PostPackageThunck.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            state.success=false;
        })
    }
})


export let {clearState}=PostPackageSlice.actions;
export default PostPackageSlice.reducer;