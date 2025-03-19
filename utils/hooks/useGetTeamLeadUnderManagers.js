import { PROJECT_MANAGER } from "../constants/urls";
import { getWithAuth } from "../../src/provider/helper/axios";
import { useEffect, useState } from "react";

const getTeamLeadsUnderManager = (userRole) => {
  const [selectTL, setSelectTL] = useState([]);

  useEffect(() => {
    getTeamlead();
  }, []);

  const getTeamlead = async () => {
    try {
      const response = await getWithAuth(
        `${PROJECT_MANAGER}${userRole}/teamleads/`
      );
      const teamLeadList = response?.data?.subordinates?.map((item) => ({
        value: item.user_role.id,
        label: item.user_role.name,
      }));
      setSelectTL(teamLeadList);
    } catch (error) {
      console.error("Error fetching team leads:", error);
    }
  };

  return selectTL;
};

export default getTeamLeadsUnderManager;
