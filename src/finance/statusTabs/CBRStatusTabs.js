import React from "react";
import Button from "../../Atom/Button";
import { useDispatch,useSelector } from "react-redux";
import { setCbrActiveTabs } from "../../../utils/slices/financeDepartmentSlice";

const CBRStatusTabs = ({ className }) => {
  const dispatch = useDispatch();
  const { cbrActiveTabs } = useSelector((store) => store.financeDepartment);
  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);

  const handleActiveTab = (e) => {
    dispatch(setCbrActiveTabs(e.target.value));
  };
  const allButtons = [
    { name: "Invoice to be Raised", value: "CBR Raised" },
    { name: "Invoice Generated", value: "Invoice Generated" },
    { name: "Payment Received", value: "Payment Received" },
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
                cbrActiveTabs == buttonValue[index]
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

export default CBRStatusTabs;
