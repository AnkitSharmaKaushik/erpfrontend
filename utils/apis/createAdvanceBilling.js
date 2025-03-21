import { postWithAuth } from "../../src/provider/helper/axios";
import { CREATE_ADVANCE_PAYMENT } from "../constants/urls";

export const createAdvanceBilling = async (data) => {
  const abrResponse = await postWithAuth(CREATE_ADVANCE_PAYMENT, data);
  return abrResponse.data;
};
