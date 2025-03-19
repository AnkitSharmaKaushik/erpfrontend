import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationList: [],
  isViewNotification:false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action) {
      state.notificationList = action.payload;
    },
    toggleViewNotification:(state,action)=>{
      state.isViewNotification = !state.isViewNotification
    },
  },
});

export const { addNotification,toggleViewNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
