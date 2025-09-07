import { createSlice } from "@reduxjs/toolkit";
import GetById from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/Get/GetDestinationByID"

let initialState={
    Loading:false,
    success:false,
    error:[],
    result:[]
}

let GetByIDSlice=createSlice({
    name:"any",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(GetById.pending,(state)=>{
            state.success=false
            state.Loading=true
            state.error=[]
            state.result=[]
        })
        .addCase(GetById.rejected,(state,action)=>{
            state.success=false
            state.Loading=false
            state.error=action.payload
            state.result=[]
        })
        .addCase(GetById.fulfilled,(state,action)=>{
            state.success=true
            state.Loading=false
            state.error=[]
            state.result=action.payload
        })
    }
})

export default GetByIDSlice.reducer