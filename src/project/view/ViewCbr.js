import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewCbrAPI } from "../../../utils/apis/viewCbr";
import { toggleViewCbr } from "../../../utils/slices/dataTableSlice";

const ViewCbr = () => {
  const { selectedRecord } = useSelector((store) => store.dataTable);
  const dispatch = useDispatch();

  const [viewCbrData, setViewCbrData] = useState([]);

  useEffect(() => {
    const fetchViewCbr = async () => {
      if (!selectedRecord?.id) return;
      try {
        const response = await viewCbrAPI(selectedRecord.id);
        setViewCbrData(response?.data || []);
      } catch (error) {
        console.error("Error fetching CBR data:", error);
      }
    };
    fetchViewCbr();
  }, [selectedRecord]);

  const handleCloseView = () => dispatch(toggleViewCbr());

  const tableRows = useMemo(
    () => [
      { label: "Name of Client", key: "client" },
      { label: "Project Name", key: "project_name" },
      {
        label: "Client Purchase order no. (if any)",
        key: "client_purchase_order_no",
      },
      { label: "Project Code", key: "project_code" },
      { label: "Client : Contact Person", key: "client_contact_person" },
      { label: "Email Address", key: "client_email_address" },
      { label: "Cc : Email IDs (if any)", key: "cc_email_ids" },
      {
        label: "# of Surveys as per Initial SOW",
        key: "number_of_surveys_initial_sow",
        default: "0",
      },
      {
        label: "# Addnl Surveys as per client confirmation (if any)",
        key: "number_of_additional_surveys",
        default: "0",
      },
      {
        label: "# of Total Surveys to be billed to client",
        key: "total_surveys_to_be_billed",
        default: "0",
      },
      {
        label: "Other Specific billing instructions (if any)",
        key: "other_billing_instruction",
      },
      { label: "Sales Owner", key: "sales_owner" },
      { label: "Name of Project Manager", key: "project_manager" },
    ],
    []
  );

  const isObject = (value) => typeof value === "object" && value !== null;

  if (!viewCbrData.length) return null;

  return (
    <div className="p-6 bg-white relative">
      <h2 className="text-xl font-bold mb-4">
        Unimrkt/PR/CBR/{viewCbrData[0]?.id || "N/A"}
      </h2>

      <h3 className="text-lg font-semibold primary_color text-white p-1">
        Client Billing Requisition
      </h3>
      <h3 className="text-lg font-semibold primary_color text-white p-1 border-t">
        Particulars
      </h3>

      {viewCbrData.map((data, ind) => (
        <div key={ind} className="mb-6">
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              {tableRows.map(
                ({ label, key, default: defaultValue = "N/A" }) => (
                  console.log(data?.[key]),
                  (
                    <tr key={key}>
                      <td className="primary_color w-1/2 text-white p-1 border text-left">
                        {label}
                      </td>
                      <td className="p-1 text-left w-1/2 border pl-2">
                        {isObject(data?.[key])
                          ? data?.[key].name
                          : data?.[key] ?? defaultValue}
                        {/* {data?.[key] ?? defaultValue} */}
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      ))}

      <button
        onClick={handleCloseView}
        className="absolute top-0 right-0 bg-red-400 p-1 rounded-md text-white hover:bg-red-500"
      >
        X
      </button>
    </div>
  );
};

export default ViewCbr;
