import { postWithAuth } from "../../src/provider/helper/axios";
import { CREATEADVANCEPAYMENT } from "../constants/urls";

export const createAdvanceBilling = async (data) => {
  const abrResponse = await postWithAuth(CREATEADVANCEPAYMENT, data);
  return abrResponse.data;
};
