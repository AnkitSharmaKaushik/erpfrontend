import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filterSlice",
  initialState: {
    filterOption: {
      selectedOption: [],
      searchText: "",
      dateRange: {
        startDate: "",
        endDate: "",
      },
    },
    openFilter: false,
  },
  reducers: {
    toggleSelectedOption: (state, action) => {
      const index = state.filterOption.selectedOption.indexOf(action.payload);
      if (index !== -1) {
        // If option exists, remove it
        state.filterOption.selectedOption.splice(index, 1);
      } else {
        // If option doesn't exist, add it
        state.filterOption.selectedOption.push(action.payload);
      }
    },
    removeAllSelectedOption: (state) => {
      state.filterOption.selectedOption = [];
    },
    addSearchText: (state, action) => {
      state.filterOption.searchText = action.payload;
    },
    addStartDateRange: (state, action) => {
      state.filterOption.dateRange.startDate = action.payload;
    },
    addEndDateRange: (state, action) => {
      state.filterOption.dateRange.endDate = action.payload;
    },
    toggleFilterOption: (state) => {
      state.openFilter = !state.openFilter;
    },
  },
});

export const {
  toggleSelectedOption,
  removeAllSelectedOption,
  addSearchText,
  toggleFilterOption,
  addStartDateRange,
  addEndDateRange,
} = filterSlice.actions;

export default filterSlice.reducer;
