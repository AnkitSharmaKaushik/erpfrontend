import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Label from "../../../Atom/Label";
import Dropdown from "../../../components/DropDown";
import { GetProjectManager } from "../../../fetchApis/projectManager/projectManager";
import { addFormData } from "../../../../utils/slices/projectEntryFormSlice";
import { addProjectManager } from "../../../../utils/slices/projectSlice";

const ProjectManager = () => {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.projectEntryForm.form);
  const { projectManager } = useSelector((store) => store.projectData);
  const [selectedManager, setSelectedManager] = useState();

  useEffect(() => {
    const FetchProjectManager = async () => {
      const projectManager = await GetProjectManager();
      const operationDepartmentManager = projectManager?.data?.filter(
        (item) => {
          return item?.department?.id == 2;
        }
      );
      dispatch(addProjectManager(operationDepartmentManager));
    };
    FetchProjectManager();
  }, [dispatch]);

  const SelectOptionHandler = (name, value) => {
    if (value === "-- Select Manager --") {
      dispatch(addFormData({ [name]: "" }));
      return;
    }
    const currentManager = projectManager.find(
      (item) => item?.user?.name === value
    );
    setSelectedManager(currentManager);
    if (currentManager) {
      dispatch(addFormData({ [name]: currentManager?.user?.id }));
    }
  };

  return (
    <div className="pt-2 mt-2">
      <Label labelName={"Manager  "} className={"pt-2 pb-2 pl-1"} />
      <Dropdown
        name={"project_manager"}
        className={
          "p-[10px] outline-none cursor-pointer w-[100%] bg-[#f3eded] border rounded-md"
        }
        Option_Name={[
          "-- Select Manager --",
          ...projectManager.map((item) => item?.user_role?.name),
        ]}
        RequireAddButton={false}
        required
        onChange={SelectOptionHandler}
        id={"project_manager"}
        selectedOption={
          selectedManager?.user_role?.name || "-- Select Manager --"
        }
      />
    </div>
  );
};

export default ProjectManager;
