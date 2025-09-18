import { createSlice } from "@reduxjs/toolkit";
import GetBookingByIDThunck from "@/Libraries/ReduxToolkit/AsyncThunck/DestinationBookNow/GetBookingByID"

let initialState={
    Loading:false,
    success:false,
    error:[],
    UserDetail:[]
}

let GetBookingByIDSlice=createSlice({
    name:"any",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(GetBookingByIDThunck.pending,(state)=>{
            state.success=false
            state.Loading=true
            state.error=[]
            state.UserDetail=[]
        })
        .addCase(GetBookingByIDThunck.rejected,(state,action)=>{
            state.success=false
            state.Loading=false
            state.error=action.payload
            state.UserDetail=null
        })
        .addCase(GetBookingByIDThunck.fulfilled,(state,action)=>{
            state.success=true
            state.Loading=false
            state.error=[]
            state.UserDetail=action.payload
        })
    }
})

export default GetBookingByIDSlice.reducer