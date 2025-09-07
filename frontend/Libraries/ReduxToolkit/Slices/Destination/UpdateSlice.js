import { createSlice } from "@reduxjs/toolkit";
import UpdateThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/UpdateThunck"
let initialState = {
Loading:false,
success:false,
error:[],
FormId:null
};

let UpdateSlice = createSlice({
name:"UpdateSlice",
initialState,
reducers:{
    DisplayUpdateForm:(state,action)=>{
        state.FormId=action.payload
    },
    HideUpdateForm:(state)=>{
        state.FormId=null
    },
    ResetUpdateState:(state)=>{
        state.Loading=false
        state.success=false
        state.error=[]
        state.FormId=null
    }
},
extraReducers:(builder)=>{
    builder
        .addCase(UpdateThunck.fulfilled,(state)=>{
        state.Loading=false
        state.success=true
        state.error=[]
        })
        .addCase(UpdateThunck.rejected,(state,action)=>{
        state.Loading=false
        state.success=false
        state.error=action.payload
        })
        .addCase(UpdateThunck.pending,(state)=>{
        state.Loading=true
        state.success=false
        state.error=[]
        })
}
})

export const {DisplayUpdateForm,HideUpdateForm,ResetUpdateState} = UpdateSlice.actions
export default UpdateSlice.reducer