import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { addFilterProjectData } from "../slices/projectSlice";

const useProjectDataWIthRoleWiseFilter = () => {
  const projectDataResponse = useSelector(
    (store) => store.projectData.projects
  );  
  const dispatch = useDispatch();

  const fetchProjectData = async () => {
      dispatch(addFilterProjectData(projectDataResponse));
      return;
  };

  useEffect(() => {
    fetchProjectData();
  }, [projectDataResponse]);

};

export default useProjectDataWIthRoleWiseFilter;
