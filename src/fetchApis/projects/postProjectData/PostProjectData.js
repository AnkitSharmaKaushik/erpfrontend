import { PROJECT_ENTRY_APIS } from "../../../../utils/constants/urls.js";
import SweetAlert from "../../../components/SweetAlert.js";
import { postWithAuthForUpload } from "../../../provider/helper/axios.js";

export const PostFormData = async (data) => {
  try {
    return await postWithAuthForUpload(PROJECT_ENTRY_APIS, data, {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    SweetAlert({
      title: "Error",
      text: "An error occurred. Please try again.",
      icon: "error",
    });
  }
};
