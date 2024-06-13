import { combineReducers, configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./darkModeReducer";
import sellerAuthSlice from "./sellerAuthenticate";
import adminAuthSlice from "./adminAuthenticate";
import userAuthSlice from "./userAuthenticate";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import cartSlice from "./cartSlice";

const persistConfig = {
    key : 'themeStatus',
    version : 1 ,
    storage
}

const rootReducer = combineReducers({
    themeStatus :  persistReducer(persistConfig, darkModeReducer) ,
    seller : sellerAuthSlice,
    admin : adminAuthSlice,
    user : userAuthSlice,
    cart : cartSlice,
})

// const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
    reducer : rootReducer,
});

export default store