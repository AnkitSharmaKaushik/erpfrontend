import { createColumnHelper } from "@tanstack/react-table";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "../../components/DropDown";
import { debounce } from "lodash";
import { setMultipleManDays } from "../../../utils/slices/addMultipleManDaysSlice";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const AddManDaysColumn = () => {
  const { MultipleManDays } = useSelector((store) => store.MultipleManDays);
  const { selectedRow } = useSelector((store) => store.dataTable);
  const dispatch = useDispatch();
  const inputValuesRef = useRef({});
  const multipleManDaysRef = useRef(MultipleManDays);

  useEffect(() => {
    multipleManDaysRef.current = MultipleManDays;
  }, [MultipleManDays]);

  const columnHelper = createColumnHelper();

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const getTransformedData = useCallback(
    debounce(() => {
      const transformedData = Object.entries(inputValuesRef.current).map(
        ([project_id, data]) => ({
          project_id: Number(project_id),
          ...data,
        })
      );
      dispatch(setMultipleManDays(transformedData));
    }, 1000),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      getTransformedData.cancel();
    };
  }, [getTransformedData]);

  const handleMandaysData = useCallback((projectId, field, value) => {
    inputValuesRef.current[projectId] = {
      ...inputValuesRef.current[projectId],
      [field]: value,
    };
    getTransformedData();
  }, []);

  const handleStatusChange = useCallback((projectId, status) => {
    handleMandaysData(projectId, "status", status);
  }, []);
  

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
      columnHelper.accessor("sample", {
        id: "Sample",
        header: "Project Sample",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("remaining_interview", {
        id: "Remaining",
        header: "Remaining Target",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Achieved", {
        id: "Achieved",
        header: "Achieved Target",
        cell: (info) => {
          const row = info.row.original;
          const defaultValue =
            inputValuesRef.current[row.id]?.total_achievement ||
            multipleManDaysRef.current.find((item) => item.project_id === row.id)
              ?.total_achievement ||
            "";
          return (
            <input
              className="p-2 border rounded-md w-full"
              type="number"
              maxLength={2}
              defaultValue={defaultValue}
              onChange={(e) =>
                handleMandaysData(row.id, "total_achievement", e.target.value)
              }
              name="total_achievement"
              placeholder="Total Achievements"
              onKeyDown={preventMinus}
            />
          );
        },
      }),
      columnHelper.accessor("Mandays", {
        id: "Mandays",
        header: "Total Mandays",
        cell: (info) => {
          const row = info.row.original;
          const defaultValue =
            inputValuesRef.current[row.id]?.total_man_days ||
            multipleManDaysRef.current.find((item) => item.project_id === row.id)
              ?.total_man_days ||
            "";
          return (
            <input
              className="p-2 border rounded-md w-full"
              type="number"
              maxLength={2}
              defaultValue={defaultValue}
              placeholder="Total ManDays"
              onChange={(e) =>
                handleMandaysData(row.id, "total_man_days", e.target.value)
              }
              name="total_man_days"
              onKeyDown={preventMinus}
            />
          );
        },
      }),
      columnHelper.accessor("Status", {
        id: "Status",
        header: "Status",
        cell: (info) => {
          const project = info.row.original;
          const selectedStatus =
            inputValuesRef.current[project.id]?.status ||
            multipleManDaysRef.current.find((item) => item.project_id === project.id)
              ?.status ||
            "";
      
          return (
            <Dropdown
              name="status"
              Option_Name={["--Select Status--", "In Progress", "On Hold", "Completed"]}
              value={selectedStatus} // Ensure correct value
              onChange={(name, value) => handleStatusChange(project.id, value)}
              className={'rounded-md border-gray-400 border'}
            />
          );
        },
      }),
      
    ],
    [selectedRow]
  );

  return columns;
};
