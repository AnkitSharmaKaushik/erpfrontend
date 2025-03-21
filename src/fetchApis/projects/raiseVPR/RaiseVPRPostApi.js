import { RAISEVPR } from "../../../../utils/constants/urls";
import { postWithAuth } from "../../../provider/helper/axios";

export const RaiseVPRPostApi = async (data) => {
  const response = await postWithAuth(RAISEVPR, data);
  return response;
};
