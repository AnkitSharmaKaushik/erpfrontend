import { useEffect } from "react";
import { getWithAuth } from "../../src/provider/helper/axios";
import { CLIENTDATAAPIS } from "../constants/urls";
import { useDispatch } from "react-redux";
import { addClientList } from "../slices/projectSlice";

const useClientList = () => {
  const dispatch = useDispatch();

  const getClientList = async () => {
    const data = await getWithAuth(CLIENTDATAAPIS);
    const response = data?.data;
    dispatch(addClientList(response));
  };
  useEffect(() => {
    getClientList();
  }, []);
};

export default useClientList;
