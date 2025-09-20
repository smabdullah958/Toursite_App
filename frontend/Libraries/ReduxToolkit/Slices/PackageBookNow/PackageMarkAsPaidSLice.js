import { createSlice } from "@reduxjs/toolkit";
import PackageMarkAsPaid from "@/Libraries/ReduxToolkit/AsyncThunck/PackagaBookNow/PackageMarkAsPaid"
let initialState = {
Loading:false,
success:false,
error:[],
UpdateId:null,
UpdateData:null
};

let PackageMarkAsPaidSlice = createSlice({
name:"MarkSlice",
initialState,
reducers:{ },
extraReducers:(builder)=>{
    builder
        .addCase(PackageMarkAsPaid.fulfilled,(state)=>{
        state.Loading=false
        state.success=true
        state.error=[]
        })
        .addCase(PackageMarkAsPaid.rejected,(state,action)=>{
        state.Loading=false
        state.success=false
        state.error=action.payload
        })
        .addCase(PackageMarkAsPaid.pending,(state)=>{
        state.Loading=true
        state.success=false
        state.error=[]
        })
}
})

export default PackageMarkAsPaidSlice.reducer