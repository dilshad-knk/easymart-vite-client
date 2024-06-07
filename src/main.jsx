import React, { useState, useEffect } from "react";
import './bootstrap/bootstrap.min.css';
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ToastContainer } from "react-toastify";
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import RoutesWrapper from "./routes/RoutesWrapper.jsx"
let persistor = persistStore(store);



ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate persistor={persistor}>
        <ToastContainer />
        <RoutesWrapper />
      </PersistGate>
    </React.StrictMode>
  </Provider>
);
