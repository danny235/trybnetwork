import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userProfile: {},
    token: "",
    userFetching: false,
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
    }
})

export const {updateUser, addAccessToken, updateUserFetching} =
  userSlice.actions;

export default userSlice.reducer;