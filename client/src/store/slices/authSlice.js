import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  // session: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      // state.session = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

// Selector
export const getIsLogged = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
