import { createSlice } from "@reduxjs/toolkit";
import DestinationBookingUpdateThunck from "@/Libraries/ReduxToolkit/AsyncThunck/DestinationBookNow/UpdateBooking"
let initialState = {
Loading:false,
success:false,
error:[],
UpdateId:null,
UpdateData:null
};

let DestinationBookingSlice = createSlice({
name:"UpdateSlice",
initialState,
reducers:{ },
extraReducers:(builder)=>{
    builder
        .addCase(DestinationBookingUpdateThunck.fulfilled,(state)=>{
        state.Loading=false
        state.success=true
        state.error=[]
        })
        .addCase(DestinationBookingUpdateThunck.rejected,(state,action)=>{
        state.Loading=false
        state.success=false
        state.error=action.payload
        })
        .addCase(DestinationBookingUpdateThunck.pending,(state)=>{
        state.Loading=true
        state.success=false
        state.error=[]
        })
}
})

export default DestinationBookingSlice.reducer