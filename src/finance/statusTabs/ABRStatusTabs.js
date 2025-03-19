import React from "react";
import Button from "../../Atom/Button";
import { useDispatch, useSelector } from "react-redux";
import { setAbrActiveTabs } from "../../../utils/slices/financeDepartmentSlice";

const ABRStatusTabs = ({ className }) => {
  const dispatch = useDispatch();
  const { abrActiveTabs } = useSelector((store) => store.financeDepartment);
  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);

  const handleActiveTab = (e, index) => {
    dispatch(setAbrActiveTabs(e.target.value));
    // setActiveTabIndex(index);
  };
  const allButtons = [
    { name: "Advanced Billing Raised", value: "Advanced Billing Raised" },
    { name: "Advanced Invoice Generated", value: "Advanced Invoice Generated" },
    { name: "Advance Payment Received", value: "Advance Payment Received" },
  ];

  // Separate into buttonName and buttonValue arrays
  const buttonName = allButtons.map(({ name }) => name);
  const buttonValue = allButtons.map(({ value }) => value);

  return (
    <div className={className}>
      <div
        className={`${
          darkMode ? "bg-black text-white" : ""
        } relative flex overflow-x-auto no-scrollbar`}
      >
        <div className="flex flex-nowrap">
          {buttonName.map((item, index) => (
            <Button
              key={index}
              name={item}
              value={buttonValue[index]}
              className={`${
                abrActiveTabs == buttonValue[index]
                  ? "text-white bg-green-400"
                  : darkMode
                  ? "text-gray-400 hover:text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              } px-2 py-2 focus:outline-none transition-all duration-500 text-sm mr-2 bg-gray-100 rounded-md`}
              onClick={(e) => handleActiveTab(e, index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ABRStatusTabs;
