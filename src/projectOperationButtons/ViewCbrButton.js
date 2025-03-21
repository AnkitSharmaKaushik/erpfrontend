import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleViewCbr } from "../../utils/slices/dataTableSlice";

const ViewCbrButton = () => {
  const { selectedRecord } = useSelector((store) => store.dataTable);
  const dispatch = useDispatch();

  const handleViewCBR = () => {
    dispatch(toggleViewCbr());
  };
  return (
    <div className="flex justify-center items-center">
      {selectedRecord.status === "CBR Raised" && (
        <button
          className="border-black text-left bg-[#bd1d1d] text-white z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
          onClick={handleViewCBR}
        >
          View CBR
        </button>
      )}
    </div>
  );
};

export default ViewCbrButton;
