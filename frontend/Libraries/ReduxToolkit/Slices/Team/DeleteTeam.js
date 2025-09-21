import { createSlice } from "@reduxjs/toolkit";
import DeleteTeamThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Team/DeleteTeam";

let initialState={
    Loading:false,
    success:false,
    error:""
}

let DeleteTeamSlice=createSlice({
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
        .addCase(DeleteTeamThunck.fulfilled,(state)=>{
            state.Loading=false
            state.success=true
            state.error=""
        })
        .addCase(DeleteTeamThunck.rejected,(state,action)=>{
            state.Loading=false
            state.success=false
            state.error=action.payload
        })
        .addCase(DeleteTeamThunck.pending,(state)=>{
            state.Loading=true
            state.success=false
            state.error=""
        })
    }
})
export let {resetState}=DeleteTeamSlice.actions
export default DeleteTeamSlice.reducer