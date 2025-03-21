import { getWithAuth } from "../../src/provider/helper/axios";
import { NOTIFICATION_COUNT } from "../constants/urls";

export const notificationCount = async () => {
  const data = await getWithAuth(NOTIFICATION_COUNT);
  const response = data?.data;
  return response;
};
