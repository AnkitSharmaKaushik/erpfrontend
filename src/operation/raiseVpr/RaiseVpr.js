import React, { useState } from "react";
import { RaiseVprInputFields } from "./RaiseVprInputFields";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleIsVprHasData,
  toggleRaiseVpr,
} from "../../../utils/slices/dataTableSlice";

const RaiseVpr = ({ setVprData }) => {
  const dispatch = useDispatch();
  const { selectedRecord } = useSelector((store) => store.dataTable);
  const { projects } = useSelector((store) => store.projectData);

  const currentProject =
    projects.find((item) => item.id === selectedRecord?.id) || {};

  const initialVendorData = {
    project: selectedRecord?.id,
    status: "pending",
    name_of_client: selectedRecord?.clients,
    project_code: selectedRecord?.project_code,
    project_name: selectedRecord?.name,
    vendor_name: "",
    type_of_services: selectedRecord?.project_type,
    invoice_amount: null,
    approved_amount: null,
    name_of_project_manager: currentProject?.assigned_to?.id,
    other_cost: [],
  };

  const [vendorData, setVendorData] = useState([
    { id: 0, data: initialVendorData },
  ]);

  const handleAddOtherCost = () => {
    setVendorData((prev) => [
      ...prev,
      { id: prev.length, data: initialVendorData },
    ]);
  };

  const handleInputChange = (id, updatedData) => {
    setVendorData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, data: { ...item.data, ...updatedData } }
          : item
      )
    );
  };

  const handleSubmit = () => {
    const formattedData = vendorData.map((item) => item.data);
    setVprData(formattedData);
    dispatch(toggleRaiseVpr());
  };

  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold underline pb-4">VPR Data</h3>

      <div className="">
        {vendorData.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg grid grid-cols-2 gap-4"
          >
            <RaiseVprInputFields
              vprData={item.data}
              setVprData={(updatedData) =>
                handleInputChange(item.id, updatedData)
              }
            />
          </div>
        ))}
        <button
          className="text-xs ml-5 p-1 text-white bg-blue-500 hover:bg-blue-600 rounded-md flex justify-start"
          onClick={handleAddOtherCost}
        >
          Add More Vendor
        </button>
      </div>
      <div className="flex justify-center">
        <button
          className="p-2 mr-2 text-white bg-green-500 hover:bg-green-600 rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="p-2 bg-red-400 text-white rounded-md hover:bg-red-500"
          onClick={() => {
            dispatch(toggleRaiseVpr());
            dispatch(toggleIsVprHasData(false));
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RaiseVpr;
