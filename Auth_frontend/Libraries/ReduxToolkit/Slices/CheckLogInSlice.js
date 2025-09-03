//this file is only used to display and hide the login and logout button and also fetch the role
//this file is used to check the user is login or not on a refetch or load

const { createSlice } = require("@reduxjs/toolkit");
import CheckLogIn  from "@/Libraries/ReduxToolkit/AsyncThunck/CheckLoginThunck";

let initialState={
    IsLogIn:false,
    Role:"",
    success:false
}

let CheckLoginSlice=createSlice({
    name:"slice",
    initialState,
    reducers:{
    // thsi si diaply the logout button    
    DisplayLogOut: (state) => {
      state.IsLogIn = true;
    },
    // this si diaply the login button 
        DisplayLogIn: (state) => {
      state.IsLogIn = false;
    },

      },
    extraReducers: (builder) => {
    builder
      .addCase(CheckLogIn.fulfilled, (state, action) => {
        // CheckLogin is come form a backend bro
        state.IsLogIn = action.payload.CheckLogin;  
        state.Role=action.payload?.decode?.Role   //decode.Role is come from a backend and file is a CheckLogin
        state.success=true
      })
      .addCase(CheckLogIn.rejected, (state) => {
        state.IsLogIn = false;
      });
  }
})


export let {DisplayLogOut,DisplayLogIn}=CheckLoginSlice.actions;


export default CheckLoginSlice.reducer
