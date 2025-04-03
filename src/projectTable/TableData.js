import { useMemo } from "react";
import { useSelector } from "react-redux";

export const TableData = () => {
  const projects = useSelector((store) => store.projectData.projects);
  const { filterOption } = useSelector((store) => store.filterSlice);

  const data = useMemo(() => {
    if (!projects) return [];

    const searchText = filterOption?.searchText?.toLowerCase() || "";
    const selectedOptions = filterOption?.selectedOption || [];

    const searchInObject = (obj, searchText) => {
      if (!obj || typeof obj !== "object") return false;

      return Object.values(obj).some((value) => {
        if (typeof value === "object" && value !== null) {
          return searchInObject(value, searchText);
        }
        return value?.toString()?.toLowerCase().includes(searchText);
      });
    };

    const matchesSelectedOption = (item) => {
      if (!selectedOptions.length) return true;

      return selectedOptions.some((option) => {
        return (
          item?.clients?.name?.toLowerCase().includes(option.toLowerCase()) ||
          item?.assigned_to?.name
            ?.toLowerCase()
            .includes(option.toLowerCase()) ||
          // item?.assigned_to?.name?.toLowerCase().includes(option.toLowerCase())
          item?.project_assigned_to_teamlead
            ?.map((user) => user.name?.toLowerCase())
            .includes(option.toLowerCase())
          // item?.assigned_to?.name?.toLowerCase().includes(option.toLowerCase())
        );
      });
    };

    const filteredData = projects.filter(
      (item) =>
        (!searchText || searchInObject(item, searchText)) &&
        matchesSelectedOption(item)
    );

    return filteredData.map((item) => ({
      id: item?.id,
      project_code: item?.project_code.toUpperCase(),
      name: item?.name,
      cpi: item?.cpi ? Number(item?.cpi).toFixed(2) : "0.00",
      clients: item?.clients?.name,
      operation_select: item?.operation_select,
      project_type: item?.project_type?.name,
      other_cost: item?.other_cost,
      set_up_fee: item?.set_up_fee,
      transaction_fee: item?.transaction_fee,
      tentative_start_date: item?.tentative_start_date?.split("T")[0],
      tentative_end_date: item?.tentative_end_date?.split("T")[0],
      project_assigned_to_teamlead:
        item?.project_assigned_to_teamlead
          ?.map((user) => user.name)
          .join(" , ") || "N/A",
      assigned_to: item?.assigned_to,
      sample: item?.sample,
      project_samples: item?.project_samples,
      project_actual_start_date: item?.project_actual_start_date,
      total_achievement: item?.total_achievement,
      remaining_interview: item?.remaining_interview,
      man_days: item?.man_days,
      status: item?.status,
      project_client_pm: item?.project_client_pm?.name,
      upload_document: item?.upload_document,
      documents: item?.documents,
      initial_sample_size: item.initial_sample_size,
      created_by: item?.created_by,
      created_at: item?.created_at,
      purchase_order_no: item?.purchase_order_no,
    }));
  }, [projects, filterOption?.searchText, filterOption?.selectedOption]);

  return data;
};
