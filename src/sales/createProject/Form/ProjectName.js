import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LableAndInput from "../../../Molecules/LableAndInput";
import { addFormData } from "../../../../utils/slices/projectEntryFormSlice";

const ProjectName = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.projectEntryForm.form);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Dispatch only the updated field
    dispatch(addFormData({ [name]: value }));
  };

  return (
    <div>
      <LableAndInput
        labelName={"Project Name"}
        InputName={"name"}
        InputType={"text"}
        inputChange={handleInputChange}
        InputMin_lenght={"1"}
        InputMax_lenght={"50"}
        inputValue={formData.name} // Bind the value from Redux state
        inputClassName={"p-2 border bg-[#f3eded] rounded-md"}
        labelClassName={"pt-2 pb-1"}
      />
    </div>
  );
};

export default ProjectName;
