import { createSlice } from "@reduxjs/toolkit";

const multipleManDaysSlice = createSlice({
  name: "MultipleManDays",
  initialState: {
    MultipleManDays: [],
    updatedDate:null,
  },
  reducers: {
    setMultipleManDays: (state, action) => {
      state.MultipleManDays = action.payload;
    },
  },
});

export const { setMultipleManDays } = multipleManDaysSlice.actions;
export default multipleManDaysSlice.reducer;
