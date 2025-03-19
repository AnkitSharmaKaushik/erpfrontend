import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "../../../components/DropDown";
import Label from "../../../Atom/Label";
import { addFormData } from "../../../../utils/slices/projectEntryFormSlice";
import { addClientList } from "../../../../utils/slices/projectSlice";
import { ClientList } from "../../../fetchApis/clientList/ClientList";

const Client = () => {
  const { isAddClient, clients } = useSelector((store) => store.projectData);
  const formData = useSelector((store) => store.projectEntryForm.form);
  const dispatch = useDispatch();

  useEffect(() => {
    const getClients = async () => {
      const ClientData = await ClientList();
      dispatch(addClientList(ClientData?.data));
    };
    getClients();
  }, [isAddClient]);

  const SelectOptionHandler = (name, value) => {
    if (value === "-- Select Clients --") {
      dispatch(addFormData({ [name]: "" }));
      return;
    }
    const selectedClient = clients.find((item) => item?.name === value);
    if (selectedClient) {
      dispatch(addFormData({ [name]: selectedClient?.id }));
    }
  };
  return (
    <div className="pt-2">
      <Label labelName={"Client"} className={"pt-4 pb-2 ml-1"} />
      <Dropdown
        name={"clients"}
        className={
          "p-[9px] outline-none cursor-pointer w-[100%] bg-[#f3eded] border rounded-md rounded-r-none"
        }
        Option_Name={
          clients?.length > 0 && [
            "-- Select Clients --",
            ...clients?.map((item) => item?.name),
          ]
        }
        RequireAddButton={true}
        required
        onChange={SelectOptionHandler}
        id={"clients"}
        selectedOption={
          clients?.find((item) => item.id == formData.clients)?.name ||
          "-- Select Clients --"
        }
      />
    </div>
  );
};

export default Client;
