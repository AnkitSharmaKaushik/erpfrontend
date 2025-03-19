import React from "react";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addActiveTab } from "../../../utils/slices/projectSlice";

const InProgressProject = ({ projectData }) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch()

  const ProjectInProgress = projectData?.filter(
    (item) => item?.status === "In Progress"
  );
  const handleProjectReport = () => {
    Navigate("/operation-projects");
    dispatch(addActiveTab("In Progress"));
  };

  return (
    <div className="w-1/5 h-40 bg-[#addaec] text-[rgb(0,0,255)] rounded-md m-2 shadow-xl flex flex-col justify-between">
      <h2 className="text-xl font-bold pt-4 pl-4">Inprogress Project</h2>
      <div className="h-24 flex items-center justify-evenly text-xl">
        <span
          className="text-4xl cursor-pointer text-blue-600"
          onClick={handleProjectReport}
        >
          {ProjectInProgress.length}
        </span>
        <PiDotsThreeOutlineLight className="text-4xl " />
      </div>
    </div>
  );
};

export default InProgressProject;
