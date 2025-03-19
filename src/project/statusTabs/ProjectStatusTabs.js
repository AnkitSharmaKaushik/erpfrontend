import React from "react";
import Button from "../../Atom/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addActiveTab } from "../../../utils/slices/projectSlice";

const ProjectStatusTabs = ({ className }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);
  const { projects, projectsWithoutAnyFilter, activeTab } = useSelector(
    (store) => store.projectData
  );

  const handleActiveTab = (e, index) => {
    dispatch(addActiveTab(e.target.value));
  };

  const buttonName = [
    `All (${projectsWithoutAnyFilter.length})`,
    ...[
      "Project Initiated",
      "To Be Started",
      "In Progress",
      "On Hold",
      "Completed",
      "CBR Raised",
    ].map(
      (status) =>
        `${status} (${
          projectsWithoutAnyFilter.filter((item) => item?.status === status)
            .length
        })`
    ),
  ];

  const buttonValue = [
    "all",
    "Project Initiated",
    "To Be Started",
    "In Progress",
    "On Hold",
    "Completed",
    "CBR Raised",
  ];

  return (
    <div className={className}>
      <div
        className={`${
          darkMode ? "bg-black text-white" : ""
        } relative flex overflow-x-auto no-scrollbar`}
      >
        <div className="flex flex-nowrap">
          {buttonName.map((item, index) => (
            <Button
              key={index}
              name={item}
              value={buttonValue[index]}
              className={`${
                activeTab == buttonValue[index]
                  ? "text-white bg-green-400"
                  : darkMode
                  ? "text-gray-400 hover:text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              } px-2 py-2 focus:outline-none transition-all duration-500 text-sm mr-2 bg-gray-100 rounded-md filterTabsButton`}
              onClick={(e) => handleActiveTab(e, index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectStatusTabs;
