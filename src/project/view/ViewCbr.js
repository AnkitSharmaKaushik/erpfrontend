import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { viewCbrAPI } from "../../../utils/apis/viewCbr";

const ViewCbr = () => {
  const { selectedRecord } = useSelector((store) => store.dataTable);
  const [viewCbrData, setViewCbrData] = useState();
  const viewCbr = async () => {
    const response = await viewCbrAPI(selectedRecord.id);
    setViewCbrData(response?.data);
  };
  useEffect(() => {
    viewCbr();
  }, []);

  return viewCbrData?.map((data, ind) => {
    return (
    <div key={ind} className="p-6 bg-white shadow-lg rounded-2xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <strong>Project Name:</strong> {data?.project_name || "N/A"}
        </div>
        <div>
          <strong>Project Code:</strong> {data?.project_code || "N/A"}
        </div>
        <div>
          <strong>Client Name:</strong> {data?.client_name || "N/A"}
        </div>
        <div>
          <strong>Contact Person:</strong>{" "}
          {data?.client_contact_person || "N/A"}
        </div>
        <div>
          <strong>Email:</strong> {data?.client_email_address || "N/A"}
        </div>
        <div>
          <strong>PO Number:</strong> {data?.client_purchase_order_no || "N/A"}
        </div>

        <div>
          <strong>Advance Billing Raised:</strong>{" "}
          {data?.advanced_billing_raised ? "Yes" : "No"}
        </div>
        <div>
          <strong>CBR Raised Status:</strong>{" "}
          {data?.cbr_raised_status ? "Yes" : "No"}
        </div>
        <div>
          <strong>Minimum Fee:</strong> ₹{data?.minimum_fee || "0.00"}
        </div>

        <div>
          <strong>Surveys (Initial SOW):</strong>{" "}
          {data?.number_of_surveys_initial_sow}
        </div>
        <div>
          <strong>Total Surveys to be Billed:</strong>{" "}
          {data?.total_surveys_to_be_billed}
        </div>
        <div>
          <strong>Additional Surveys:</strong>{" "}
          {data?.number_of_additional_surveys}
        </div>

        <div>
          <strong>Request Date:</strong>{" "}
          {new Date(data?.request_date).toLocaleDateString()}
        </div>
        <div>
          <strong>Requested By:</strong> {data?.requested_by?.name || "N/A"}
        </div>

        <div className="col-span-2">
          <strong>Remarks:</strong> {data?.remarks || "N/A"}
        </div>
        <div className="col-span-2">
          <strong>Other Billing Instructions:</strong>{" "}
          {data?.other_billing_instruction || "N/A"}
        </div>
      </div>

      {data?.final_samples && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Final Samples</h3>
          <ul className="list-disc list-inside">
            {data.final_samples.map((sample, index) => (
              <li key={index}>{JSON.stringify(sample)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>)
  });
};

export default ViewCbr;
