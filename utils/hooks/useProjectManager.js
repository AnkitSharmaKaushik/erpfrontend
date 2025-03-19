import { useEffect } from "react";
import { GetProjectManager } from "../../src/fetchApis/projectManager/projectManager";
import { useDispatch } from "react-redux";
import { addProjectManager } from "../slices/projectSlice";

const useManagerList = () => {
const dispatch = useDispatch()
  const FetchProjectManager = async () => {
    try {
      const ProjectManager = await GetProjectManager();
      const ProjectManagerObject = ProjectManager?.data?.map((val) => {
        return val?.user;
      });
      dispatch(addProjectManager(ProjectManagerObject))
      // setManagerListArray(ProjectManagerObject);
    } catch (error) {
      console.error("Error fetching project Manager List:", error);
    }
  };

  useEffect(() => {
    FetchProjectManager();
  }, []);
};

export default useManagerList;
