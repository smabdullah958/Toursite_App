
import {createSlice} from "@reduxjs/toolkit"
import PackageBookNowFormThunck from "@/Libraries/ReduxToolkit/AsyncThunck/PackagaBookNow/BookNowFormThunck"

let initialState={
    ShowForm:false,
    DestinationID:null,
    success:false,
    loading:false,
    error:null,
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
        },
        ResetStates(state){
            state.ShowForm=false;
            state.PackageID=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(PackageBookNowFormThunck.fulfilled,(state)=>{
            state.success=true;
            state.error=[];
            state.loading=false
        })
        .addCase(PackageBookNowFormThunck.rejected,(state,action)=>{
            state.success=false;
            state.error=action.payload;
            state.loading=false
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