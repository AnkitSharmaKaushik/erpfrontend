import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMultipleSample,
  toggleViewMultipleCpiSample,
} from "../../../utils/slices/addMutipleSampleCpiSlice";

const ViewMultipleSampleCpi = () => {
  const dispatch = useDispatch();
  const multipleSampleCPi = useSelector(
    (store) => store.addMultipleSampleCpi.sampleCpiRecord
  );

  const handleCloseCpiView = () => {
    dispatch(toggleViewMultipleCpiSample(false));
    dispatch(addMultipleSample([]));
  };
  const projectSample = multipleSampleCPi.project_samples;
  return (
    <div className="relative">
      <h2 className="p-1 text-xl font-bold">Multiple Sample Cpi Details</h2>
      <table className="min-w-full bg-white">
        <thead className="bg-[#bd1d1d] text-white">
          <tr>
            <th className="py-3 px-6 text-left">Target Group</th>
            <th className="py-3 px-6 text-left">Sample</th>
            <th className="py-3 px-6 text-left">CPI</th>
          </tr>
        </thead>
        <tbody>
          {projectSample?.map((item, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-100 transition duration-200 ease-in-out"
            >
              <td className="py-3 px-6 text-left">
                {item?.target_group || "N/A"}
              </td>
              <td className="py-3 px-6 text-left">{item?.sample}</td>
              <td className="py-3 px-6 text-left">{item?.cpi}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="cursor-pointer absolute -top-[15px] -right-[15px] p-1 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-150 text-sm"
        onClick={handleCloseCpiView}
      >
        X
      </div>
    </div>
  );
};

export default ViewMultipleSampleCpi;
