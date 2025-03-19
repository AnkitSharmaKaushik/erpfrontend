import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsUploadSow } from "../../utils/slices/dataTableSlice";

const UpdateSowButton = () => {
  const dispatch = useDispatch();
  const { selectedRecord } = useSelector((store) => store.dataTable);
  const projectData = useSelector((store) => store.projectData.projects);
  const currentProject = projectData
    ?.filter((item) => item?.id == selectedRecord?.id)
    .flatMap((item) => item.documents);

  const HandleSowUpload = () => {
    dispatch(toggleIsUploadSow());
  };
  return (
    <div className="flex justify-center items-center">
      <button
        className="border-b border-black text-left bg-[#bd1d1d] text-white z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
        onClick={() => {
          HandleSowUpload(selectedRecord);
        }}
      >
        {currentProject?.length > 0 ? "Update SOW" : "Upload SOW"}
      </button>
    </div>
  );
};

export default UpdateSowButton;
