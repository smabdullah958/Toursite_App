import { createSlice } from "@reduxjs/toolkit";
import GetFirst12PackagesThuck from "@/Libraries/ReduxToolkit/AsyncThunck/Packages/GetPackages/GetFirst12PackagesThunck";

let initialState={
    success:false,
    Loading:false,
    error:false,
    result:[],
    page:1,
    hasMore:true, //track if   more data is available 
    loadedPages:[] //track which pages has been loaded
}

let GetFirst12PackagesSlice=createSlice({
    name:'getdestination',
    initialState,
    reducers:{    },
    extraReducers:(builder)=>{
        builder
        .addCase(GetFirst12PackagesThuck.rejected,(state)=>{
            state.Loading=false
            state.error=[]
            state.result=[]
            state.success=false
        })
        .addCase(GetFirst12PackagesThuck.fulfilled,(state,action)=>{
            state.Loading=false
            state.error=[]

         //bro here we dont use thsi becuase it will replace the old product with new prdoct so suppose i have 5 old products than new 5 prdocts will repsole it so as a resutl it dont shwo the 10 prdocts so that is why we dont use this in a pagination
            
         //  state.result=action.payload


             if (Array.isArray(action.payload)) {
                 const currentPage = action.meta.arg.page;
                
            //     // Only add data if this page hasn't been loaded before
                 if (!state.loadedPages.includes(currentPage)) {
                             //this will merge all the 10 prdocts bro 
                    state.result = [...state.result, ...action.payload];
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
        .addCase(GetFirst12PackagesThuck.pending,(state)=>{
                state.Loading=true
            state.error=[]
            
            state.success=false
        })
    }
})

export default GetFirst12PackagesSlice.reducer