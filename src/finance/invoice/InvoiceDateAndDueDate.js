import React from "react";

const InvoiceDateAndDueDate = ({ invoiceData, setInvoiceData }) => {
  const handleInputChange = (e) => {
    setInvoiceData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="text-left flex flex-col items-end">
      <div className="m-1 flex items-center">
        <label className="mt-2 font-semibold mr-2">Date:</label>
        <input
          type="date"
          name="date"
          defaultValue={invoiceData.date}
          onChange={handleInputChange}
          className="border p-1 bg-gray-200 border-gray-300 rounded-md min-w-56 w-full"
        />
      </div>
      <div className="m-1 flex items-center">
        <label className="font-semibold mr-2">Due Date:</label>
        <input
          type="date"
          name="dueDate"
          defaultValue={invoiceData.dueDate}
          onChange={handleInputChange}
          className="border p-1 bg-gray-200 border-gray-300 rounded-md min-w-56"
        />
      </div>
      <div>
      </div>
    </div>
  );
};

export default InvoiceDateAndDueDate;
