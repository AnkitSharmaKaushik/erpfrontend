import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  manDaysEntry: {
    project_id: "",
    update_date: "",
    total_man_days: "",
    total_achievement: "",
    status: "",
  },
};
const manDaysUpdateSlice = createSlice({
  name: "manDaysUpdate",
  initialState,
  reducers: {
    addMandaysUpdate: (state, action) => {
      state.manDaysEntry = action.payload;
    },
  },
});
export const { addMandaysUpdate } = manDaysUpdateSlice.actions;
export default manDaysUpdateSlice.reducer;
