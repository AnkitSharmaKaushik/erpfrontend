import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleRaiseCbr } from "../../utils/slices/dataTableSlice";

const ViewCbrButton = () => {
  const dispatch = useDispatch();
  const { selectedRecord } = useSelector((store) => store.dataTable);

  const handleViewCBR = (selectedRecord) => {
    // dispatch(toggleRaiseCbr())
    // PostRaiseCBR({ project_code: selectedRecord.project_code });
  };

  // const PostRaiseCBR = async (data) => {
  //   try {
  //     const response = await RaiseCBRPostApi(data);
  //     if (response?.status == true) {
  //       SweetAlert({
  //         title: "CBR has been Raised !!!",
  //         text: "",
  //         icon: "success",
  //       });
  //     } else if (response?.ex?.response?.data?.project_code) {
  //       SweetAlert({
  //         title: "project code : " + response?.ex?.response?.data?.project_code,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching project data:", error);
  //     SweetAlert({
  //       title: "Error",
  //       text: "Error fetching project data:",
  //       error,
  //       icon: "error",
  //     });
  //   }
  // };
  return (
    <div className="flex justify-center items-center">
      {selectedRecord.status === "CBR Raised" && (
        <button
          className="border-black text-left bg-[#bd1d1d] text-white z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
          onClick={() => handleViewCBR(selectedRecord)}
        >
          View CBR
        </button>
      )}
    </div>
  );
};

export default ViewCbrButton;
