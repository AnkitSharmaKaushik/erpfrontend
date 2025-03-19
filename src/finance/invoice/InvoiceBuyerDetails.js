import React from "react";

const InvoiceBuyerDetails = ({ invoiceData, setInvoiceData }) => {
  const handleInputChange = (e) => {
    setInvoiceData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="flex flex-col items-end pb-4 mb-4">
      <div className="flex items-center m-1">
        <label className="font-semibold mr-2">Buyer:</label>
        <input
          type="text"
          name="buyer"
          defaultValue={invoiceData.buyer}
          onChange={handleInputChange}
          className="border p-1 w-full rounded-md"
          placeholder="Client Project Manager"
        />
      </div>
      <div className="flex items-center m-1">
        <label className="font-semibold mr-2">Services:</label>
        <input
          type="text"
          name="services"
          defaultValue={invoiceData.services}
          onChange={handleInputChange}
          className="border p-1 w-full rounded-md"
          placeholder="Service type"
        />
      </div>
    </div>
  );
};

export default InvoiceBuyerDetails;
