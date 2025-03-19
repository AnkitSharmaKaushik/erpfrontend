import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleRaiseVpr } from "../../../utils/slices/dataTableSlice";
import LableAndInput from "../../Molecules/LableAndInput";

export const RaiseVprInputFields = ({ vprData, setVprData }) => {
  const { projects, page_number, page_size, activeTab } = useSelector(
    (store) => store.projectData
  );
  const { selectedRecord } = useSelector((store) => store.dataTable);

  const currentProject =
    projects.find((item) => item.id === selectedRecord?.id) || {};

  const totalNumberOfSurvey = currentProject?.project_samples.reduce(
    (acc, item) => {
      return (acc = acc + Number(item.sample));
    },
    0
  );

  const NumberOfAddnSurvey =
    Number(selectedRecord?.initial_sample_size) - Number(totalNumberOfSurvey);

  const inputFields = [
    {
      labelName: "Vendor Name",
      InputValue: vprData?.vendor_name,
      InputName: "vendor_name",
      inputChange: (e) =>
        setVprData({ ...vprData, vendor_name: e.target.value }),
      inputClassName: "p-2 border bg-white rounded-md",
    },
    {
      labelName: "Project Manager",
      InputValue: currentProject?.assigned_to?.name,
      InputName: "project_manager",
      inputChange: (e) =>
        setVprData({ ...vprData, project_manager: e.target.value }),
      inputClassName: "p-2 border rounded-md",
    },
    {
      labelName: "Invoice Amount",
      InputValue: vprData?.invoice_amount,
      InputName: "invoice_amount",
      inputChange: (e) =>
        setVprData({ ...vprData, invoice_amount: e.target.value }),
      inputClassName: "p-2 border bg-white rounded-md",
    },
    {
      labelName: "Approved Amount",
      InputValue: vprData?.approved_amount,
      InputName: "approved_amount",
      inputChange: (e) =>
        setVprData({ ...vprData, approved_amount: e.target.value }),
      inputClassName: "p-2 border bg-white rounded-md",
    },
    {
      labelName: "Type of Services",
      InputValue: vprData?.type_of_services,
      InputName: "type_of_services",
      inputChange: (e) =>
        setVprData({ ...vprData, type_of_services: e.target.value }),
      inputClassName: "p-2 border bg-white rounded-md",
    },
  ];

  return (
    <>
      {inputFields.map((field, index) => (
        <LableAndInput
          key={index}
          labelClassName="text-left"
          labelName={field.labelName}
          Inputvalue={field.InputValue}
          InputName={field.InputName}
          inputChange={field.inputChange}
          inputClassName={field.inputClassName}
        />
      ))}
    </>
  );
};
