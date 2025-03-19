import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdAddTask } from "react-icons/md";
import { useSelector } from "react-redux";
import ProjectStatusTabs from "../project/statusTabs/ProjectStatusTabs.js";
import OpenNotification from "../notification/OpenNotificationDetails.js";
import ProjectNameAndFilter from "../project/filter/ProjectNameAndFilter.js";
import Popup from "../Atom/Popup.js";
import MainTable from "./MainTable.js";
import FilterProject from "../project/filter/FilterProject.js";
import Tooltip from "../components/Tooltip.js";
import Button from "../Atom/Button.js";
import { canShowAddProjectButton } from "../config/allowRole/canShowAddProjectButton.js";
import SelectedRow from "../project/tableRowSelected/SelectedRow.js";
import { AddManDays } from "../operation/addManDays/AddManDays.js";
import AssignedProject from "../operation/projectAssignment/AssignedProject.js";

const ProjectDataTable = () => {
  const { isViewNotification } = useSelector((store) => store.notification);
  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);
  const { isDrawerOpen } = useSelector((store) => store.dataTable);

  const [multiEditFieldOpen, setMultiEditFieldOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  return (
    <div className={`${darkMode ? "bg-black" : ""} rounded-md mt-12 shadow-lg`}>
      <div className="w-full">
        <div
          className={`${
            isDrawerOpen ? "opacity-30 relative overflow-hidden" : "opacity-100"
          }`}
        >
          <ProjectNameAndFilter
            ProjectHeading={"All Project Details"}
            NoProjectHeading={"No Project Found"}
          />
          <div className="">
            <div className="relative">
              <div className="relative w-full flex justify-between">
                <div className="">
                  <ProjectStatusTabs
                    className={
                      "absolute top-[10px] overflow-x-auto w-2/3 left-0 z-10 no-scrollbar"
                    }
                  />
                </div>
                <div className="my-2">
                  {canShowAddProjectButton() && (
                    <Link to={"/entry-page"}>
                      <Button
                        name={
                          <Tooltip text="Add New Project" position="bottom">
                            <MdAddTask className="text-white text-2xl" />
                          </Tooltip>
                        }
                        className={`${
                          darkMode
                            ? "bg-black text-white border-white"
                            : " border-black"
                        } p-[5px] border border-gray-200 bg-green-600 rounded-sm text-sm flex items-center justify-around text-blue-400 absolute right-11 -top-[34px] z-20 hover:scale-110`}
                      />
                    </Link>
                  )}
                  <FilterProject />
                </div>
              </div>
              <SelectedRow
                setDrawerContent={setDrawerContent}
                setMultiEditFieldOpen={setMultiEditFieldOpen}
              />
              <div className="w-full tableClass" id="tableClass">
                <MainTable />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[66%]">
          {multiEditFieldOpen && drawerContent === "AddManDays" && (
            <AddManDays setMultiEditFieldOpen={setMultiEditFieldOpen} />
          )}
          {multiEditFieldOpen && drawerContent === "AssignProject" && (
            <AssignedProject setMultiEditFieldOpen={setMultiEditFieldOpen} />
          )}
          {isViewNotification && (
            <Popup>
              <OpenNotification />
            </Popup>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDataTable;
