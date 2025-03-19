import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Label from "../../../Atom/Label";
import MultipleValueDropDown from "../../../components/MultipleValueDropDown";
import Button from "../../../Atom/Button";
import {
  addOtherCost,
  addTranslationCost,
} from "../../../../utils/slices/projectEntryFormSlice";

const AddOtherCost = () => {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.projectEntryForm.form);

  const [selectedFees, setSelectedFees] = useState([]);

  const handleFeeSelection = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    const updatedFees = [...new Set([...selectedFees, ...selectedValues])];
    setSelectedFees(updatedFees);

    // Update Redux state based on selected values
    dispatch(addOtherCost(updatedFees.includes("other_cost")));
    dispatch(addTranslationCost(updatedFees.includes("transaction_fee")));
  };

  const handleClose = () => {
    dispatch(addOtherCost()); // Reset 'Other Cost' when closing
    dispatch(addTranslationCost()); // Reset 'Translation Cost' when closing
  };

  return (
    <div className="bg-white flex justify-center text-center h-52 relative">
      <div className="relative w-1/2">
        <Label labelName={"Add Other Cost"} className={"pt-4 pb-2"} />
        <MultipleValueDropDown
          options={[
            { value: "other_cost", label: "Other Cost" },
            { value: "transaction_fee", label: "Translation Cost" },
          ]}
          onChange={handleFeeSelection}
          className={"w-full bg-[#f3eded] rounded-md mt-2"}
        />
      </div>
      <Button
        name={"X"}
        className={
          "bg-red-400 p-2 w-8 h-8 rounded-md absolute top-0 right-0 flex items-center justify-center text-white"
        }
        onClick={handleClose}
      />
    </div>
  );
};

export default AddOtherCost;
