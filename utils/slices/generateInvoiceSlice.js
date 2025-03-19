import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: {
    selectedCompanyDetails: null,
  },
};

const generateInvoiceSlice = createSlice({
  name: "generateInvoice",
  initialState,
  reducers: {
    setCompanyDetails(state, action) {
      state.company.selectedCompanyDetails = action.payload;
    },
  },
});

export const { setCompanyDetails } = generateInvoiceSlice.actions;
export default generateInvoiceSlice.reducer;
