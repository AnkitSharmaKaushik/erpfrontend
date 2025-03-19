import { useMemo } from "react";
import { useSelector } from "react-redux";

export const AddManDaysData = () => {
  const projects = useSelector((store) => store.projectData.projects);
  const { selectedRow } = useSelector((store) => store.dataTable);

  const data = useMemo(() => {
    return selectedRow.map((item) => ({
      id: item?.id,
      project_code: item?.project_code,
      name: item?.name,
      clients: item?.clients,
      sample: item?.sample,
      remaining_interview: item?.remaining_interview,
      status: item?.status,
    }));
  }, [projects]);

  return data;
};
