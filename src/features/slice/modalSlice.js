import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const modalStatus = {
  active: "active",
  inactive: "inactive",
};

const initialState = {
  status: modalStatus.inactive,
  id: "",
  props: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, actions) => {
      state.status = modalStatus.active;
      state.id = actions.payload.id;
      state.props = actions.payload.props || {};
    },
    destroyModal: (state) => {
      state.status = modalStatus.inactive;
      state.id = "";
      state.props = {};
    },
  },
});

export default modalSlice.reducer;

export const { destroyModal, setModal } = modalSlice.actions;

export const useModal = () => useSelector((state) => state.modal);
