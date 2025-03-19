import React, { useEffect } from "react";
import AbrTable from "./table/AbrTable";
import FilterProject from "../../project/filter/FilterProject";
import ABRStatusTabs from "../statusTabs/ABRStatusTabs";
import ProjectNameAndFilter from "../../project/filter/ProjectNameAndFilter";
import { useDispatch } from "react-redux";
import { ABRPROJECTLIST } from "../../../utils/constants/urls";
import { getWithAuth } from "../../provider/helper/axios";
import { setAbrProjects } from "../../../utils/slices/financeDepartmentSlice";

const AbrProjectList = () => {
  const dispatch = useDispatch();

  const abrProjectList = async () => {
    const response = await getWithAuth(ABRPROJECTLIST);
    const data = await response?.data;
    dispatch(setAbrProjects(data));
  };

  useEffect(() => {
    abrProjectList();
  }, []);

  return (
    <div>
      <div className="pt-4">
        <ProjectNameAndFilter
          ProjectHeading={"Advance Billing Projects"}
          NoProjectHeading={"No Project Found"}
        />
        <div className="relative w-full flex justify-between">
          <div className="">
            <ABRStatusTabs
              className={
                "absolute top-[10px] overflow-x-auto w-2/3 left-0 z-10 no-scrollbar"
              }
            />
          </div>
          <div className="my-2">
            <FilterProject />
          </div>
        </div>
        <AbrTable />
      </div>
    </div>
  );
};

export default AbrProjectList;
