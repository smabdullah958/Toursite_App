import {createSlice} from "@reduxjs/toolkit"

let initialState={
    ShowForm:false,
    PackageID:null
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
    }
})

export let {DisplayBookNowForm,HideBookNowForm,ResetStates} =PackageBookNowSlice.actions

export default PackageBookNowSlice.reducer