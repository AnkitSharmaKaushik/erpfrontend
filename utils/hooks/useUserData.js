import { useEffect, useState } from "react";
import { getWithAuth } from "../../src/provider/helper/axios";
import { useDispatch } from "react-redux";
import { USER_ROLE } from "../constants/urls";
import { setUsers } from "../slices/userSlice";

const useUserData = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);

  const getUserData = async () => { 
    const data = await getWithAuth(USER_ROLE);
    const response = data?.data;
    response.length > 0 && dispatch(setUsers(response));
    setUserData(response);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return userData;
};
export default useUserData;
