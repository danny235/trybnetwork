import { createSlice } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
const initialState = {
    userProfile: {},
    token: "",
    userFetching: false,
    refreshToken: ""
}

export const userSlice = createSlice({
    name: 'user',
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
          logOutUser: (state) => {
            state.refreshToken = ""
            state.token = ""
            state.userProfile = {}
            storage.removeItem("persist:root")
            return { ...state}
          }
    }
})

export const {updateUser, updateToken, updateUserFetching, logOutUser, updateRefreshToken} =
  userSlice.actions;

export default userSlice.reducer;