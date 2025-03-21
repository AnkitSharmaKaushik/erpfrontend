import { getWithAuth } from "../../src/provider/helper/axios";
import { PROJECT_DATA_APIS } from "../constants/urls";

export const ProjectData = async (page_number,page_size,activeTabs) => {
  const data = await getWithAuth(PROJECT_DATA_APIS(page_number,page_size,activeTabs));
  const response = data?.data;
  return response; 
};
