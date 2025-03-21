import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  abrProjectsData: [],
  cbrProjectsData: [],
  exportProjects: [],
  abrActiveTabs: "Advanced Billing Raised",
  cbrActiveTabs: "CBR Raised",
  isCreateInvoice: true,
  cbr: {
    raiseCbrData: {},
    raiseVbrData: {},
    createInvoice: {
      companyDetails: {},
      selectedCompanyDetails: {},
    },
  },
};

const financeDepartmentSlice = createSlice({
  name: "financeDepartment",
  initialState,
  reducers: {
    setAbrProjects(state, action) {
      state.abrProjectsData = action.payload;
    },
    setCbrProjects: (state, action) => {
      state.cbrProjectsData = action.payload;
    },
    addExportData: (state, action) => {
      state.exportProjects = action.payload;
    },
    setAbrActiveTabs: (state, action) => {
      state.abrActiveTabs = action.payload;
    },
    setCbrActiveTabs: (state, action) => {
      state.cbrActiveTabs = action.payload;
    },
    toggleIsCreateInvoice: (state) => {
      state.isCreateInvoice = !state.isCreateInvoice;
    },
    addCompanyDetails: (state, action) => {
      state.cbr.createInvoice.companyDetails = action.payload;
    },
    addSelectedCompanyDetails: (state, action) => {
      state.cbr.createInvoice.selectedCompanyDetails = action.payload;
    },
    addRaiseCbrData: (state, action) => {
      const { name, value } = action.payload; // ✅ Destructure payload
      state.cbr.raiseCbrData = {
        ...state.cbr.raiseCbrData,
        [name]: value,
      };
    },
    addRaiseVbrData: (state, action) => {
      const { name, value } = action.payload; // ✅ Destructure payload
      state.cbr.raiseVbrData = {
        ...state.cbr.raiseVbrData,
        [name]: value,
      };
    },
  },
});

export const {
  setAbrProjects,
  setCbrProjects,
  addExportData,
  setAbrActiveTabs,
  setCbrActiveTabs,
  toggleIsCreateInvoice,
  addCompanyDetails,
  addSelectedCompanyDetails,
  addRaiseCbrData,
  addRaiseVbrData,
} = financeDepartmentSlice.actions;
export default financeDepartmentSlice.reducer;
