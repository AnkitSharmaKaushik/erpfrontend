import { UPDATE_TL_ASSIGNMENT } from "../../../../utils/constants/urls.js";
import SweetAlert from "../../../components/SweetAlert.js";
import { postWithAuth, putWithAuth } from "../../../provider/helper/axios.js";

export const UpdateTeamLead = async (data) => {
  try {
    const response = await postWithAuth(UPDATE_TL_ASSIGNMENT, data, {
      method: "PUT",
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
