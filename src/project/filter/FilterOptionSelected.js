import React from "react";
import { useDispatch } from "react-redux";
import { toggleSelectedOption } from "../../../utils/slices/filterSlice";

const FilterOptionSelected = ({ selectedOptions, handleClearAllSelection }) => {
  const dispatch = useDispatch();

  const handleSingleCrossOption = (option) => {
    dispatch(toggleSelectedOption(option));
  };

  return (
    <div>
      <ul className="flex items-center flex-wrap pb-2">
        {selectedOptions?.map((value, index) => (
          <li
            className="p-1 px-2 m-1 bg-[#e0e0e0] rounded-sm text-sm cursor-pointer"
            key={index}
          >
            <span
              className="mr-2 cursor-pointer"
              onClick={() => handleSingleCrossOption(value)}
            >
              X
            </span>
            {value}
          </li>
        ))}

        {selectedOptions?.length > 1 && (
          <button
            className="p-1 px-2 m-1 bg-[#e0e0e0] rounded-sm text-sm cursor-pointer"
            onClick={handleClearAllSelection}
          >
            <span className="mr-2">X</span> Clear All
          </button>
        )}
      </ul>
    </div>
  );
};

export default FilterOptionSelected;
