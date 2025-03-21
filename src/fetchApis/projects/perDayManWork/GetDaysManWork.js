import { MANDAYS_PER_DAY } from "../../../../utils/constants/urls.js";
import SweetAlert from "../../../components/SweetAlert.js";
import { postWithAuth } from "../../../provider/helper/axios.js";

export const ManWorkPerDays = async (data) => {
  try {
    const response = await postWithAuth(MANDAYS_PER_DAY, data, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    SweetAlert({
      title: "Error",
      text: "An error occurred. Please try again.",
      icon: "error",
    });
  }
};
