import { createSlice } from "@reduxjs/toolkit";

const ReportSlice = createSlice({
  name: "ReportSlice",
  initialState: {
    invoiceStatus: null,
    invoiceAge: [],
    salesPerson: [],
  },
  reducers: {
    addInvoiceStatus: (state, action) => {
      state.invoiceStatus = action.payload;
    },
    addInvoiceAge: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.invoiceAge = action.payload; // Directly set the array if payload is an array
      } else if (!state.invoiceAge.includes(action.payload)) {
        state.invoiceAge.push(action.payload); // Add a single value
      }
    },
    addSalesPerson: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.salesPerson = action.payload; // Directly set the array if payload is an array
      } else if (!state.salesPerson.includes(action.payload)) {
        state.salesPerson.push(action.payload); // Add a single value
      }
    },
  },
});
export const { addInvoiceAge, addInvoiceStatus, addSalesPerson } =
  ReportSlice.actions;
export default ReportSlice.reducer;
