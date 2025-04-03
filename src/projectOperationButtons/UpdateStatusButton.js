import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleChangeProjectStatus } from "../../utils/slices/dataTableSlice";

const UpdateStatusButton = () => {
  const dispatch = useDispatch();
  const { selectedRecord } = useSelector((store) => store.dataTable);

  const handleStatus = (selectedRecord) => {
    dispatch(toggleChangeProjectStatus());
  };

  return (
    <div className="flex justify-center items-center">
      {selectedRecord.status !== "Completed" &&
        selectedRecord.status !== "CBR Raised" &&
        selectedRecord.status !== "Cancelled" && (
          <button
            className="border-b border-black text-left bg-[#bd1d1d] text-white z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
            onClick={() => handleStatus(selectedRecord)}
          >
            Status Update
          </button>
        )}
    </div>
  );
};

export default UpdateStatusButton;
