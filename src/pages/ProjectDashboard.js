import React, { useEffect, useState } from "react";
import Revenue from "../dashboardData/Revenue";
import ProjectTypeChart from "../dashboardData/ProjectTypeChart";
import AMWiseReport from "../dashboardData/AMWiseReport";
import ClientWiseRPE from "../dashboardData/ClientWiseRPE";
import { useDispatch, useSelector } from "react-redux";
import ReportDashBoardTopCard from "../dashboard/ReportDashBoardTopCard";
import ProjectStatusReport from "../dashboardData/ProjectStatusReport";
import TLWiseReport from "../dashboardData/TLWiseReport";
import PerdayReport from "../dashboardData/PerdayReport";
import SalesReport from "../dashboardData/SalesReport";
import FilterProject from "../project/filter/FilterProject";
import ProjectNameAndFilter from "../project/filter/ProjectNameAndFilter";
import { getDashboardProject } from "../fetchApis/dashboard";
import { addProjectWithoutAnyFilter } from "../../utils/slices/projectSlice";
import CanUserView from "../config/allowDashboardView/allowUserCanAccess/CanUserView";
import { canViewPerDayReport } from "../config/allowDashboardView/allowRole/canViewPerDayReport";
import { canViewSalesReport } from "../config/allowDashboardView/allowRole/canViewSalesReport";

const ProjectDashboard = () => {
  const { projectsWithoutAnyFilter } = useSelector(
    (store) => store.projectData
  );
  const dispatch = useDispatch();
  const [projectData, setProjectData] = useState([]);
  const [actualprojectData, setActulaProjectData] = useState([]);
  const [projectType, setProjectType] = useState([]);
  const [filteredData, setFilteredData] = useState([projectData]);
  const [projectStatus, setProjectStatus] = useState([]);
  const [clientInduvisualShow, setClientInduvisualShow] = useState(false);
  const [clientName, setClientName] = useState();

  const userList = useSelector((store) => store.userData.users);

  const dashboardProjects = async () => {
    const response = await getDashboardProject();
    if (response.length > 0) {
      dispatch(addProjectWithoutAnyFilter(response));
    }
  };

  useEffect(() => {
    dashboardProjects();
  }, []);

  useEffect(() => {
    setProjectData(projectsWithoutAnyFilter);
    setActulaProjectData(projectsWithoutAnyFilter);
  }, [projectsWithoutAnyFilter]);

  useEffect(() => {
    if (projectStatus.length > 0) {
      const statusWiseFilter = filteredData.filter((item) => {
        return item.status === projectStatus[0]?.label;
      });
      setProjectData(statusWiseFilter);
    } else {
      setProjectData(actualprojectData);
    }
  }, [projectStatus]);

  // if(projectsWithoutAnyFilter.length === 0){
  //   return <h1>No Project Found!!</h1>
  // }

  return (
    <div className="mt-4 relative">
      <ProjectNameAndFilter
        data={projectData}
        ProjectHeading={"ERP Dashborad"}
        NoProjectHeading={"ERP Dashborad"}
      />
      <div className="flex justify-end mr-2 mt-2">
        <FilterProject />
      </div>

      <div>
        <ReportDashBoardTopCard projectData={projectData} />
      </div>
      {projectsWithoutAnyFilter.length !== 0 && (
        <div className="grid gap-4 p-4 relative grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          <div className="absolute top-1 left-0 flex space-x-2">
            {projectType.length > 0 && (
              <p className="border bg-gray-300 px-2 py-1 rounded text-xs">
                {projectType}
                <span
                  className="p-1 cursor-pointer"
                  onClick={() => setProjectType([])}
                >
                  X
                </span>
              </p>
            )}
            {projectStatus.length > 0 && (
              <p className="border bg-gray-300 px-2 py-1 rounded text-xs">
                {projectStatus}
                <span
                  className="p-1 cursor-pointer"
                  onClick={() => setProjectStatus([])}
                >
                  X
                </span>
              </p>
            )}
            {projectType.length > 0 && projectStatus.length > 0 && (
              <p className="border bg-gray-300 px-2 py-1 rounded text-xs">
                Clear All
                <span
                  className="p-1 cursor-pointer"
                  onClick={() => {
                    setProjectType([]);
                    setProjectStatus([]);
                  }}
                >
                  X
                </span>
              </p>
            )}
          </div>

          {/* Charts */}
          <div className="p-4 bg-white rounded-md shadow-lg">
            <h3 className="text-xl">All Project Type</h3>
            <ProjectTypeChart
              projectData={projectData}
              projectType={projectType}
              setProjectType={setProjectType}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
              setProjectStatus={setProjectStatus}
            />
          </div>
          <div className="p-4 bg-white rounded-md shadow-lg">
            <h3 className="text-xl">All Project Status</h3>
            <ProjectStatusReport
              projectData={projectData}
              projectType={projectType}
              setProjectType={setProjectType}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
              setProjectStatus={setProjectStatus}
            />
          </div>
          <div className="p-4 bg-white rounded-md shadow-lg">
            <h3 className="text-xl">Revenue</h3>
            <Revenue
              projectData={projectData}
              projectType={projectType}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
              projectStatus={projectStatus}
              setProjectStatus={setProjectStatus}
            />
          </div>

          <div className="p-4 bg-white rounded-md shadow-lg overflow-y-scroll">
            <ClientWiseRPE
              projectData={projectData}
              userList={userList}
              projectType={projectType}
              setProjectType={setProjectType}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
              setProjectStatus={setProjectStatus}
              setClientInduvisualShow={setClientInduvisualShow}
              setClientName={setClientName}
            />
          </div>
          <div className="p-4 bg-white rounded-md shadow-lg overflow-y-scroll">
            <AMWiseReport
              projectData={projectData}
              userList={userList}
              projectType={projectType}
              setProjectType={setProjectType}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
              setProjectStatus={setProjectStatus}
            />
          </div>
          <div className="p-4 bg-white rounded-md shadow-lg overflow-y-scroll">
            <TLWiseReport
              projectData={projectData}
              userList={userList}
              projectType={projectType}
              setProjectType={setProjectType}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
              setProjectStatus={setProjectStatus}
            />
          </div>
          <CanUserView
            element={
              <SalesReport
                projectData={projectData}
                userList={userList}
                projectType={projectType}
                setProjectType={setProjectType}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
                setProjectStatus={setProjectStatus}
              />
            }
            allowedRoles={canViewSalesReport.role}
            allowDepartments={canViewSalesReport.department}
          />

          <div className="p-4 bg-white rounded-md shadow-lg overflow-y-scroll col-span-full">
            <CanUserView
              element={
                <PerdayReport
                  projectData={projectData}
                  userList={userList}
                  projectType={projectType}
                  setProjectType={setProjectType}
                  filteredData={filteredData}
                  setFilteredData={setFilteredData}
                  setProjectStatus={setProjectStatus}
                />
              }
              allowedRoles={canViewPerDayReport.role}
              allowDepartments={canViewPerDayReport.department}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDashboard;
