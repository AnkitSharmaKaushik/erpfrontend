import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LableAndInput from "../../Molecules/LableAndInput";
import { RaiseCbrInputFields } from "./RaiseCbrInputFields";
import Label from "../../Atom/Label";
import RaiseVpr from "../raiseVpr/RaiseVpr";
import {
  toggleRaiseCbr,
  toggleRaiseVpr,
} from "../../../utils/slices/dataTableSlice";
import Popup from "../../Atom/Popup";
import RaiseCbrMultipleSampleCpi from "./RaiseCbrMultipleSampleCpi";
import { ProjectData } from "../../../utils/apis/projectData";
import { setProjects } from "../../../utils/slices/projectSlice";
import { RaiseCBRPostApi } from "../../fetchApis/projects/raiseCBR/RaiseCbr";
import SweetAlert from "../../components/SweetAlert";
// import { RaiseCBRPostApi } from "../../../fetchApis/projects/raiseCBR/RaiseCBRPostApi";
// import RaisedVpr from "../projectMultipleSampleTable/RaisedVpr";
// import { RaiseVPRPostApi } from "../../../fetchApis/projects/raiseVPR/RaiseVPRPostApi";

const RaiseCbr = () => {
  const { projects, page_number, page_size, activeTab } = useSelector(
    (store) => store.projectData
  );
  const { selectedRecord, isRaiseVpr } = useSelector(
    (store) => store.dataTable
  );
  const dispatch = useDispatch();
  const [samplePopupOpen, setSamplePopupOpen] = useState(false);

  const currentProject =
    projects.find((item) => item.id === selectedRecord?.id) || {};

  const projectSamples = currentProject.project_samples || [];

  const totalNumberOfSurvey = currentProject?.project_samples?.reduce(
    (acc, item) => {
      return (acc = acc + Number(item.sample));
    },
    0
  );

  const NumberOfAddnSurvey =
    Number(selectedRecord?.initial_sample_size) - Number(totalNumberOfSurvey);

  const [sampleData, setSampleData] = useState({
    project: selectedRecord?.id,
    project_code: selectedRecord?.project_code,
    project_name: selectedRecord?.name,
    status: "CBR Raised",
    samples: [],
    remarks: "",
    client: currentProject?.clients?.id,
    client_contact_person: "",
    client_email_address: "",
    client_purchase_order_no: "",
    number_of_surveys_initial_sow: selectedRecord?.initial_sample_size,
    number_of_additional_surveys: NumberOfAddnSurvey,
    total_surveys_to_be_billed: "",
    other_billing_instructions: "",
    sales_owner: selectedRecord?.created_by?.id,
    project_manager_name: currentProject?.assigned_to?.id,
    purchase_order_number: "",
  });

  const [vprData, setVprData] = useState({
    project: selectedRecord?.id,
    status: "pending",
    name_of_client: selectedRecord?.clients,
    project_code: selectedRecord?.project_code,
    project_name: selectedRecord?.name,
    vendor_name: "",
    type_of_services: selectedRecord?.project_type,
    invoice_amount: null,
    approved_amount: null,
    name_of_project_manager: currentProject?.assigned_to?.id,
    other_cost: [],
  });

  const handleCancelUpdate = () => {
    dispatch(toggleRaiseCbr());
  };

  const handleSubmitData = async () => {
    // console.log(sampleData);

    if (
      !sampleData.project ||
      !sampleData.project_code ||
      !sampleData.project_name
    ) {
      SweetAlert({
        title: "Error",
        text: "Project, Project Code, and Project Name are required!",
        icon: "error",
      });
      return;
    }
    try {
      const response = await RaiseCBRPostApi(sampleData);
      if (!response?.status) {
        SweetAlert({
          title: "Error",
          text:
            response?.ex?.response?.data[0] ||
            response?.ex?.response?.data?.project,
          icon: "error",
        });
        return;
      }

      // if (toggleVpr) {
      //   if (
      //     !vprData.project ||
      //     !vprData.vendor_name ||
      //     !vprData.invoice_amount
      //   ) {
      //     SweetAlert({
      //       title: "Error",
      //       text: "Vendor Name and Invoice Amount are required for VPR!",
      //       icon: "error",
      //     });
      //     return;
      //   }

      //   const vprResponse = await RaiseVPRPostApi(vprData);
      //   if (!vprResponse?.status) {
      //     SweetAlert({
      //       title: "Error",
      //       text: vprResponse?.ex?.response?.data[0] || "Failed to raise VPR!",
      //       icon: "error",
      //     });
      //     return;
      //   }
      // }
      SweetAlert({
        title: "Success",
        text: response?.data?.message,
        icon: "success",
      });
      dispatch(toggleRaiseCbr());
      const projectResponse = await ProjectData(
        page_number,
        page_size,
        activeTab
      );
      dispatch(setProjects(projectResponse?.results));
    } catch (error) {
      SweetAlert({
        title: "Error",
        text: "An unexpected error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  const handleSampleClick = () => {
    setSampleData({
      ...sampleData,
      samples: projectSamples.map(({ id, sample, cpi, target_group }) => ({
        id,
        sample,
        cpi,
        target_group,
      })),
    });
    setSamplePopupOpen(true);
  };

  const handlePopupSubmit = () => {
    console.log(sampleData);

    setSamplePopupOpen(false);
  };
  const handlePopupCancel = () => {
    setSamplePopupOpen(false);
  };
  const handleSampleChange = (index, field, value) => {
    const updatedSamples = [...sampleData.samples];
    updatedSamples[index][field] = value;
    setSampleData({ ...sampleData, samples: updatedSamples });
  };

  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold underline pb-4">CBR Data</h3>
      <div className="grid grid-cols-3 gap-4">
        {RaiseCbrInputFields({ sampleData, setSampleData }).map(
          (field, index) => (
            <div key={index} className="text-left">
              {field.isCheckbox ? (
                <div className="flex items-center gap-2">
                  <Label labelName={field.labelName} />
                  <input
                    type="checkbox"
                    onChange={field.inputChange}
                    className="h-5 w-5"
                  />
                </div>
              ) : field.isCustomComponent ? (
                <div>
                  <Label labelName={field.labelName} className="pb-2" />
                  <div
                    className="p-2 border cursor-pointer bg-white rounded-md"
                    onClick={handleSampleClick}
                  >
                    {field.InputValue.length > 0
                      ? field.InputValue.map(
                          (s) =>
                            ` ${s.sample} (CPI: ${s.cpi}, TG: ${s.target_group})`
                        ).join(", ")
                      : "Click to add Final Samples"}
                  </div>
                </div>
              ) : (
                <LableAndInput
                  labelClassName="text-left"
                  labelName={field.labelName}
                  InputType={field.InputType || "text"}
                  inputValue={field.InputValue}
                  disabled={field.disabled}
                  inputClassName={`p-2 border rounded-md ${
                    field.disabled
                      ? "cursor-not-allowed bg-gray-100"
                      : "bg-white"
                  }`}
                  inputChange={field.inputChange}
                />
              )}
            </div>
          )
        )}
      </div>
      {isRaiseVpr && (
        <Popup>
          <RaiseVpr />
        </Popup>
      )}

      <div className="flex justify-center pt-10 gap-4">
        <button
          onClick={handleSubmitData}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md"
        >
          Submit
        </button>
        <button
          onClick={handleCancelUpdate}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md"
        >
          Cancel
        </button>
      </div>
      {samplePopupOpen && (
        <Popup>
          <RaiseCbrMultipleSampleCpi
            sampleData={sampleData}
            handlePopupCancel={handlePopupCancel}
            handlePopupSubmit={handlePopupSubmit}
            handleSampleChange={handleSampleChange}
          />
        </Popup>
      )}
    </div>
  );
};

export default RaiseCbr;
