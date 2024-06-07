import { createSlice } from "@reduxjs/toolkit"


const initialState = {

  
  isSellerAuthenticated:false,
  token:'',
  fetchedSeller:''

};

const sellerAuthSlice = createSlice (
  {
    name : 'sellerAuthenticate',
    initialState,
    reducers : {
       sellerAuthSuccess : (state,action) => {
        
        state.token = action.payload.token;
        state.isSellerAuthenticated = action.payload.isSellerAuthenticated;
        state.fetchedSeller = action.payload.fetchedSeller;
       

    },
     sellerLogout : (state,action) => {
        
    
      state.token = '';
      state.isSellerAuthenticated = false
      state.fetchedSeller = ''
  },
    }
  }
)


export const {sellerAuthSuccess,sellerLogout} = sellerAuthSlice.actions;
export default sellerAuthSlice.reducer;


