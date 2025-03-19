import { useState } from "react";
import { DASHBOARDPROJECT } from "../../../utils/constants/urls";
import { getWithAuth } from "../../provider/helper/axios";

export const getDashboardProject = async () => {
    const response = await getWithAuth(DASHBOARDPROJECT);
    const data = await response?.data;
    return data
  };

