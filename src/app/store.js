import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import walletReducer from "../features/wallet/walletSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({ user: userReducer, wallet: walletReducer });

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});
