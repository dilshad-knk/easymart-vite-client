import { createSlice } from "@reduxjs/toolkit"


const initialState = {

    darkMode : false,
};

const darkModeReducer = createSlice (
  {
    name : 'themestatus',
    initialState,
    reducers : {
        setDarkMode: (state) => {
            state.darkMode = !state.darkMode;}
          
    }
  }
)


export const {setDarkMode} = darkModeReducer.actions;
export default darkModeReducer.reducer;