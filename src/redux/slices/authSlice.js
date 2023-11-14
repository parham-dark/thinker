// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    token: null,
    personId: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    setPersonId: (state, action) => {
      state.personId = action.payload;
    },
  },
});

export const { setUserId, setToken, clearToken, setPersonId } =
  authSlice.actions;

export default authSlice.reducer;
