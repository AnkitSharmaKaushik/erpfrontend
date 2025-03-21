import { RAISE_VPR } from "../../../../utils/constants/urls";
import { postWithAuth } from "../../../provider/helper/axios";

export const RaiseVPRPostApi = async (data) => {
  const response = await postWithAuth(RAISE_VPR, data);
  return response;
};
