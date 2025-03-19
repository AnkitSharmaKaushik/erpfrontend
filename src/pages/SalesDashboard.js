import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import ProjectDataTable from "../projectTable/ProjectDataTable";

const SalesDashboard = () => {
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [salesDepartment] = useState(false);
  const AddProjectHandler = () => {
    setIsAddProjectOpen(true);
  };
   const darkMode = useSelector((store) => store.themeSetting.isDarkMode);


  return (
    <div>
      <div className="">
        <ProjectDataTable PersonDepartment={salesDepartment} />
      </div>
    </div>
  );
};

export default SalesDashboard;
