import {createSlice} from "@reduxjs/toolkit"

let initialState={
    ShowForm:false,
    DestinationID:null
}

let DestinationBookNowSlice=createSlice({
    name:"Destination",
    initialState,
    reducers:{
        DisplayBookNowForm(state,action){
            state.ShowForm=true;
            state.DestinationID=action.payload
        },
        HideBookNowForm(state){
            state.ShowForm=false;
            state.DestinationID=null
        },
        ResetStates(state){
            state.ShowForm=false;
            state.DestinationID=null
        }
    }
})

export let {DisplayBookNowForm,HideBookNowForm,ResetStates} =DestinationBookNowSlice.actions

export default DestinationBookNowSlice.reducer