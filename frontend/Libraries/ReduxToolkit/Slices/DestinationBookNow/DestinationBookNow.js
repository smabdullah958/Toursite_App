
import {createSlice} from "@reduxjs/toolkit"
import BookNowFormThunck from "@/Libraries/ReduxToolkit/AsyncThunck/DestinationBookNow/BookNowFormThunck"

let initialState={
    ShowForm:false,
    DestinationID:null,
    success:false,
    loading:false,
    error:null
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
    },
    extraReducers:(builder)=>{
        builder.addCase(BookNowFormThunck.fulfilled,(state)=>{
            state.success=true;
            state.error=[];
            state.loading=false
        })
        .addCase(BookNowFormThunck.rejected,(state,action)=>{
            state.success=false;
            state.error=action.payload;
            state.loading=false
        })
        .addCase(BookNowFormThunck.pending,(state)=>{
            state.success=false;
            state.error=[];
            state.loading=true
        })
    }
})

export let {DisplayBookNowForm,HideBookNowForm,ResetStates} =DestinationBookNowSlice.actions

export default DestinationBookNowSlice.reducer