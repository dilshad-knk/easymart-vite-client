import { createSlice } from "@reduxjs/toolkit"


const initialState = {

  
 isUserAuthenticated :false,
  user:''
};

const userAuthSlice = createSlice (
  {
    name : 'userAuthenticate',
    initialState,
    reducers : {
       userAuthSuccess : (state,action) => {
        
        state.isUserAuthenticated = action.payload.success;
        state.user = action.payload.user;

    },
    userLogout: (state, action) => {
      state.isUserAuthenticated = false;
      state.user = ''; 
    },
    
    }
  }
)


export const {userAuthSuccess,userLogout} = userAuthSlice.actions;
export default userAuthSlice.reducer;


