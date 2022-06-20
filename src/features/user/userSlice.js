import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
const initialState = {
  userProfile: {},
  token: "",
  userFetching: false,
  refreshToken: "",
  balance: "",
  invites: [],
  betHistory: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.userProfile = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    updateUserFetching: (state, action) => {
      state.userFetching = action.payload;
    },
    updateRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    updateInvites: (state, action) => {
      state.invites = action.payload;
    },
    updateBetHistory: (state, action) => {
      state.betHistory = action.payload;
    },
    updateBalance: (state, action) => {
      state.balance = action.payload;
    },
    logOutUser: (state) => {
      state.refreshToken = "";
      state.token = "";
      state.userProfile = {};
      state.invites = [];
      state.betHistory =[]
      storage.removeItem("persist:root");
    },
    
  },
});

export const {
  updateUser,
  updateToken,
  updateUserFetching,
  logOutUser,
  updateRefreshToken,
  updateInvites,
  updateBetHistory,
  updateBalance,
} = userSlice.actions;

export default userSlice.reducer;
