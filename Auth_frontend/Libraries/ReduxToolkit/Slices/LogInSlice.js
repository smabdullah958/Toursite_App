"use client"
const { createSlice } = require("@reduxjs/toolkit");
import  LogInThunck from "@/Libraries/ReduxToolkit/AsyncThunck/LogInThunck" 
let initialState={
    ShowLogIn:false, //for show and hide the fomr of a login 
    Loading:false,
    success:false,
    errorMessage:"",
    Role:""   
}

export let LogInSlice=createSlice({
    name:"Menu",
    initialState,
    reducers:{
        //this will show the login form 
        DisplayLogin:(state)=>{
            state.ShowLogIn=true
        },
        //this will hide the login form bro
        HideLogIn:(state)=>{
            state.ShowLogIn=false
            state.errorMessage=""
            state.success=false
        },
            resetLoginState: (state) => {
      state.Loading = false;
      state.success = false;
      state.errorMessage = "";
    },

    },
    extraReducers:(builder)=>{
        builder
        .addCase(LogInThunck.pending,(state)=>{
            state.Loading=true,
            state.success=false,
            state.errorMessage=""
        })
        .addCase(LogInThunck.fulfilled,(state,action)=>{
            state.Loading=false,
            state.success=true,
            state.errorMessage="",
            state.Role=action.payload.Role
        })
        .addCase(LogInThunck.rejected,(state,action)=>{
            state.Loading=false,
            state.success=false,
            state.errorMessage=action.payload

        })
    }
})

export let {DisplayLogin,HideLogIn,resetLoginState}=LogInSlice.actions;

export default LogInSlice.reducer