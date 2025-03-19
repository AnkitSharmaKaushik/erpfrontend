import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LableAndInput from "../../Molecules/LableAndInput";
import { patchWithAuth } from "../../provider/helper/axios";
import { EDITPROJECTREQUEST } from "../../../utils/constants/urls";
import Loader from "../../Atom/Loader";
import SweetAlert from "../../components/SweetAlert";
import { ProjectData } from "../../../utils/apis/projectData";
import { setProjects } from "../../../utils/slices/projectSlice";
import Popup from "../../Atom/Popup";
import { getMinDate } from "../../../utils/helperFunction/dateLimit";
import { DateValidationForWeekend } from "../../../utils/helperFunction/dateValidationForWeekend";
import { addNotification } from "../../../utils/slices/notificationSlice";
import { notificationCount } from "../../../utils/apis/notificationCount";
import { toggleIsEdit } from "../../../utils/slices/dataTableSlice";
import ProjectSamplesTable from "./ProjectMultipleSampleTable";

const ProjectSampleEditRequest = () => {
  const { page_number, page_size, activeTab, projects } = useSelector(
    (store) => store.projectData
  );
  const { selectedRecord } = useSelector((store) => store.dataTable);
  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);

  const dispatch = useDispatch();

  const [showDate, setShowDate] = useState(selectedRecord?.tentative_end_date);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [fieldUpdates, setFieldUpdates] = useState({});
  const [updatedSampleCpi, setUpdatedSampleCpi] = useState([]);
  const [errors, setErrors] = useState({});

  const currentProject = projects.filter(
    (item) => item.id === selectedRecord?.id
  );
  const isMultipleSample = currentProject?.flatMap(
    (item) => item?.project_samples
  );

  const TotalSampleSize = updatedSampleCpi?.reduce((acc, item) => {
    return acc + Number(item.sample);
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "tentative_end_date") {
      const { errorMsg, selectedDate } = DateValidationForWeekend(
        value,
        selectedRecord.tentative_start_date
      );
      setErrors((prevErrors) => ({
        ...prevErrors,
        tentative_end_date: errorMsg,
      }));
      setShowDate(value);
      setFieldUpdates((prevUpdates) => ({
        ...prevUpdates,
        tentative_end_date: selectedDate.toISOString(),
      }));
    } else if (name === "sample") {
      setFieldUpdates((prevUpdates) => ({
        ...prevUpdates,
        sample: value === "" ? "" : Number(value),
      }));
    } else if (name === "remark") {
      setFieldUpdates({
        ...fieldUpdates,
        remark: value,
      });
    }
  };

  const handleCancelUpdate = () => {
    dispatch(toggleIsEdit());
    document.body.classList.remove("DrawerBody");
  };

  const validateFields = () => {
    const errorMsg = {};
    if (isMultipleSample.length > 1) {
      if (!updatedSampleCpi?.every((item) => item.remark)) {
        errorMsg = "Reason for adjustment is required for all samples.\n";
      }
    } else {
      if (!fieldUpdates?.remark) {
        errorMsg.remark = "Reason for adjustment is required.\n";
      }
    }

    return errorMsg;
  };

  const PostUpdateEditData = async (data) => {
    setLoader(true);
    const response = await patchWithAuth(
      EDITPROJECTREQUEST(selectedRecord?.id),
      data
    );
    if (response.status === true) {
      setLoader(false);
      SweetAlert({
        title: "Edit Request Sent Successfully",
        text: "",
        icon: "success",
      });
      dispatch(toggleIsEdit());
      const response = await notificationCount();
      dispatch(addNotification(response));
      const projectData = await ProjectData(page_number, page_size, activeTab);
      dispatch(setProjects(projectData?.results));
    } else {
      SweetAlert({
        title: response?.ex?.response?.data?.error,
        text: "",
        icon: "info",
      });
      setLoader(false);
      dispatch(toggleIsEdit());
    }
    dispatch(addNotification(response?.data));
  };

  const handleEditUpdate = () => {
    const tentativeEndDate =
      fieldUpdates?.tentative_end_date ||
      currentProject.flatMap((item) => item.tentative_end_date)[0];

    const formattedData =
      isMultipleSample.length > 1
        ? isMultipleSample.map((item, index) => ({
            id: item.id,
            project: item.project || currentProject[0]?.id,
            sample: updatedSampleCpi[index]?.sample || item.sample,
            cpi: updatedSampleCpi[index]?.cpi || item.cpi,
            target_group:
              updatedSampleCpi[index]?.target_group || item.target_group,
            tentative_end_date: tentativeEndDate,
            remark:
              updatedSampleCpi[index]?.remark ||
              fieldUpdates?.remark ||
              item.remark,
          }))
        : [
            {
              id: isMultipleSample[0]?.id,
              project: currentProject[0]?.id,
              sample: fieldUpdates.sample || isMultipleSample[0]?.sample,
              cpi: isMultipleSample[0]?.cpi,
              target_group: isMultipleSample[0]?.target_group,
              tentative_end_date: tentativeEndDate,
              remark: fieldUpdates.remark || isMultipleSample[0]?.remark,
            },
          ];
    const err = validateFields();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      PostUpdateEditData(formattedData);
    }
  };

  const handlePopupClose = (updatedData) => {
    setIsPopupVisible(false);
    if (updatedData) {
      setUpdatedSampleCpi(updatedData);
    }
  };

  const checkIfMultipleSample = (e) => {
    if (isMultipleSample.length > 1) {
      if (e.target.name === "sample") {
        setIsPopupVisible(true);
      }
    }
  };

  const combinedRemarks = updatedSampleCpi
    ?.map((data) => data.remark)
    .join(", ");

  const allInputField = [
    {
      name: "Project Name",
      type: "text",
      placeHolder: "Project Name",
      value: selectedRecord?.name,
      disabled: true,
    },
    {
      name: "Date End Required(Tentative)",
      type: "date",
      placeHolder: "Date",
      value: showDate,
      disabled: false,
      id: "tentative_end_date",
      errors: errors.tentative_end_date,
    },
    {
      name: "Revised Target Required (Sample)",
      type: "number",
      placeHolder: "Revised Target Required (Sample)",
      value:
        isMultipleSample.length > 1
          ? TotalSampleSize
          : fieldUpdates.sample ?? selectedRecord.sample ?? "",
      id: "sample",
      errors: errors.update_date,
    },
    {
      name: "Remark",
      type: "text",
      placeHolder: "Remark",
      id: "remark",
      value: combinedRemarks || fieldUpdates?.remark || "",
      disabled: false,
      errors: errors.remark,
    },
  ];

  return (
    <Popup>
      <div
        className={`${
          darkMode ? "bg-black text-white" : "bg-gray-50 text-black"
        }`}
      >
        <h3 className="text-xl underline py-4">Project Edit Request</h3>
        <div className="grid grid-cols-2 gap-4 w-full p-4 pt-0 rounded-md">
          {allInputField.map(
            ({ name, type, value, disabled, placeHolder, errors, id }, ind) => {
              return (
                <div key={ind} className="">
                  <LableAndInput
                    labelName={name}
                    InputType={type}
                    InputName={id}
                    inputClassName={`${
                      disabled == true
                        ? "cursor-not-allowed bg-[#f3eded]"
                        : "bg-white"
                    } p-2 border rounded-md`}
                    labelClassName={"pt-4 pb-2 text-left"}
                    inputValue={value}
                    disabled={disabled}
                    inputChange={handleInputChange}
                    inputOnFocus={checkIfMultipleSample}
                    placeholder={placeHolder}
                  />
                  {errors && (
                    <p className="text-red-500 text-xs text-left">{errors}</p>
                  )}
                </div>
              );
            }
          )}
        </div>

        {/* Modal */}
        {isPopupVisible && (
          <Popup>
            <ProjectSamplesTable
              onClose={handlePopupClose}
              projectSamples={isMultipleSample}
            />
          </Popup>
        )}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleEditUpdate}
            className={
              "bg-green-400 p-4 m-2 w-1/4 rounded text-white text-center hover:bg-green-500"
            }
          >
            Update
          </button>
          <button
            onClick={handleCancelUpdate}
            className={
              "bg-red-400 p-4 m-2 w-1/4 rounded text-white text-center hover:bg-red-500"
            }
          >
            Cancel
          </button>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {loader ? <Loader /> : ""}
        </div>
      </div>
    </Popup>
  );
};

export default ProjectSampleEditRequest;
