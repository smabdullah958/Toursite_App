import { createSlice } from "@reduxjs/toolkit";
import PackageBookNowSearchBarThunck from "@/Libraries/ReduxToolkit/AsyncThunck/PackagaBookNow/PackageBookNowSearchBar";

let iniatialState = {
    loading: false,
    SearchResult: [],
    error: null,
    success:true,
    isSearched:false //this will check that the search has been performed or not
};
let PackageBookNowSearchBarSlice = createSlice({
    name: "SearchBarSlice",
    initialState: iniatialState,
    reducers: {
        resetSearch:(state)=>{
            state.loading = false;
            state.SearchResult = [];
            state.error = null;
            state.success = true;
            state.isSearched=false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(PackageBookNowSearchBarThunck.pending, (state) => {
                state.loading = true;
                state.error=null;
                state.SearchResult=[];
                state.isSearched=true
            })
            .addCase(PackageBookNowSearchBarThunck.fulfilled, (state, action) => {
                state.loading=false;
                state.SearchResult=action.payload;
                state.error=null;
                state.isSearched=true
            })
            .addCase(PackageBookNowSearchBarThunck.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.SearchResult = [];
                state.isSearched=true
            })
}})

export let {resetSearch}=PackageBookNowSearchBarSlice.actions

export default PackageBookNowSearchBarSlice.reducer;