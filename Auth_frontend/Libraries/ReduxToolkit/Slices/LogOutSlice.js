import { createSlice } from "@reduxjs/toolkit";
import LogOutThunck from "@/Libraries/ReduxToolkit/AsyncThunck/LogOutThunck";

let initialState={
    success:false,
    error:false,
    Loading:false,
    Role:""
}
let LogOutSlice=createSlice({
    name:"slice",
    initialState,
    reducers:{
         resetLogOut:(state)=>{
             state.success=false
             state.Loading=false
             state.error=false
             state.Role=""
         }
    },
    extraReducers:(builder)=>{
        builder.addCase(LogOutThunck.pending,(state)=>{
            state.Loading=true
            state.error=false
            state.success=false
        })
        .addCase(LogOutThunck.rejected,(state)=>{
            state.Loading=false
            state.error=true
            state.success=false
        })
        .addCase(LogOutThunck.fulfilled,(state)=>{
            state.Loading=false
            state.error=false
            state.success=true,
            state.Role=""
        })
    }
})

 export let {resetLogOut}=LogOutSlice.actions
export default LogOutSlice.reducer
