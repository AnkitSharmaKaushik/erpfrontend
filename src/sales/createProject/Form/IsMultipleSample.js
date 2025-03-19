import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Label from "../../../Atom/Label";
import { addFormData } from "../../../../utils/slices/projectEntryFormSlice";
import {
  checkedMultipleSampleCpi,
  removeMultipleSample,
  toggleMultipleSampleCpi,
} from "../../../../utils/slices/addMutipleSampleCpiSlice";

const IsMultipleSample = () => {
  const dispatch = useDispatch();
  const isMultipleRecord = useSelector((store) => store.addMultipleSampleCpi);

  const handleCheckBox = () => {
    dispatch(
      checkedMultipleSampleCpi(!isMultipleRecord.isMultipleSampleCheckbox)
    );
    dispatch(toggleMultipleSampleCpi(true));

    if (isMultipleRecord.sampleCpiRecord.length > 1) {
      dispatch(removeMultipleSample());
      dispatch(toggleMultipleSampleCpi(false));
      dispatch(
        addFormData({
          cpi: "",
          project_samples: [],
          is_multiple_sample_cpi: null,
        })
      );
    }
  };

  return (
    <div className="flex items-center pt-2">
      <input
        type="checkbox"
        onChange={handleCheckBox}
        className="text-sm"
        checked={isMultipleRecord.isMultipleSampleCheckbox}
      />
      <Label labelName="Add Multiple Sample" className="text-xs ml-2" />
    </div>
  );
};

export default IsMultipleSample;
