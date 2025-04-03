import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsAddManDays } from "../../utils/slices/dataTableSlice";

const AddManDaysButton = () => {
  const dispatch = useDispatch();
  const { selectedRecord } = useSelector((store) => store.dataTable);

  const endDateStr = selectedRecord.tentative_end_date;
  const endDate = new Date(endDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  const DateValidate = today <= endDate;

  const HandleAddManDays = () => {
    dispatch(toggleIsAddManDays());
  };
  return (
    <div className="flex justify-center items-center">
      {selectedRecord.status !== "Project Initiated" &&
        selectedRecord.status !== "Completed" &&
        selectedRecord.status !== "CBR Raised" &&
        selectedRecord.status !== "On Hold" &&
        selectedRecord.status !== "Cancelled" &&
        DateValidate == true && (
          <button
            className="border-b border-black text-left bg-[#bd1d1d] text-white z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
            onClick={HandleAddManDays}
          >
            Add Mandays
          </button>
        )}
    </div>
  );
};

export default AddManDaysButton;
