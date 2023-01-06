import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  isAuth: false,
  user: {},
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, actions) => {
      const { accessToken, user } = actions.payload;
      state.isAuth = accessToken !== null ? true : false;
      state.token = accessToken;
      state.user = user;
    },
    destroyAuth: (state) => {
      state = { ...state, ...initialState };
    },
  },
});

export default authSlice.reducer;

export const { destroyAuth, setAuth } = authSlice.actions;

export const useAuth = () => useSelector((state) => state.auth);
