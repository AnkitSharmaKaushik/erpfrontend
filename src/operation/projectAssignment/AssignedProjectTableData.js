import { useMemo } from "react";
import { useSelector } from "react-redux";

export const AssignedProjectTableData = () => {
  const projects = useSelector((store) => store.projectData.projects);
  const { selectedRow } = useSelector((store) => store.dataTable);

  const data = useMemo(() => {
    return selectedRow.map((item) => ({
      id: item?.id,
      project_code: item?.project_code,
      name: item?.name,
      clients: item?.clients,
      project_client_pm: item?.project_client_pm,
      purchase_order_no: item?.purchase_order_no?.name,
    }));
  }, [projects]);

  return data;
};
