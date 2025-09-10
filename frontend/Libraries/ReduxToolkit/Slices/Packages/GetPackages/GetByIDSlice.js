import { createSlice } from "@reduxjs/toolkit";
import GetByIDThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Packages/GetPackages/GetByIDThunck"

let initialState={
    success:false,
    error:[],
    loading:false,
    result:[]
}

let GetByIdSlice=createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(GetByIDThunck.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.result=action.payload
            state.error=[]
        })
        .addCase(GetByIDThunck.pending,(state)=>{
            state.loading=true
            state.success=false
            state.error=[]
        })
        .addCase(GetByIDThunck.rejected,(state,action)=>{
            state.loading=false
            state.success=false
            state.error=action.payload
        })
    }
})

export default GetByIdSlice.reducer