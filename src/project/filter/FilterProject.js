import React, { useEffect, useState } from "react";
import Input from "../../Atom/InputField.js";
import DateRangeFilter from "../../components/DateRangeFilter.js";
import { IoFilter } from "react-icons/io5";
import FilterDrawer from "./FilterDrawer.js";
import useClientList from "../../../utils/hooks/useClientList.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addSearchText,
  toggleIsOpenFilterDrawer,
} from "../../../utils/slices/filterSlice.js";
import { setProjects } from "../../../utils/slices/projectSlice.js";

const FilterProject = () => {
  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);
  const { projects } = useSelector((store) => store.projectData);
  const { selectedOptions, openFilterDrawer, filterOption } = useSelector(
    (store) => store.filterSlice
  );
  const dispatch = useDispatch();
  useClientList();

  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [originalProjects, setOriginalProjects] = useState([]);

  useEffect(() => {
    if (projects?.length > 0 && originalProjects.length === 0) {
      setOriginalProjects([...projects]);
    }
  }, [projects]);

  useEffect(() => {
    let filteredData =
      originalProjects?.length > 0 ? [...originalProjects] : [];

    if (filterOption.dateRange.startDate && filterOption.dateRange.endDate) {
      filteredData = filteredData.filter((item) => {
        const projectStartDate = new Date(item?.tentative_start_date);
        const projectEndDate = new Date(item?.tentative_end_date);

        const startDate = new Date(filterOption.dateRange.startDate);
        const endDate = new Date(filterOption.dateRange.endDate);
        return projectStartDate >= startDate && projectEndDate <= endDate;
      });
      dispatch(setProjects(filteredData));
    } else {
      dispatch(setProjects(originalProjects));
    }
  }, [filterOption.dateRange, originalProjects]);

  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center">
        <div className="text-right mr-2">
          <Input
            type="text"
            placeholder="Search..."
            value={filterOption.searchText}
            onChange={(e) => dispatch(addSearchText(e.target.value))}
            className={`${
              darkMode && "bg-black border-white"
            } p-1 border-b border-blue-400 !rounded-none w-8/12 focus:outline-none text-blue-400 text-sm"`}
            id={"search"}
          />
          {filterOption.searchText !== "" && (
            <button
              onClick={() => {
                dispatch(addSearchText(""));
              }}
              className="p-1 text-xs text-red-300 rounded-md"
            >
              X
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />
      </div>
      {/* <div className="flex items-center">
        <button
          className="p-2 border border-gray-200 bg-gray-100 rounded-sm text-sm flex items-center text-blue-400"
          onClick={() => {
            dispatch(toggleIsOpenFilterDrawer());
          }}
        >
          <IoFilter className="mr-2" />
          Filter
        </button>
      </div> */}
      <div className="flex items-center">
        <button
          className="p-1 border border-gray-200 bg-gray-100 rounded-sm 
               text-[clamp(0.5rem, 0.9vw, 0.625rem)] flex items-center 
               text-blue-400 cursor-pointer gap-1"
          onClick={() => {
            dispatch(toggleIsOpenFilterDrawer());
          }}
        >
          {/* Icon scales with text */}
          <IoFilter className="w-[clamp(0.5rem, 1.2vw, 0.8rem)] h-[clamp(0.75rem, 1.2vw, 1rem)]" />
          Filter
        </button>
      </div>

      {openFilterDrawer && <FilterDrawer />}
    </div>
  );
};

export default FilterProject;
