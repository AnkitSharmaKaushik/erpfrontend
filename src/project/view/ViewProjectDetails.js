import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { ManWorkPerDays } from "../../fetchApis/projects/perDayManWork/GetDaysManWork.js";
import ManDaysDetails from "./ManDaysDetails.js";
import { BASEURL } from "../../../utils/constants/urls.js";
import SweetAlert from "../../components/SweetAlert.js";
import Popup from "../../Atom/Popup.js";
import { toggleCloseView } from "../../../utils/slices/dataTableSlice.js";

const ViewProjectDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);

  const [isManDaysDetails, setIsManDaysDetails] = useState(false);
  const [perDayDetailsData, setPerDayDetailsData] = useState([]);
  const location = useLocation();
  const { state: data } = location;

  const handleViewDetails = async (projectid) => {
    const response = await ManWorkPerDays({ project_id: projectid });

    if (response?.status === true) {
      setIsManDaysDetails(true);
      setPerDayDetailsData(response.data);
    } else {
      SweetAlert({
        title: "Data not found!!",
        text: "",
        icon: "info",
      });
    }
  };

  const handleCloseManDaysDetails = (e) => {
    e.preventDefault();
    setIsManDaysDetails(false);
  };

  const renderListItem = (label, value, index, hasDetails = false) => (
    <li
      key={label}
      className={`border p-1 flex items-center text-xl justify-between w-1/2 ${
        darkMode
          ? "bg-black text-white border-b border-white"
          : index % 2 === 0
          ? index % 4 === 0
            ? "bg-white"
            : "bg-gray-100"
          : index % 4 === 1
          ? "bg-gray-100"
          : "bg-white"
      }`}
    >
      <span className="text-xl mr-8 w-5/12">{label}</span>
      <span className="w-2/12">:</span>
      <span className="w-5/12 relative">
        {value}
        {hasDetails && value && (
          <span
            className="absolute top-1 right-1 cursor-pointer underline text-blue-700"
            onClick={() => handleViewDetails(data.id)}
          >
            Show Details
          </span>
        )}
      </span>
    </li>
  );

  return (
    <div
      className={`${
        darkMode ? "w-full bg-black text-white" : "bg-white"
      } w-full p-8 mt-16 `}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-3xl p-4 underline pl-0 mb-4">Project View</h3>
        <button
          className="bg-gray-300 p-4 pt-2 pb-2"
          onClick={() => {
            navigate(-1);
            dispatch(toggleCloseView());
          }}
        >
          <FaLongArrowAltLeft className="text-3xl" />
        </button>
      </div>
      {data && (
        <ul className="flex flex-wrap text-left border w-full justify-between rounded-sm">
          {[
            {
              label: "Project Code",
              value: data.project_code.toUpperCase(),
            },
            { label: "Project Name", value: data.name },
            {
              label: "Project Type",
              value: data.project_type,
            },
            { label: "Client Name", value: data.clients },
            {
              label: "Project Manager",
              value: data.assigned_to?.name,
            },
            {
              label: "Project Teamlead",
              value: data.project_assigned_to_teamlead,
            },
            {
              label: "Operation Team",
              value: data.operation_team || "N/A",
            },
            {
              label: "Finance Team",
              value: data.finance_team || "N/A",
            },
            {
              label: "Tentative Start Date",
              value: data.tentative_start_date?.split("T")[0],
            },
            {
              label: "Tentative End Date",
              value: data.tentative_end_date?.split("T")[0],
            },
            { label: "Sample", value: data.sample },
            {
              label: "Achiev Target",
              value: data.total_achievement,
            },
            {
              label: "Total Man Days",
              value: data.man_days,
              hasDetails: true,
            },
            { label: "Cost Per Interview", value: data.cpi },
            {
              label: "Other Cost",
              value: data.other_cost || "N/A",
            },
            { label: "Set Up Fee", value: data.set_up_fee },
            {
              label: "Translation Cost",
              value: data.transaction_fee || "N/A",
            },
            { label: "Status", value: data.status },
            {
              label: "Sow",
              value: data.documents.map((d) => d.upload_document) && (
                <div className="flex">
                  <Link
                    to={BASEURL + data.documents.map((d) => d.upload_document)}
                    target="_blank"
                  >
                    <img
                      src={
                        BASEURL + data.documents.map((d) => d.upload_document)
                      }
                      className="w-8 h-8"
                      alt="sow file"
                    />
                    <span className="absolute top-1 right-1 cursor-pointer underline text-blue-700">
                      View
                    </span>
                  </Link>
                </div>
              ),
            },
          ].map(({ label, value, hasDetails }, index) =>
            renderListItem(label, value, index, hasDetails)
          )}
        </ul>
      )}
      {isManDaysDetails && (
        <Popup>
          <div
            className={`${darkMode ? "bg-black text-white" : "bg-gray-300"}`}
          >
            <h3
              className={`${
                darkMode ? "bg-black text-white" : "bg-white"
              } text-xl mt-4 p-2 `}
            >
              Day wise Detail View of achieving Target and Men-days utilization
              for Targeted Sample Size:
              <span className="font-bold">{' "' + data.sample + '" '}</span>
            </h3>
            <ManDaysDetails perDayDetailsData={perDayDetailsData} />
            <div className="absolute top-3 right-1 p-0 m-0 rounded w-8 h-8 flex items-center justify-center text-xl">
              <button
                onClick={handleCloseManDaysDetails}
                className="bg-red-400 hover:bg-red-500 rounded-md text-white p-1"
              >
                X
              </button>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default ViewProjectDetails;
