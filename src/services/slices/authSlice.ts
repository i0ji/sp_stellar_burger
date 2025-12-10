import { createSlice } from '@reduxjs/toolkit';

import { getUserData, loginUser, logoutUser, registerUser, updateUserData } from 'utils/api.ts';

import { IAuthSlice } from 'declarations/interfaces';

export const initialState: IAuthSlice = {
  user: null,
  status: 'idle',
  //   userData: null as null | IUserData,
  error: null as null | string,
  isAuth: false,
  authChecked: false,
  loginError: false,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuth = Boolean(action.payload);
    },
    setAuthChecked(state, action) {
      state.authChecked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.error = null;
        state.isAuth = true;
        state.loginError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Auth error';
        state.loginError = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Registration error';
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        state.status = 'idle';
        state.isAuth = false;
        // state.userData = null;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Logout error';
        state.isAuth = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.userData = action.payload;
        state.user = action.payload.user;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Data fetch error';
      })
      .addCase(updateUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.userData = action.payload;
        state.user = action.payload?.user || null;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Update user error';
      });
  },
});

export const { setAuthChecked, setUser } = authSlice.actions;

export default authSlice.reducer;
