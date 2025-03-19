import React from "react";
import { useSelector } from "react-redux";
import { BASEURL } from "../../../utils/constants/urls";

const InvoiceCompanyLogo = () => {
  const { selectedCompanyDetails } = useSelector(
    (store) => store.financeDepartment.cbr.createInvoice
  );
  return (
    <div>
      <div className="min-h-20 w-32">
        <img
          alt="company-logo"
          src={BASEURL + selectedCompanyDetails?.logo}
          className="h-auto bg-blend-multiply"
        />
      </div>
    </div>
  );
};

export default InvoiceCompanyLogo;
