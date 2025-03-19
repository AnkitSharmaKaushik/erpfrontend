import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  hods: [],
  srManagers: [],
  Managers: [],
  assManagers: [],
  Teamlead: [],
};
const SelectedUserSlice = createSlice({
  name: "SelectedUserFilter",
  initialState,
  reducers: {
    addSelectedHod(state, action) {
      state.hods.push(action.payload);
    },
    removeSelectedHod(state, action) {
      state.hods.pop(action.payload);
    },
    addSelectedSrManager(state, action) {
      state.srManagers.push(action.payload);
    },
    removeSelectedSrManager(state, action) {
      state.srManagers.pop(action.payload);
    },
    addSelectedManager(state, action) {
      state.Managers.push(action.payload);
    },
    removeSelectedManager(state, action) {
      state.Managers.pop(action.payload);
    },
    addSelectedAssManager(state, action) {
      state.assManagers.push(action.payload);
    },
    removeSelectedAssManager(state, action) {
      state.assManagers.pop(action.payload);
    },
    addSelectedTeamlead(state, action) {
      state.Teamlead.push(action.payload);
    },
    removeSelectedTeamlead(state, action) {
      state.Teamlead.pop(action.payload);
    },
  },
});
export const {
  addSelectedHod,
  removeSelectedHod,
  addSelectedManager,
  removeSelectedManager,
  addSelectedSrManager,
  removeSelectedSrManager,
  addSelectedAssManager,
  removeSelectedAssManager,
  addSelectedTeamlead,
  removeSelectedTeamlead,
} = SelectedUserSlice.actions;
export default SelectedUserSlice.reducer;
