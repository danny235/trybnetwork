import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  depositHistory: [],
  withdrawalHistory: [],
  betHistory: [],
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    updateDepositHistory: (state, action) => {
      state.depositHistory = action.payload;
    },
    updateWithdrawalHistory: (state, action) => {
      state.withdrawalHistory = action.payload;
    },
    updateBetHistory: (state, action) => {
      state.betHistory = action.payload;
    },
  },
});

export const {
  updateDepositHistory,
  updateWithdrawalHistory,
  updateBetHistory,
} = walletSlice.actions;

export default walletSlice.reducer;
