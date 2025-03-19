import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchProjectType } from "../../../fetchApis/projects/projectType/ProjectTypeList";
import { addFormData } from "../../../../utils/slices/projectEntryFormSlice";
import Label from "../../../Atom/Label";
import Dropdown from "../../../components/DropDown";
import { addProjectType } from "../../../../utils/slices/projectSlice";

const ProjectTypeComponent = () => {
  const projectTypeData = useSelector((store) => store.projectData.projectType);
  const formData = useSelector((store) => store.projectEntryForm.form);
  const dispatch = useDispatch();

  useEffect(() => {
    const FetchProjectManager = async () => {
      const type = await FetchProjectType();
      dispatch(addProjectType(type));
    };
    FetchProjectManager();
  }, [dispatch]);

  const SelectOptionHandler = (name, value) => {
    if (value === "-- Select Project Type --") {
      dispatch(addFormData({ [name]: "" }));
      return;
    }
    const selectedType = projectTypeData.find((item) => item?.name === value);
    if (selectedType) {
      dispatch(addFormData({ [name]: selectedType?.id }));
    }
  };

  return (
    <div className="pt-2">
      <Label labelName={"Project Type"} className={"pt-2 pb-1 pl-1"} required />
      <Dropdown
        name={"project_type"}
        className={
          "p-[9px] outline-none cursor-pointer w-[100%] bg-[#f3eded] border rounded-md"
        }
        Option_Name={[
          "-- Select Project Type --",
          ...projectTypeData.map((item) => item?.name),
        ]}
        RequireAddButton={false}
        required
        onChange={SelectOptionHandler}
        id={"project_type"}
        selectedOption={
          projectTypeData?.find((item) => item.id == formData.project_type)
            ?.name || "-- Select Project Type --"
        }
      />
    </div>
  );
};

export default ProjectTypeComponent;
