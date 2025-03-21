import { PROJECT_TYPES } from "../../../../utils/constants/urls.js";
import { getWithAuth } from "../../../provider/helper/axios.js";

export const ProjectTypeList = async () => {
  return await getWithAuth(PROJECT_TYPES);
};

export const FetchProjectType = async () => {
  try {
    const response = await getWithAuth(PROJECT_TYPES);
    const projectTypeObject = response?.data?.results?.map((val) => val);
    return projectTypeObject;
  } catch (error) {
    console.error("Error fetching project type list:", error);
    return [];
  }
};
