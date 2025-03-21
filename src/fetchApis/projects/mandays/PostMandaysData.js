import { POST_MAN_DAYS_DATA } from "../../../../utils/constants/urls.js";
import { postWithAuth } from "../../../provider/helper/axios";

export const PostMandaysData = async (data) => {
  try {
    const response = await postWithAuth(POST_MAN_DAYS_DATA, data, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
  }
};
