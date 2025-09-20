import { createSlice } from "@reduxjs/toolkit";
import DestinationBookNowSearchBarThunck from "@/Libraries/ReduxToolkit/AsyncThunck/DestinationBookNow/SearchBarThunck";

let iniatialState = {
    loading: false,
    SearchResult: [],
    error: null,
    success:true,
    isSearched:false //this will check that the search has been performed or not
};
let DestinationBookNowSearchBarSlice = createSlice({
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
            .addCase(DestinationBookNowSearchBarThunck.pending, (state) => {
                state.loading = true;
                state.error=null;
                state.SearchResult=[];
                state.isSearched=true
            })
            .addCase(DestinationBookNowSearchBarThunck.fulfilled, (state, action) => {
                state.loading=false;
                state.SearchResult=action.payload;
                state.error=null;
                state.isSearched=true
            })
            .addCase(DestinationBookNowSearchBarThunck.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.SearchResult = [];
                state.isSearched=true
            })
}})

export let {resetSearch}=DestinationBookNowSearchBarSlice.actions
export default DestinationBookNowSearchBarSlice.reducer;