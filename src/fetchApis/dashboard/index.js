import { useState } from "react";
import { DASHBOARD_PROJECT } from "../../../utils/constants/urls";
import { getWithAuth } from "../../provider/helper/axios";

export const getDashboardProject = async () => {
    const response = await getWithAuth(DASHBOARD_PROJECT);
    const data = await response?.data;
    return data
  };

