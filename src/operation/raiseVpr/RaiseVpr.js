import React, { useState } from "react";
import LableAndInput from "../../Molecules/LableAndInput";
import Popup from "../../Atom/Popup";
import { RaiseVprInputFields } from "./RaiseVprInputFields";

const RaiseVpr = () => {
  // { viewRecord, vprData, setVprData, currentProject }
  // const [isAddOtherCost, setIsAddOtherCost] = useState(false);

  const handleAddOtherCost = () => {
    // setIsAddOtherCost(true);
  };

  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold underline pb-4">VPR Data</h3>

      {/* Grid Layout */}
      <div className="grid grid-cols-3 gap-4 border shadow-md rounded-md p-2">
        <RaiseVprInputFields />
      </div>
      {/* {isAddOtherCost && ( */}
        <div className="grid grid-cols-3 gap-4 border shadow-md rounded-md p-2 mt-2">
          <RaiseVprInputFields />
        </div>
      {/* )} */}
      <button
        className="text-xs mt-2 p-1 text-white bg-blue-500 hover:bg-blue-600 rounded-md flex justify-start"
        onClick={handleAddOtherCost}
      >
        Add More Vendor
      </button>
    </div>
  );
};

export default RaiseVpr;
