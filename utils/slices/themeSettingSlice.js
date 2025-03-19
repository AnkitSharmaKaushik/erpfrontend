import { createSlice } from "@reduxjs/toolkit";

const themeSetting = createSlice({
    name:"themeSetting",
    initialState:{
        isDarkMode:false,
        isSidebarOpen:false,
    },
    reducers :{
        toggleDarkMode:(state,action)=>{
            state.isDarkMode = !state.isDarkMode
        },
        toggleSideBar:(state,action)=>{
            state.isSidebarOpen = !state.isSidebarOpen
        }
    }
})

export const {toggleDarkMode,toggleSideBar} = themeSetting.actions
export default themeSetting.reducer