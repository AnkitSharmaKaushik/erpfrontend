import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsEdit } from "../../utils/slices/dataTableSlice";

const ProjectEditButton = () => {
  const dispatch = useDispatch();
  const { selectedRecord } = useSelector((store) => store.dataTable);

  const [updatedValue, setUpdatedValue] = useState({
    project_code: "",
    date: "",
    man_days: "",
    total_achievement: "",
  });

  const HandleOnEdit = (selectedRecord) => {
    dispatch(toggleIsEdit());
    setUpdatedValue({
      ...updatedValue,
      project_code: selectedRecord?.project_code,
      name: selectedRecord?.name,
    });
  };

  return (
    <div className="flex justify-center items-center">
      {selectedRecord.status !== "Project Initiated" &&
        selectedRecord.status !== "Completed" &&
        selectedRecord.status !== "CBR Raised" &&
        selectedRecord.status !== "On Hold" && (
          <button
            className="border-b border-black text-left bg-[#bd1d1d] text-white z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
            onClick={() => {
              HandleOnEdit(selectedRecord);
            }}
          >
            Edit Request
          </button>
        )}
    </div>
  );
};

export default ProjectEditButton;
