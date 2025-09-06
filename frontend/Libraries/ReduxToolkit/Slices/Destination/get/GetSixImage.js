import { createSlice } from "@reduxjs/toolkit";
import GetFiveImage from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/Get/GetSixImages";

let initialState={
    loading:false,
    success:false,
    error:"",
    result:null
}

let GetSixImageSlice=createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(GetFiveImage.pending,(state)=>{
            state.loading=true
            state.error=false
            state.result=[]
            state.success=false
        })
        .addCase(GetFiveImage.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
            state.result=[]
            state.success=false
        })
        .addCase(GetFiveImage.fulfilled,(state,action)=>{
            state.loading=false
            state.error=false
            state.result=action.payload
            state.success=true
        })
    }
})
export default GetSixImageSlice.reducer