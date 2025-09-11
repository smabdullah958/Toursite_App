import { createSlice } from "@reduxjs/toolkit";
import DeleteThunck from '@/Libraries/ReduxToolkit/AsyncThunck/Packages/DeleteThunck'

let initialState={
    loading:false,
    success:false,
    error:false
}

let DeleteSlice=createSlice({
    name:"delete",
    initialState,
    reducers:{
        resetState:(state)=>{
            state.success=false
            state.error=false
            state.loading=false
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(DeleteThunck.pending,(state)=>{
            state.success=false
            state.error=false
            state.loading=true
        })
        .addCase(DeleteThunck.rejected,(state)=>{
            state.success=false
            state.error=true
            state.loading=false
        })
        .addCase(DeleteThunck.fulfilled,(state)=>{
            state.success=true
            state.error=false
            state.loading=false
        })
    }
})

export let  {resetState} = DeleteSlice.actions
export default DeleteSlice.reducer