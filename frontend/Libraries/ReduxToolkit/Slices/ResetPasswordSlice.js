const { createSlice } = require("@reduxjs/toolkit");
import ResetPasswordThunck from "@/Libraries/ReduxToolkit/AsyncThunck/ResetPasswordThunck";


let initialState={
    Loading:false,
    success:false,
    error:"",
    errorMessage:''
}
let ResetPasswordSlice=createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(ResetPasswordThunck.fulfilled,(state)=>{
            state.success=true
            state.Loading=false
            state.error=""
        })
        .addCase(ResetPasswordThunck.rejected,(state,action)=>{
             state.success=false
            state.Loading=false
            state.error=true
            state.errorMessage=action.payload
        
        })
        .addCase(ResetPasswordThunck.pending,(state)=>{
             state.success=false
            state.Loading=true
            state.error=""
        })
    }
})

export default ResetPasswordSlice.reducer