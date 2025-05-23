import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddlnFee,
  toggleShowAddlnFee,
} from "../../../utils/slices/dataTableSlice";

const ViewAddlnFee = () => {
  const dispatch = useDispatch();
  const { addlnFeeList } = useSelector((store) => store.dataTable);

  const handleCloseAddlnFee = () => {
    dispatch(toggleShowAddlnFee());
    dispatch(setAddlnFee());
  };
  return (
    <div className="relative p-4">
      <h2 className="p-2 m-2 text-xl font-bold">Additional Fee Details</h2>
      <table className="min-w-full bg-white ">
        <thead className="bg-[#bd1d1d] text-white">
          <tr>
            <th className="py-3 px-6 text-left">Setup Fee</th>
            <th className="py-3 px-6 text-left">Other Fee</th>
            <th className="py-3 px-6 text-left">Translation Fee</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-100 transition duration-200 ease-in-out">
            <td className="py-3 px-6 text-left">
              {addlnFeeList?.setupFee || 0}
            </td>
            <td className="py-3 px-6 text-left">
              {addlnFeeList?.otherFee || 0}
            </td>
            <td className="py-3 px-6 text-left">
              {addlnFeeList?.translationFee || 0}
            </td>
          </tr>
        </tbody>
      </table>
      <div
        className="cursor-pointer absolute -top-[15px] -right-[15px] p-1 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-150 text-sm"
        onClick={handleCloseAddlnFee}
      >
        X
      </div>
    </div>
  );
};

export default ViewAddlnFee;
