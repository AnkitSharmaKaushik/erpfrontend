import React from "react";
import { useSelector } from "react-redux";

const InvoiceCompanyAddressAndEmail = ({ invoiceData, setInvoiceData }) => {
  const { selectedCompanyDetails } = useSelector(
    (store) => store.financeDepartment.cbr.createInvoice
  );
  const handleInputChange = (e) => {
    setInvoiceData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="w-full">
      <div className="flex flex-col">
        <div className="flex items-center">
          <label className="mt-2 font-semibold mr-2 min-w-20">Address:</label>
          <textarea
            className="mt-2 border border-gray-300 bg-gray-100 rounded p-1 w-full"
            defaultValue={selectedCompanyDetails?.address}
            readOnly
          />
        </div>
        <div className="flex items-center">
          <label className="mt-2 font-semibold mr-2 min-w-20">Email:</label>
          <input
            name="clientEmail"
            className="mt-2 border border-gray-300 bg-gray-100 rounded p-1 w-full"
            defaultValue={
              selectedCompanyDetails?.email || invoiceData.clientEmail
            }
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceCompanyAddressAndEmail;
