import { createSlice } from "@reduxjs/toolkit"


const initialState = {

  
 isadminAuthenticated :false,
  adminName:''
};

const adminAuthSlice = createSlice (
  {
    name : 'sellerAuthenticate',
    initialState,
    reducers : {
       adminAuthSuccess : (state,action) => {
        
        state.isadminAuthenticated = action.payload.success;
        state.adminName = action.payload.admin.name;

    },
    adminLogout: (state, action) => {
      state.isadminAuthenticated = false;
      state.adminName = ''; 
    },
    
    }
  }
)


export const {adminAuthSuccess,adminLogout} = adminAuthSlice.actions;
export default adminAuthSlice.reducer;


