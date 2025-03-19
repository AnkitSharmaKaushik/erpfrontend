import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectAssignmentData: [],
};

const projectAssignmentSlice = createSlice({
  name: "projectAssignment",
  initialState,
  reducers: {
    addProjectAssignment: (state, action) => {
      state.projectAssignmentData = action.payload;
    },
  },
});

export const { addProjectAssignment } = projectAssignmentSlice.actions;
export default projectAssignmentSlice.reducer;
