import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFormData } from "../../../../utils/slices/projectEntryFormSlice";
import LableAndInput from "../../../Molecules/LableAndInput";

const SampleSize = () => {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.projectEntryForm.form);
  const isMultipleSample = useSelector(
    (store) => store.addMultipleSampleCpi.isMultipleSampleCheckbox
  );
  const isMultipleSampleRecord = useSelector(
    (store) => store.addMultipleSampleCpi.sampleCpiRecord
  );
  const [errorMsg, setErrorMsg] = useState();

  const totalSample = isMultipleSampleRecord.reduce((acc, item) => {
    return acc + Number(item.sample);
  }, 0);

  useEffect(() => {
    if (isMultipleSample) {
      dispatch(addFormData({ sample: totalSample || 0 }));
    }
  }, [totalSample, isMultipleSample, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (/^\d*$/.test(value)) {
      dispatch(addFormData({ [name]: value }));
      setErrorMsg(null);
    } else {
      setErrorMsg("Sample value can't be in decimal");
    }
  };

  return (
    <div>
      {!isMultipleSample ? (
        <LableAndInput
          labelName={"Sample"}
          InputName={"sample"}
          InputType={"number"}
          inputChange={handleInputChange}
          inputClassName={"p-2 border bg-[#f3eded] rounded-md"}
          labelClassName={"pb-2"}
          min={0}
          inputValue={formData?.sample || ""}
        />
      ) : (
        <LableAndInput
          labelName={"Sample"}
          InputName={"sample"}
          InputType={"number"}
          inputChange={handleInputChange}
          inputClassName={"p-2 border bg-[#f3eded] rounded-md"}
          labelClassName={"pb-2"}
          min={0}
          disabled
          inputValue={formData?.sample || 0}
        />
      )}
      {errorMsg && <p className="text-red-500 text-xs p-1">{errorMsg}</p>}
    </div>
  );
};

export default SampleSize;
