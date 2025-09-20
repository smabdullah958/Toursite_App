import { createSlice } from "@reduxjs/toolkit";
import GetPackageBookingByIDThunck from "@/Libraries/ReduxToolkit/AsyncThunck/PackagaBookNow/GetPackageByID"

let initialState={
    Loading:false,
    success:false,
    error:[],
    UserDetail:[]
}

let GetPackageByIDSlice=createSlice({
    name:"GetByIDSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(GetPackageBookingByIDThunck.pending,(state)=>{
            state.success=false
            state.Loading=true
            state.error=[]
            state.UserDetail=[]
        })
        .addCase(GetPackageBookingByIDThunck.rejected,(state,action)=>{
            state.success=false
            state.Loading=false
            state.error=action.payload
            state.UserDetail=null
        })
        .addCase(GetPackageBookingByIDThunck.fulfilled,(state,action)=>{
            state.success=true
            state.Loading=false
            state.error=[]
            state.UserDetail=action.payload
        })
    }
})

export default GetPackageByIDSlice.reducer