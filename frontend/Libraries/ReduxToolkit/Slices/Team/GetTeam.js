import { createSlice } from "@reduxjs/toolkit";
import GetAboutThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Team/GetTeam"

let initialState={
    success:false,
    Loading:false,
    error:false,
    result:[],
    
}

let GetAboutSlice=createSlice({

    name:'getdestination',
    initialState,
    reducers:{
            resetgetstate: (state) => {
    state.success = false;
    state.Loading = false;
    state.error = false;
    state.result = [];
    }},
    extraReducers:(builder)=>{
        builder
        .addCase(GetAboutThunck.rejected,(state)=>{
            state.Loading=false
            state.error=[]
            state.result=[]
            state.success=false
        })
        .addCase(GetAboutThunck.fulfilled,(state,action)=>{
            state.Loading=false
            state.error=[]
            state.result=action.payload
            state.success=true
        
        })
        .addCase(GetAboutThunck.pending,(state)=>{
                state.Loading=true
            state.error=[]
            state.success=false
        })
    }
})
export const {resetgetstate} = GetAboutSlice.actions;

export default GetAboutSlice.reducer