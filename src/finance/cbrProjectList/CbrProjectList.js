import React, { useEffect } from "react";
import FilterProject from "../../project/filter/FilterProject";
import ProjectNameAndFilter from "../../project/filter/ProjectNameAndFilter";
import { useDispatch } from "react-redux";
import { CBR_PROJECT_LIST } from "../../../utils/constants/urls";
import { getWithAuth } from "../../provider/helper/axios";
import CBRStatusTabs from "../statusTabs/CBRStatusTabs";
import CbrTable from "./table/CbrTable";
import { setCbrProjects } from "../../../utils/slices/financeDepartmentSlice";

const CbrProjectList = () => {
  const dispatch = useDispatch();

  const cbrProjectList = async () => {
    const response = await getWithAuth(CBR_PROJECT_LIST);
    const data = await response?.data;
    dispatch(setCbrProjects(data));
  };

  useEffect(() => {
    cbrProjectList();
  }, []);

  return (
    <div>
      <div className="pt-4">
        <ProjectNameAndFilter
          ProjectHeading={"Client Billing Requisition"}
          NoProjectHeading={"No Project Found"}
        />
        {/* <FilterProject /> */}
        <div className="relative w-full flex justify-between">
          <div className="">
            <CBRStatusTabs
              className={
                "absolute top-[10px] overflow-x-auto w-2/3 left-0 z-10 no-scrollbar"
              }
            />
          </div>
          <div className="my-2">
            <FilterProject />
          </div>
        </div>
        <CbrTable />
      </div>
    </div>
  );
};

export default CbrProjectList;
