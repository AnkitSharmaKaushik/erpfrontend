import { getWithAuth } from "../../src/provider/helper/axios";
import { EDIT_PROJECT_REQUEST } from "../constants/urls";

export const ProjectSample = async (id) => {
  const data = await getWithAuth(EDIT_PROJECT_REQUEST(id));
  const response = data?.data;
  return response;
};
