import React, { useEffect, useState } from "react";
import InvoiceCompanyLogo from "./InvoiceCompanyLogo";
import InvoiceCompanyName from "./InvoiceCompanyName";
import InvoiceCompanyAddressAndEmail from "./InvoiceCompanyAddressAndEmail";
import InvoiceDateAndDueDate from "./InvoiceDateAndDueDate";
import InvoiceClientDetails from "./InvoiceClientDetails";
import InvoiceBuyerDetails from "./InvoiceBuyerDetails";
import InvoiceSampleAndCostDetails from "./InvoiceSampleAndCostDetails";
import InvoiceBankDetails from "./InvoiceBankDetails";
import {
  setCbrProjects,
  toggleIsCreateInvoice,
} from "../../../utils/slices/financeDepartmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { getWithAuth, postWithAuth } from "../../provider/helper/axios";
import {
  ABR_PROJECT_LIST,
  CBR_PROJECT_LIST,
  GENERATE_INVOICE,
  VIEW_CBR_DETAILS,
} from "../../../utils/constants/urls";
import { useLocation, useNavigate } from "react-router-dom";
import SweetAlert from "../../components/SweetAlert";

const CreateCbrInvoice = () => {
  const { companyDetails, selectedCompanyDetails } = useSelector(
    (store) => store.financeDepartment.cbr.createInvoice
  );

  const { clients } = useSelector((store) => store.projectData);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state: data } = location;

  const currentClient = clients.filter(
    (cName) => cName.name.toLowerCase() === data?.clients.toLowerCase()
  );
  const [ABRDetails, setABRDetails] = useState([]);
  const [CBRDetails, setCBRDetails] = useState([]);

  const [invoiceData, setInvoiceData] = useState({
    advanceType: "",
    // no need to send bank details
    bankDetails: {
      accountNumber: selectedCompanyDetails?.account_number,
      accountTitle: selectedCompanyDetails?.account_title,
      bankAddress: selectedCompanyDetails?.bank_address,
      bankName: selectedCompanyDetails?.bank_name,
      swiftCode: selectedCompanyDetails?.swift_code,
      wireABA: selectedCompanyDetails?.wireABA,
      wireACH: selectedCompanyDetails?.wireACH,
    },
    buyer: "",
    clientAddress: currentClient[0]?.address,
    clientEmail: currentClient[0]?.email,
    clientName: currentClient[0]?.name,
    clientPhone: currentClient[0]?.phone_number,
    cbr: CBRDetails?.id,
    cost_components: "",
    description: "",
    cpi: 0, // Keep numbers as 0
    date: "",
    dueDate: "",
    sample: 0, // Keep numbers as 0
    services: data?.project_type,
    studyName: "",
    totalCost: CBRDetails?.reduce((total, cbr) => {
      return (
        total +
        cbr?.final_samples?.reduce((sum, item) => {
          return sum + Number(item.sample) * Number(item.cpi);
        }, 0)
      );
    }, 0).toFixed(2),
    final_payment: (
      CBRDetails?.reduce((total, cbr) => {
        return (
          total +
          cbr?.final_samples?.reduce((sum, item) => {
            return sum + Number(item.sample) * Number(item.cpi);
          }, 0)
        );
      }, 0) - ((ABRDetails?.length > 0 ? ABRDetails[0]?.advance_invoice_amount : 0) || 0)
    ).toFixed(2),
    
  });

  const [invoiceFinalData, setInvoiceFinalData] = useState({
    advance_paid: ABRDetails[0]?.advance_invoice_amount || 0,
    buyer_name: invoiceData?.buyer,
    cbr: CBRDetails[0]?.id,
    cost_components: [],
    description: "",
    due_date: invoiceData?.dueDate,
    entity: selectedCompanyDetails?.id,
    final_payment: invoiceData?.final_payment,
    issue_date: invoiceData?.date,
    po_number: CBRDetails[0]?.po_number,
    project: data?.id,
    services: invoiceData?.services,
    total_cost_usd: invoiceData?.totalCost,
    type: "CBR",
  });

  useEffect(() => {
    setInvoiceFinalData((prev) => ({
      ...prev,
      entity: selectedCompanyDetails?.id,
      buyer_name: invoiceData?.buyer,
      due_date: invoiceData?.dueDate,
      final_payment: invoiceData?.final_payment,
      issue_date: invoiceData?.date,
      services: invoiceData?.services,
      total_cost_usd: invoiceData?.totalCost,
      cost_components: invoiceData?.cost_components,
      description: invoiceData?.description,
    }));
  }, [
    invoiceData?.buyer,
    invoiceData?.dueDate,
    invoiceData?.final_payment,
    invoiceData?.date,
    invoiceData?.services,
    invoiceData?.totalCost,
    invoiceData?.advanceType,
    invoiceData?.cost_components,
    invoiceData?.description,
  ]);

  useEffect(() => {
    setInvoiceFinalData((prev) => ({
      ...prev,
      cbr: CBRDetails[0]?.id,
      po_number: CBRDetails[0]?.po_number,
    }));
  }, [CBRDetails]);

  useEffect(() => {
    if (selectedCompanyDetails) {
      setInvoiceData((prev) => ({
        ...prev,
        bankDetails: {
          accountNumber: selectedCompanyDetails.account_number,
          accountTitle: selectedCompanyDetails.account_title,
          bankAddress: selectedCompanyDetails.bank_address,
          bankName: selectedCompanyDetails.bank_name,
          swiftCode: selectedCompanyDetails.swift_code,
          wireABA: selectedCompanyDetails.wireABA,
          wireACH: selectedCompanyDetails.wireACH,
        },
      }));
    }
  }, [selectedCompanyDetails]);

  useEffect(() => {
    setInvoiceData((prev) => ({
      ...prev,
      totalCost: `${(prev.sample * prev.cpi).toFixed(2)}`,
    }));
  }, [invoiceData.sample, invoiceData.cpi]);

  const getCompany = async (id) => {
    const abrResponse = await getWithAuth(ABR_PROJECT_LIST);
    const currentProjectWithABR = abrResponse?.data?.filter(
      (item) => item?.project?.id === data?.id
    );
    setABRDetails(currentProjectWithABR || []); // Ensure it is always an array

    // setABRDetails(currentProjectWithABR);
    const cbrResponse = await getWithAuth(VIEW_CBR_DETAILS(data?.id));
    setCBRDetails(cbrResponse?.data);
  };

  useEffect(() => {
    const id = selectedCompanyDetails?.id;
    if (id) {
      getCompany(id);
    }
  }, [selectedCompanyDetails]);

  const handleGenerateInvoice = async () => {
    const response = await postWithAuth(GENERATE_INVOICE, invoiceFinalData);
    if (response.status == true) {
      SweetAlert({
        title: "success",
        text: "Invoice Created Successfully",
        icon: "success",
      });
      navigate(-1);
      const response = await getWithAuth(CBR_PROJECT_LIST);
      const data = await response?.data;
      dispatch(setCbrProjects(data));
    } else {
      SweetAlert({
        title: "Error",
        text: response?.ex?.response?.data?.error,
        icon: "error",
      });
    }
  };

  return (
    <div className="p-8 w-full mx-auto  relative overflow-hidden">
      {/* bg-gradient-to-br from-blue-100 to-blue-300 shadow-2xl */}
      {/* Invoice Header */}
      <div className="flex justify-between items-center mb-4 border-b-2 border-blue-500 pb-4">
        <InvoiceCompanyLogo />
        <h2 className="text-4xl font-extrabold text-blue-900 tracking-wide">
          Invoice
        </h2>
      </div>

      {/* Header Section */}
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div>
          <InvoiceCompanyName />
          <InvoiceCompanyAddressAndEmail
            invoiceData={invoiceData}
            setInvoiceData={setInvoiceData}
          />
        </div>
        <div>
          <InvoiceDateAndDueDate
            invoiceData={invoiceData}
            setInvoiceData={setInvoiceData}
          />
          <div className="w-full">
            <div className="flex flex-col items-end">
              <div className="m-1 flex items-center">
                <label className="font-semibold text-gray-800 mr-2 min-w-24">
                  Invoice Type:
                </label>
                <input
                  disabled
                  value={"CBR"}
                  className="p-1  pl-2 border bg-gray-200 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Information */}
      <div className="mb-6 grid grid-cols-2 gap-8">
        <InvoiceClientDetails
          invoiceData={invoiceData}
          setInvoiceData={setInvoiceData}
        />
        {/* Buyer & Service Details */}
        <InvoiceBuyerDetails
          invoiceData={invoiceData}
          setInvoiceData={setInvoiceData}
        />
      </div>
      {/* Sample and Cost Details */}
      <div className="mb-6">
        <InvoiceSampleAndCostDetails
          CBRDetails={CBRDetails}
          setInvoiceData={setInvoiceData}
          invoiceData={invoiceData}
          ABRDetails={ABRDetails}
          setInvoiceFinalData={setInvoiceFinalData}
        />
      </div>

      {/* Bank Details */}
      <div className="mt-8 mb-6 border-t-2 border-blue-500 pt-4">
        <InvoiceBankDetails />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-6 mt-8">
        <button
          onClick={handleGenerateInvoice}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105"
        >
          Generate Invoice
        </button>
        <button
          onClick={() => {
            dispatch(toggleIsCreateInvoice());
            navigate(-1);
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CreateCbrInvoice;
