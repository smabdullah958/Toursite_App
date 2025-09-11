import { createSlice } from "@reduxjs/toolkit";
import GetSixPackagesThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Packages/GetPackages/GetSixPackagesThunck"

let initialState={
    loading:false,
    result:[],
    success:false,
    error:false
}

let GetSixPackagesSlice=createSlice({
    name:"getpackages",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(GetSixPackagesThunck.fulfilled,(state,action)=>{
            state.loading=false
            state.error=false
            state.result=action.payload
            state.success=true
        })
        .addCase(GetSixPackagesThunck.rejected,(state)=>{
            state.loading=false
            state.error=true
            state.success=false
        })
        .addCase(GetSixPackagesThunck.pending,(state)=>{
            state.loading=true
            state.error=false
            state.success=false
        })
    }
})
export default GetSixPackagesSlice.reducer