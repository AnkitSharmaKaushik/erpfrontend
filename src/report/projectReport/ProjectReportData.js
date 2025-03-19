import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export const ProjectReportData = () => {
  const { projects } = useSelector((store) => store.projectData);
  const { searchText } = useSelector((store) => store.filterSlice.filterOption);
  const role = localStorage.getItem("role");
  const isDirectorRole = role === "Director";
  const isHodRole = role === "HOD";
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    setProjectData(projects);
  }, [projects]);

  // ✅ Memoize filtered and mapped data
  const data = useMemo(() => {
    // const searchText =  searchText?.toLowerCase() || "";

    // Filter projects based on searchText
    let filteredData = searchText
      ? projectData.filter((item) =>
          Object.values(item).some((val) => {
            if (typeof val === "object" && val !== null) {
              return Object.values(val).some((propVal) =>
                propVal?.toString()?.toLowerCase()?.includes(searchText)
              );
            } else if (val) {
              return val?.toString()?.toLowerCase()?.includes(searchText);
            }
            return false;
          })
        )
      : projectData;

    return filteredData?.map((item) => ({
      id: item?.id,
      project_code: item?.project_code,
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
      project_client_pm: item?.project_client_pm,
      upload_document: item?.upload_document,
      documents: item?.documents,
      initial_sample_size:
        (isDirectorRole || isHodRole) && item.initial_sample_size,
      created_by: item?.created_by,
      created_at: item?.created_at,
    }));
  }, [projectData, searchText, isDirectorRole, isHodRole]); // ✅ Dependencies prevent unnecessary recalculations

  return data;
};
