import axios from "axios";
import { CLIENT_DATA_APIS } from "../../../utils/constants/urls";
import { getWithAuth, postWithAuth } from "../../provider/helper/axios";

export const ClientList = async () => {
  try {
    return getWithAuth(CLIENT_DATA_APIS);
  } catch (error) {
    console.error("Error fetching project data:", error);
    throw error;
  }
};

export const PostClientList = async (data) => {
  try {
    return await postWithAuth(CLIENT_DATA_APIS, data, {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error fetching project data:", error);
    throw error;
  }
};
