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
    setUser: (state, actions) => {
      const { user } = actions.payload;
      state.user = user;
    },
    setAuth: (state, actions) => {
      const { accessToken } = actions.payload;
      state.isAuth = accessToken !== null ? true : false;
      state.token = accessToken;
    },
    destroyAuth: (state) => {
      state.isAuth = false;
      state.user = {};
      state.token = null;
    },
  },
});

export default authSlice.reducer;

export const { destroyAuth, setAuth, setUser } = authSlice.actions;

export const useAuth = () => useSelector((state) => state.auth);
