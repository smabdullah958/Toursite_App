//this is used when a link is send to a email than we click on a link than this is show 
const { createSlice } = require("@reduxjs/toolkit");
import ResetPasswordThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Auth/ResetPasswordThunck";


let initialState={
    Loading:false,
    success:false,
    error:"",
    errorMessage:'',
     Role:""
}
let ResetPasswordSlice=createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(ResetPasswordThunck.fulfilled,(state,action)=>{
            state.success=true
            state.Loading=false
            state.error=""
            state.Role=action.payload.Role
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