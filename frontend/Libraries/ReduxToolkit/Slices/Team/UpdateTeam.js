import { createSlice } from "@reduxjs/toolkit";
import UpdateTeam from "@/Libraries/ReduxToolkit/AsyncThunck/Team/UpdateTeam"

let initialState = {
Loading:false,
success:false,
error:[],
FormId:null
};

let UpdateTeamSlice = createSlice({
name:"UpdateteamSlice",
initialState,
reducers:{
    DisplayUpdateForm:(state,action)=>{
        state.FormId=action.payload
    },
    HideUpdateForm:(state)=>{
        state.FormId=null
    },
    ResetUpdateState:(state)=>{
        state.Loading=false
        state.success=false
        state.error=[]
        state.FormId=null
    }
},
extraReducers:(builder)=>{
    builder
        .addCase(UpdateTeam.fulfilled,(state)=>{
        state.Loading=false
        state.success=true
        state.error=[]
        })
        .addCase(UpdateTeam.rejected,(state,action)=>{
        state.Loading=false
        state.success=false
        state.error=action.payload
        })
        .addCase(UpdateTeam.pending,(state)=>{
        state.Loading=true
        state.success=false
        state.error=[]
        })
}
})

export const {DisplayUpdateForm,HideUpdateForm,ResetUpdateState} = UpdateTeamSlice.actions
export default UpdateTeamSlice.reducer