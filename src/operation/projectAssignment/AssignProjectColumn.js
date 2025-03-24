import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import MultiSelectDropdown from "../../components/MultiSelectDropdown";
import { useSelector } from "react-redux";
import useGetTeamLeadUnderManager from "../../../utils/hooks/useGetTeamLeadUnderManagers";
import { useDispatch } from "react-redux";
import { addProjectAssignment } from "../../../utils/slices/projectAssignmentSlice";
import { debounce } from "lodash";

export const AssignProjectColumn = () => {
  const dispatch = useDispatch();
  const columnHelper = createColumnHelper();
  const { selectedRow } = useSelector((store) => store.dataTable);
  const { projectAssignmentData } = useSelector(
    (store) => store.projectAssignment
  );

  const userrole = localStorage.getItem("userrole");
  const teamlead = useGetTeamLeadUnderManager(userrole);

  const inputValuesRef = useRef({});

  const handleInputChange = (projectId, field, value) => {
    inputValuesRef.current[projectId] = {
      ...inputValuesRef.current[projectId],
      [field]: value,
    };
    getTransformedData();
  };

  const getTransformedData = useCallback(
    debounce(() => {
      const transformedData = Object.entries(inputValuesRef.current).map(
        ([project_id, data]) => ({
          project_id: Number(project_id),
          ...data,
        })
      );
      dispatch(addProjectAssignment(transformedData));
    }, 1000),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      getTransformedData.cancel();
    };
  }, [getTransformedData]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("project_code", {
        id: "project_code",
        header: "Project Code",
        cell: (info) => info.getValue().toUpperCase(),
      }),
      columnHelper.accessor("clients", {
        id: "clients",
        header: "Client Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: "Project Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("purchase_order_no.", {
        id: "purchase_order_no",
        header: "Purchase Order No.",
        cell: (info) => {
          const row = info.row.original;
          const defaultValue =
            inputValuesRef.current[row.id]?.purchase_order_no ||
            projectAssignmentData.find((item) => item.project_id === row.id)
              ?.purchase_order_no ||
            row?.purchase_order_no;

          return (
            <input
              name="purchase_order_no"
              type="text"
              defaultValue={defaultValue}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none"
              placeholder="Purchase Order No."
              onChange={(e) =>
                handleInputChange(row.id, "purchase_order_no", e.target.value)
              }
              disabled={row?.purchase_order_no}
            />
          );
        },
      }),
      columnHelper.accessor("project_client_pm", {
        id: "project_client_pm",
        header: "Client PM",
        cell: (info) => {
          const row = info.row.original;
          const defaultValue =
            inputValuesRef.current[row.id]?.project_client_pm ||
            projectAssignmentData.find((item) => item.project_id === row.id)
              ?.project_client_pm ||
            row?.project_client_pm;
          return (
            <input
              name="project_client_pm"
              type="text"
              defaultValue={defaultValue}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none"
              placeholder="Client PM"
              onChange={(e) =>
                handleInputChange(row.id, "project_client_pm", e.target.value)
              }
              disabled={row?.project_client_pm}
            />
          );
        },
      }),
      columnHelper.accessor("AssignedTo", {
        id: "AssignedTo",
        header: "Assigned To",
        cell: (info) => {
          const project = info.row.original;
          const projectData = projectAssignmentData.find(
            (item) => item.project_id === project.id
          );

          const assignedTLs = selectedRow
            .filter(
              (item) =>
                item.id === project.id &&
                item.project_assigned_to_teamlead !== "N/A"
            )
            .map((item) => item.project_assigned_to_teamlead);

          const selectedOptions =
            inputValuesRef.current[project.id]?.AssignedTo ||
            projectData?.AssignedTo ||
            [];

          const handleChange = (assignedTo) => {
            handleInputChange(project.id, "AssignedTo", assignedTo);
          };

          return assignedTLs.length > 0 ? (
            <span>{assignedTLs.join(", ")}</span>
          ) : (
            <MultiSelectDropdown
              info={project}
              projectData={projectData}
              selectedOptions={selectedOptions}
              onChange={handleChange}
            />
          );
        },
      }),
    ],
    [projectAssignmentData, selectedRow]
  );

  return columns;
};
