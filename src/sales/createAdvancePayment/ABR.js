import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAbrEntryValidation } from "../../../utils/hooks/useAbrEntryValidation";
import {
  addAbrData,
  toggleAdvancedPayment,
  toggleAdvancedPaymentHasData,
} from "../../../utils/slices/projectEntryFormSlice";
import LableAndInput from "../../Molecules/LableAndInput";

const ABR = () => {
  const dispatch = useDispatch();
  const { abr, form } = useSelector((store) => store.projectEntryForm);
  const { clients, projectManager } = useSelector((store) => store.projectData);
  const [error, setError] = useState({});

  const user = localStorage.getItem("username");

  const selectedClient = clients.filter((c) => c.id === form?.clients)[0];
  const selectedManager = projectManager?.filter(
    (pm) => pm?.user?.id === form?.project_manager
  )[0];

  useEffect(() => {
    if (selectedClient || selectedManager) {
      const payload = {
        ...(selectedClient && {
          client_name: selectedClient?.id,
          clientname: selectedClient?.name,
          client_address: selectedClient?.address,
          contact_person_name: selectedClient?.contact_person,
          contact_person_email: selectedClient?.contact_person_email,
          cc_emails: selectedClient?.email_id_for_cc,
          client_city: selectedClient?.city,
          client_country: selectedClient?.country,
        }),
        ...(selectedManager && { project_manager: selectedManager?.user?.id }),
      };
      dispatch(addAbrData(payload));
    }
  }, [selectedClient, selectedManager, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(addAbrData({ [name]: value }));
  };

  useEffect(() => {
    if (abr?.total_project_cost && abr?.advance_invoice_percentage) {
      const updatedAdvanceInvoiceAmount =
        (abr.total_project_cost * abr.advance_invoice_percentage) / 100;
  
      dispatch(addAbrData({ ...abr, advance_invoice_amount: updatedAdvanceInvoiceAmount }));
    }
  }, [abr?.total_project_cost, abr?.advance_invoice_percentage, dispatch]);
  
  const handleABR = () => {    
    const errorMessage = useAbrEntryValidation(abr);
    if (Object.keys(errorMessage).length > 0) {
      setError(errorMessage);
    } else {
      setError({});
      dispatch(toggleAdvancedPayment());
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h1 className="text-xl font-semibold text-gray-800">
          Advance Billing Requisition
        </h1>
        <button
          className="bg-red-500 hover:bg-red-700 font-bold border border-gray-300 text-white px-2 py-2 rounded-md absolute top-0 right-0"
          onClick={() => {
            dispatch(toggleAdvancedPayment());
            dispatch(toggleAdvancedPaymentHasData(false));
          }}
        >
          X
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <LableAndInput
          labelClassName={"text-left"}
          labelName="Name of Client"
          InputName="client"
          inputValue={selectedClient?.name}
          InputType="text"
          inputClassName="border border-gray-300 rounded-md p-2 w-full cursor-not-allowed min-w-[200px] break-words"
          inputChange={handleInputChange}
          disabled
        />
        <LableAndInput
          labelClassName={"text-left"}
          labelName="Address of Client (In case of new client)"
          InputName="client_address"
          inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
          inputValue={selectedClient?.address || abr?.client_address}
          inputChange={handleInputChange}
        />
        <LableAndInput
          labelClassName={"text-left"}
          labelName="City"
          InputName="client_city"
          inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
          inputValue={selectedClient?.city || abr?.client_city}
          inputChange={handleInputChange}
        />
        <LableAndInput
          labelClassName={"text-left"}
          labelName="Country"
          InputName="client_country"
          inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
          inputValue={selectedClient?.country || abr?.client_country}
          inputChange={handleInputChange}
        />
        <LableAndInput
          labelClassName={"text-left"}
          labelName="Project Name (as per SOW)"
          InputName="project"
          inputValue={form?.name || abr?.project}
          placeholder={form?.name}
          inputClassName="border border-gray-300 rounded-md p-2 w-full cursor-not-allowed min-w-[200px] break-words"
          inputChange={handleInputChange}
          disabled
        />
        <div>
          <LableAndInput
            labelClassName={"text-left"}
            labelName="Contact Person - Name"
            InputName="contact_person_name"
            inputValue={
              selectedClient?.contact_person || abr?.contact_person_name
            }
            inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
            inputChange={handleInputChange}
          />
          {error && (
            <p className="text-red-500 text-sm mt-0 text-left">
              {error.contact_person_name}
            </p>
          )}
        </div>
        <div>
          <LableAndInput
            labelClassName={"text-left"}
            labelName="Contact Person - Email ID"
            InputName="contact_person_email"
            inputValue={
              selectedClient?.contact_person_email || abr?.contact_person_email
            }
            inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
            inputChange={handleInputChange}
          />
          {error && (
            <p className="text-red-500 text-sm mt-0 text-left">
              {error.contact_person_email}
            </p>
          )}
        </div>
        <LableAndInput
          labelClassName={"text-left"}
          labelName="CC: Other Persons - Email ID (if any)"
          InputName="cc_emails"
          inputValue={selectedClient?.email_id_for_cc || abr?.email_id_for_cc}
          inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
          inputChange={handleInputChange}
        />
        <LableAndInput
          labelClassName={"text-left"}
          labelName="Specific Billing Instruction (if any)"
          InputName="specific_billing_instruction"
          inputValue={abr?.specific_billing_instruction}
          inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
          inputChange={handleInputChange}
        />
        <div>
          <LableAndInput
            labelClassName={"text-left"}
            labelName="Total Cost of Project (Amount)"
            InputName="total_project_cost"
            inputValue={abr?.total_project_cost}
            inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
            inputChange={handleInputChange}
          />
          {error && (
            <p className="text-red-500 text-sm mt-0 text-left">
              {error.total_project_cost}
            </p>
          )}
        </div>
        <div>
          <LableAndInput
            labelClassName={"text-left"}
            labelName="Advance Invoice as per SOW (Percentage)"
            InputName="advance_invoice_percentage"
            inputValue={abr?.advance_invoice_percentage}
            inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
            inputChange={handleInputChange}
          />
          {error && (
            <p className="text-red-500 text-sm mt-0 text-left">
              {error.advance_invoice_percentage}
            </p>
          )}
        </div>
        <div>
          <LableAndInput
            labelClassName={"text-left"}
            labelName="Advance Invoice as per SOW (Amount)"
            InputName="advance_invoice_amount"
            inputValue={(
              (abr.total_project_cost * abr.advance_invoice_percentage) /
              100
            ).toFixed(2)}
            // inputValue={abr?.advance_invoice_amount}
            inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
            inputChange={handleInputChange}
            disabled={true}
          />
          {/* (((abr.total_project_cost * abr.advance_invoice_percentage)/100).toFixed(2)) */}
          {error && (
            <p className="text-red-500 text-sm mt-0 text-left">
              {error.advance_invoice_amount}
            </p>
          )}
        </div>
        <LableAndInput
          labelClassName={"text-left"}
          labelName="Sales Owner"
          InputName="sales_owner"
          inputValue={user}
          inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
          inputChange={handleInputChange}
        />
        <LableAndInput
          labelClassName={"text-left"}
          labelName="Name of Project Manager"
          InputName="project_manager"
          inputValue={selectedManager?.user_role?.name}
          inputClassName="border border-gray-300 rounded-md p-2 w-full cursor-not-allowed min-w-[200px] break-words"
          inputChange={handleInputChange}
          disabled
        />
      </div>
      <div className="flex justify-end mt-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          onClick={handleABR}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ABR;
