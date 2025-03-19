import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Label from "../../../Atom/Label";
import MultipleFileUpload from "../../../components/MultipleFileUpload";
import { addFormData } from "../../../../utils/slices/projectEntryFormSlice";

const SowFileUpload = () => {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.projectEntryForm.form);

  const handleInputChange = (e) => {
    const { name, files } = e.target;
    const newFiles = Array.from(files);
    const updatedFiles = [...formData.upload_document, ...newFiles];
    dispatch(addFormData({ [name]: updatedFiles }));
  };

  return (
    <div className="pt-2">
      <Label labelName={"SOW File"} className={"pt-2 pb-2 pl-1"} />
      <MultipleFileUpload
        name={"upload_document"}
        handleFileChange={handleInputChange}
        className={"p-1 border bg-[#f3eded] w-full rounded-md"}
      />
    </div>
  );
};

export default SowFileUpload;
