import { createSlice } from "@reduxjs/toolkit";
import DeleteThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/DeleteThunck";

let initialState={
    Loading:false,
    success:false,
    error:""
}

let DeleteSlice=createSlice({
    name:"DeleteSlice",
    initialState,
    reducers:{
        resetState(state) {
            state.Loading=false
            state.success=false
            state.error=""
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(DeleteThunck.fulfilled,(state)=>{
            state.Loading=false
            state.success=true
            state.error=""
        })
        .addCase(DeleteThunck.rejected,(state,action)=>{
            state.Loading=false
            state.success=false
            state.error=action.payload
        })
        .addCase(DeleteThunck.pending,(state)=>{
            state.Loading=true
            state.success=false
            state.error=""
        })
    }
})
export let {resetState}=DeleteSlice.actions
export default DeleteSlice.reducer