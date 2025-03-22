import React from "react";
import { useSelector } from "react-redux";

const InvoiceClientDetails = ({ invoiceData, setInvoiceData }) => {
  const { clients } = useSelector((store) => store.projectData);
  const { selectedRecord } = useSelector((store) => store.dataTable);

  const currentClient = clients?.filter(
    (c) => c?.name?.toLowerCase() === selectedRecord?.clients?.toLowerCase()
  );

  const handleInputChange = (e) => {
    setInvoiceData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="flex items-center">
      <label className="font-semibold mr-2 min-w-20">To:</label>
      <div>
        <input
          type="text"
          name="clientName"
          defaultValue={currentClient[0]?.name}
          onChange={handleInputChange}
          className=" p-1 w-full m-1 bg-gray-100 rounded-md"
          placeholder="Name"
        />
        <input
          type="text"
          name="clientAddress"
          defaultValue={currentClient[0]?.address}
          onChange={handleInputChange}
          className=" p-1 w-full m-1 bg-gray-100 rounded-md"
          placeholder="Address"
        />
        <input
          type="text"
          name="clientPhone"
          defaultValue={currentClient[0]?.phone_number}
          onChange={handleInputChange}
          className=" p-1 w-full m-1 bg-gray-100 rounded-md"
          placeholder="Telephone"
        />
      </div>
    </div>
  );
};

export default InvoiceClientDetails;
