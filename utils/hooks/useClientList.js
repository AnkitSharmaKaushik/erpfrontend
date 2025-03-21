import { useEffect } from "react";
import { getWithAuth } from "../../src/provider/helper/axios";
import { CLIENT_DATA_APIS } from "../constants/urls";
import { useDispatch } from "react-redux";
import { addClientList } from "../slices/projectSlice";

const useClientList = () => {
  const dispatch = useDispatch();

  const getClientList = async () => {
    const data = await getWithAuth(CLIENT_DATA_APIS);
    const response = data?.data;
    dispatch(addClientList(response));
  };
  useEffect(() => {
    getClientList();
  }, []);
};

export default useClientList;
