import  GetFistTwentyBookingThunck from "@/Libraries/ReduxToolkit/AsyncThunck/DestinationBookNow/GetFirstTwentyBooking"

import { createSlice } from "@reduxjs/toolkit"

let initialState={
    success:false,
    Loading:false,
    error:false,
    GetBooking:[],
    page:1,
    hasMore:true, //track if   more data is available 
    loadedPages:[] //track which pages has been loaded
}

let GetFirstTwentyBooking=createSlice({
    name:"TwentySlice",
    initialState,
    reducers:{
  resetProducts: (state) => {
    state.success = false;
    state.Loading = false;
    state.error = false;
    state.GetBooking = [];
    state.page = 1;
    state.hasMore = true;
    state.loadedPages = [];
  }

    },
    extraReducers:(builder)=>{
        builder.addCase(GetFistTwentyBookingThunck.rejected,(state)=>{
            state.Loading=false
            state.error=[]
            state.GetBooking=[]
            state.success=false
        })
        .addCase(GetFistTwentyBookingThunck.fulfilled,(state,action)=>{
            state.Loading=false
            state.error=[]

         //bro here we dont use thsi becuase it will replace the old product with new prdoct so suppose i have 5 old products than new 5 prdocts will replace it so as a resutl it dont shwo the 10 prdocts so that is why we dont use this in a pagination
            
         //  state.result=action.payload


             if (Array.isArray(action.payload)) {
                 const currentPage = action.meta.arg.page;
                
            //     // Only add data if this page hasn't been loaded before
                 if (!state.loadedPages.includes(currentPage)) {
                             //this will merge all the 10 prdocts bro 
                    state.GetBooking = [...state.GetBooking, ...action.payload];
                     state.loadedPages.push(currentPage);
                     state.page = currentPage;
                 }
                
                 // If we got less data than requested, there's no more data
                 if (action.payload.length <action.meta.arg.limit) {
                     state.hasMore = false;
                 }
              }
            state.success=true
        
        })
        .addCase(GetFistTwentyBookingThunck.pending,(state)=>{
                state.Loading=true
            state.error=[]
            
            state.success=false
        })
    }
})

export const {resetProducts} = GetFirstTwentyBooking.actions;

export default GetFirstTwentyBooking.reducer