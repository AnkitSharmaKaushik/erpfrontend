import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Label from "../../../Atom/Label";
import Input from "../../../Atom/InputField";
import { addFormData } from "../../../../utils/slices/projectEntryFormSlice";

const TranslationCost = () => {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.projectEntryForm.form);
  const [errorMsg, setErrorMsg] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(addFormData({ [name]: value }));
    e.preventDefault();
    if (/^\d*$/.test(value)) {
      dispatch(addFormData({ [name]: value }));
      setErrorMsg();
    } else {
      setErrorMsg(`'Transaction fee value can't be in decimal'`);
    }
  };
  return (
    <div className="flex flex-col w-full">
      <Label labelName={"Translator Cost"} className={"pt-4 pb-2"} />
      <div className="flex w-full">
        <div className="w-full inline-block">
          <Input
            name={"transaction_fee"}
            type={"number"}
            onChange={handleInputChange}
            className={"p-2 border bg-[#f3eded] w-full rounded-md"}
            min={0}
            value={formData.transaction_fee}
          />
          {errorMsg && <p className="text-red-500 text-xs p-1">{errorMsg}</p>}
        </div>
      </div>
    </div>
  );
};

export default TranslationCost;
