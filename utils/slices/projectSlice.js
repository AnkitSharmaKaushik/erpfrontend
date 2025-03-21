import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  filteredProjects: [],
  exportProjects: [],
  projectsWithoutAnyFilter: [],
  isAddClient: false,
  projectType: [
    { id: 1, name: "Demo CATI" },
    { id: 2, name: " Demo CAWI" },
  ],
  projectManager: [
    { id: 1, name: "Demo Manager" },
    { id: 2, name: " Demo Manager" },
  ],
  clients: [
    { id: 1, name: "demo client 1" },
    { id: 2, name: "demo client 2" },
  ],
  page_number: 1,
  page_size: 30,
  totalRows: null,
  // activeTab: "all",
  activeTab: "Completed",
  selectedAssignedTeamLead: [],
};

const projectSlice = createSlice({
  name: "projectData",
  initialState,
  reducers: {
    setProjects(state, action) {
      state.projects = action.payload;
    },
    addFilterProjectData: (state, action) => {
      state.filteredProjects = action.payload;
    },
    addExportData: (state, action) => {
      state.items = action.payload;
    },
    addProjectWithoutAnyFilter: (state, action) => {
      state.projectsWithoutAnyFilter = action.payload;
    },
    removeProject(state, action) {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
    toggleAddClient: (state, action) => {
      state.isAddClient = !state.isAddClient;
    },
    addProjectType(state, action) {
      state.projectType = action.payload;
    },
    addProjectManager(state, action) {
      state.projectManager = action.payload;
    },
    addClientList(state, action) {
      state.clients = action.payload;
    },
    addPageNumber: (state, action) => {
      state.page_number = action.payload;
    },
    addPageSize: (state, action) => {
      state.page_size = action.payload;
    },
    addTotalRows: (state, action) => {
      state.totalRows = action.payload;
    },
    addActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    addAssignedTeamLead: (state, action) => {
      state.selectedAssignedTeamLead = action.payload;
    },
  },
});

export const {
  setProjects,
  removeProject,
  addFilterProjectData,
  addExportData,
  addProjectWithoutAnyFilter,
  toggleAddClient,
  addProjectType,
  addProjectManager,
  addClientList,
  addPageNumber,
  addPageSize,
  addTotalRows,
  addActiveTab,
  addAssignedTeamLead,
} = projectSlice.actions;
export default projectSlice.reducer;
