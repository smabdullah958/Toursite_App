
import {createSlice} from "@reduxjs/toolkit"
import PackageBookNowFormThunck from "@/Libraries/ReduxToolkit/AsyncThunck/PackagaBookNow/BookNowFormThunck"

let initialState={
    ShowForm:false,
    DestinationID:null,
    success:false,
    loading:false,
    error:null,
    errorMessage:"",
    updateSlots:null
}

let PackageBookNowSlice=createSlice({
    name:"Destination",
    initialState,
    reducers:{
        DisplayBookNowForm(state,action){
            state.ShowForm=true;
            state.PackageID=action.payload
        },
        HideBookNowForm(state){
            state.ShowForm=false;
            state.PackageID=null
            state.errorMessage=""
        },
        ResetStates(state){
            state.ShowForm=false;
            state.PackageID=null
            state.errorMessage=""
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(PackageBookNowFormThunck.fulfilled,(state,action)=>{
            state.success=true;
            state.error=[];
            state.loading=false
            state.updateSlots=action.payload.updateSlots
        })
        .addCase(PackageBookNowFormThunck.rejected,(state,action)=>{
            state.success=false;
            state.error="amount must be less than  a 999,999.99";
            state.loading=false
            state.errorMessage=action.payload
        })
        .addCase(PackageBookNowFormThunck.pending,(state)=>{
            state.success=false;
            state.error=[];
            state.loading=true
        })
    }
})

export let {DisplayBookNowForm,HideBookNowForm,ResetStates} =PackageBookNowSlice.actions

export default PackageBookNowSlice.reducer