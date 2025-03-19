import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewProjectDetailsButton = () => {
  const { selectedRecord } = useSelector((store) => store.dataTable);
  const navigate = useNavigate()

  const handleViewProject = () => {
    navigate("/view-project-details", { state: selectedRecord });
  };
  return (
    <div className="flex justify-center items-center">
      <button
        className="border-b border-black text-left bg-[#bd1d1d] text-white z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
        onClick={handleViewProject}
      >
        View
      </button>
    </div>
  );
};

export default ViewProjectDetailsButton;