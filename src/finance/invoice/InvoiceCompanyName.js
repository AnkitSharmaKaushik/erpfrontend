import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GETALLCOMPANYNAME } from "../../../utils/constants/urls";
import { getWithAuth } from "../../provider/helper/axios";
import {
  addCompanyDetails,
  addSelectedCompanyDetails,
} from "../../../utils/slices/financeDepartmentSlice";

const InvoiceCompanyName = () => {
  const { companyDetails } = useSelector(
    (store) => store.financeDepartment.cbr.createInvoice
  );
  const dispatch = useDispatch();

  const handleCompanyChange = (event) => {
    if (event !== "--select company name--") {
      const company = companyDetails.find((c) => c.name === event.target.value);
      dispatch(addSelectedCompanyDetails(company));
    }
  };

  const getCOmpanyDropdownDetails = async () => {
    const companyName = await getWithAuth(GETALLCOMPANYNAME);
    dispatch(addCompanyDetails(companyName.data.data));
  };

  useEffect(() => {
    getCOmpanyDropdownDetails();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col items-start">
        <div className="flex items-center w-full">
        <label className="font-semibold text-gray-800 text-left mr-2 min-w-20">
          Company:
        </label>
        <select
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleCompanyChange}
        >
          <option value={"--select company name--"}>
            --select company name--
          </option>
          {companyDetails.length > 0 &&
            companyDetails?.map((company, index) => (
              <option key={index} value={company.name}>
                {company.name}
              </option>
            ))}
        </select>
      </div>
      </div>
    </div>
  );
};

export default InvoiceCompanyName;
