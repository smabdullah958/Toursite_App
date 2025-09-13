import { createSlice } from "@reduxjs/toolkit";
import UpdatePackageThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Packages/UpdatePackageThunck"

let initialState={
    success:false,
    loading:false,
    error:[],
    FormID:null
}
 
let UpdatePackageSlice=createSlice({
    name:"updateSlice",
    initialState,
    reducers:{
        DisplayPackageForm:(state,action)=>{
            state.FormID=action.payload
        },
        HidePackageForm:(state)=>{
            state.FormID=null
        },
        ResetPackage:(state)=>{
            state.loading=false;
            state.success=false;
            state.error=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(UpdatePackageThunck.pending,(state)=>{
            state.loading=true;
            state.success=false;
            state.error=null
        })
        builder.addCase(UpdatePackageThunck.fulfilled,(state)=>{
            state.loading=false;
            state.success=true;
            state.error=null
        })
        builder.addCase(UpdatePackageThunck.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.payload
        })
    }
})

export let {DisplayPackageForm,HidePackageForm,ResetPackage} = UpdatePackageSlice.actions

export default UpdatePackageSlice.reducer