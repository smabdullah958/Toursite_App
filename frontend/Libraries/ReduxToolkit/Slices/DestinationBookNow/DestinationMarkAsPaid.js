import { createSlice } from "@reduxjs/toolkit";
import DestinationMarkAsPaid from "@/Libraries/ReduxToolkit/AsyncThunck/DestinationBookNow/DestinationMarkAsPaid"
let initialState = {
Loading:false,
success:false,
error:[],
UpdateId:null,
UpdateData:null
};

let DestinationMarkAsPaidSlice = createSlice({
name:"UpdateSlice",
initialState,
reducers:{ },
extraReducers:(builder)=>{
    builder
        .addCase(DestinationMarkAsPaid.fulfilled,(state)=>{
        state.Loading=false
        state.success=true
        state.error=[]
        })
        .addCase(DestinationMarkAsPaid.rejected,(state,action)=>{
        state.Loading=false
        state.success=false
        state.error=action.payload
        })
        .addCase(DestinationMarkAsPaid.pending,(state)=>{
        state.Loading=true
        state.success=false
        state.error=[]
        })
}
})

export default DestinationMarkAsPaidSlice.reducer