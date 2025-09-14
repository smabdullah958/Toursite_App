import { createSlice } from "@reduxjs/toolkit";
import SearchBarThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Packages/SearchBarThunck"

let initialState={
    loading:false,
    error:[],
    success:false,
    SearchResult:[],
    isSearched:false //this will check that the search has been performed or not
}

let PackageSearchBarSlice=createSlice({
    name:"searchBar",
    initialState,
    reducers:{
        resetSearch:(state)=>{
            state.success=false
            state.error=[]
            state.loading=false
            state.SearchResult=[],
            state.isSearched=false
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(SearchBarThunck.pending,(state)=>{
            state.loading=true
            state.error=[]
            state.success=false
        })
        .addCase(SearchBarThunck.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
            state.success=false
        })
        .addCase(SearchBarThunck.fulfilled,(state,action)=>{
            state.loading=false
            state.error=[]
            state.success=true
            state.SearchResult=action.payload
            state.isSearched=true
        })
    }
})
export let {resetSearch}=PackageSearchBarSlice.actions
export default PackageSearchBarSlice.reducer;