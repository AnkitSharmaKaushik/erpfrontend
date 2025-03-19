import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  changeProjectStatus: false,
  isEdit: false,
  isAddManDays: false,
  isView: false,
  selectedRecord: null,
  openDropdownIndex: -1, 
  isViewOptionIndex: null,
  isViewOptionOpen: false,
  selectedIndex: null,
  closeView: false,
  isDrawerOpen: false,
  isMultiEdit: false,
  isUploadSow: false,
  selectedRow: [],
  showSowList: false,
  sowList: [],
  toggledClearRows: false,
  showAddlnFee: false,
  addlnFeeList: [],
  isRaiseCbr:false,
  isRaiseVpr:false,
  
};

const dataTableSlice = createSlice({
  name: "DataTable",
  initialState,
  reducers: {
    toggleChangeProjectStatus(state) {
      state.changeProjectStatus = !state.changeProjectStatus;
    },
    toggleIsEdit(state) {
      state.isEdit = !state.isEdit;
    },
    toggleIsAddManDays(state) {
      state.isAddManDays = !state.isAddManDays;
    },
    toggleIsView(state) {
      state.isView = !state.isView;
    },
    setSelectedRecord(state, action) {
      state.selectedRecord = action.payload;
    },
    setOpenDropdownIndex(state, action) {
      state.openDropdownIndex = action.payload;
    },
    setIsViewOptionIndex(state, action) {
      state.isViewOptionIndex = action.payload;
    },
    toggleIsViewOptionOpen(state) {
      state.isViewOptionOpen = !state.isViewOptionOpen;
    },
    setSelectedIndex(state, action) {
      state.selectedIndex = action.payload;
    },
    toggleCloseView(state) {
      state.closeView = !state.closeView;
    },
    toggleIsDrawerOpen(state) {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    toggleIsMultiEdit(state,action) {
      state.isMultiEdit = action.payload;
    },
    toggleIsUploadSow(state) {
      state.isUploadSow = !state.isUploadSow;
    },
    setSelectedRow(state, action) {
      state.selectedRow = action.payload;
    },
    toggleShowSowList(state) {
      state.showSowList = !state.showSowList;
    },
    setSowList(state, action) {
      state.sowList = action.payload;
    },
    toggleToggledClearRows(state) {
      state.toggledClearRows = !state.toggledClearRows;
    },
    toggleShowAddlnFee(state) {
      state.showAddlnFee = !state.showAddlnFee;
    },
    setAddlnFee(state, action) {
      state.addlnFeeList = action.payload;
    },
    toggleRaiseCbr(state) {
      state.isRaiseCbr = !state.isRaiseCbr;
    },
    toggleRaiseVpr(state) {
      state.isRaiseVpr = !state.isRaiseVpr;
    },
  },
});

export const {
  toggleChangeProjectStatus,
  toggleIsEdit,
  toggleIsAddManDays,
  toggleIsView,
  setSelectedRecord,
  setOpenDropdownIndex,
  setIsViewOptionIndex,
  toggleIsViewOptionOpen,
  setSelectedIndex,
  toggleCloseView,
  toggleIsDrawerOpen,
  toggleIsMultiEdit,
  toggleIsUploadSow,
  setSelectedRow,
  toggleShowSowList,
  setSowList,
  toggleToggledClearRows,
  toggleShowAddlnFee,
  setAddlnFee,
  toggleRaiseCbr,
  toggleRaiseVpr
} = dataTableSlice.actions;

export default dataTableSlice.reducer;
