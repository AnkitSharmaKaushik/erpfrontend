import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users:null,
  isLoggedIn:false,
  userRole:{
    isSuperUser : "superUser",
    isDirector : "Director",
    isHod : "HOD",
    isSrManager : "Sr.Manager",
    isManager : "Manager",
    isAssManager : "Ass.Manager",
    isTeamLead : "Team Lead",
    allManagerRoles : ["Sr.Manager", "Ass.Manager", "Manager"]
  },
  department:{
     isSalesDept : 1,
     isOperationDept : 2,
     isFinanceDept : 3,
     isPreSalesDept : 4
  },

 
};
const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    removeUser(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    }, 
  },
});

export const { setUsers, removeUser } = userSlice.actions;

export default userSlice.reducer;
