import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isMultipleSample: false,
  isMultipleSampleCheckbox: false,
  sampleCpiRecord: [],
  isViewMultipleSampleCpiRecords: false,
};

const AddMultipleSampleCpiSlice = createSlice({
  name: "MultipleSampleCpi",
  initialState,
  reducers: {
    toggleMultipleSampleCpi(state, action) {
      state.isMultipleSample = action.payload;
    },
    checkedMultipleSampleCpi(state, action) {
      state.isMultipleSampleCheckbox = action.payload;
    },
    addMultipleSample(state, action) {
      state.sampleCpiRecord = action.payload;
    },
    toggleViewMultipleCpiSample(state, action) {
      state.isViewMultipleSampleCpiRecords = action.payload;
    },
    removeMultipleSample(state) {
      state.sampleCpiRecord = [];
    },
  },
});

export const {
  toggleMultipleSampleCpi,
  checkedMultipleSampleCpi,
  addMultipleSample,
  toggleViewMultipleCpiSample,
  removeMultipleSample,
} = AddMultipleSampleCpiSlice.actions;

export default AddMultipleSampleCpiSlice.reducer;
