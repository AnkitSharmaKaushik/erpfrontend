import React, { useMemo } from "react";
import { TbTableExport } from "react-icons/tb";
import Tooltip from "../../components/Tooltip";
import { useSelector } from "react-redux";
import ExportCSV from "../exportProjectData/ExportExcel";
import { useExportData } from "../../../utils/hooks/useExportData";

const ProjectNameAndFilter = ({ ProjectHeading, NoProjectHeading }) => {
  const { projects, projectsWithoutAnyFilter } = useSelector(
    (store) => store.projectData
  );
  const dataForExport = useMemo(
    () => useExportData(projectsWithoutAnyFilter),
    [projectsWithoutAnyFilter]
  );
  return (
    <div className="sm:flex items-center justify-between w-full min-[320px]:block pr-2">
      <div className="sm:w-4/12 min-[320px]:w-full">
        <h2 className="text-2xl text-TextBlue">
          {projects?.length > 0 ? ProjectHeading : NoProjectHeading}
        </h2>
      </div>
      <div className="flex items-center justify-end sm:w-8/12 min-[320px]:w-full">
        <Tooltip text="Exports" position="bottom">
          <ExportCSV
            data={dataForExport}
            name={<TbTableExport className="text-xl" />}
            className={
              "p-1.5 border border-gray-200 bg-gray-100 rounded-sm text-sm flex items-center justify-around text-blue-400 ml-1 hover:scale-110"
            }
            downloadName={"Project_List.csv"}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default ProjectNameAndFilter;
