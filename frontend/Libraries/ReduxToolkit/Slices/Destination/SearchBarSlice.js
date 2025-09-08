import { createSlice } from "@reduxjs/toolkit";
import SearchBarThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Destination/SearchBarThunck";

let iniatialState = {
    loading: false,
    SearchResult: [],
    error: null,
    success:true,
    isSearched:false //this will check that the search has been performed or not
};
let SearchBarSlice = createSlice({
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
            .addCase(SearchBarThunck.pending, (state) => {
                state.loading = true;
                state.error=null;
                state.SearchResult=[];
                state.isSearched=true
            })
            .addCase(SearchBarThunck.fulfilled, (state, action) => {
                state.loading=false;
                state.SearchResult=action.payload;
                state.error=null;
                state.isSearched=true
            })
            .addCase(SearchBarThunck.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.SearchResult = [];
                state.isSearched=true
            })
}})

export let {resetSearch}=SearchBarSlice.actions
export default SearchBarSlice.reducer;