import React, { useState } from "react";

const MultipleValueDropDown = ({
  onChange,
  className,
  options,
  defaultValue,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(
    defaultValue?.map((opt) => opt.value) || []
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectOption = (value) => {
    let updatedSelectedOptions;
    if (selectedOptions.includes(value)) {
      updatedSelectedOptions = selectedOptions.filter(
        (option) => option !== value
      );
    } else {
      updatedSelectedOptions = [...selectedOptions, value];
    }
    setSelectedOptions(updatedSelectedOptions);
    onChange(updatedSelectedOptions);
  };

  const handleRemoveOption = (value) => {
    const updatedSelectedOptions = selectedOptions.filter(
      (option) => option !== value
    );
    setSelectedOptions(updatedSelectedOptions);
    onChange(updatedSelectedOptions);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Selected Items */}
      <div
        className="w-full p-2 border rounded-md bg-white cursor-pointer"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        {selectedOptions.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedOptions.map((selected) => {
              const optionLabel = options.find(
                (opt) => opt.value === selected
              )?.label;
              return (
                <span
                  key={selected}
                  className="flex items-center px-2 py-1 text-sm text-white bg-blue-500 rounded"
                >
                  {optionLabel}
                  <button
                    className="ml-1 text-white hover:text-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveOption(selected);
                    }}
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        ) : (
          <span className="text-gray-400">Select options...</span>
        )}
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-md">
          {options.map((option) => (
            <div
              key={option.value}
              className={`flex items-center px-2 py-2 cursor-pointer hover:bg-blue-100 ${
                selectedOptions.includes(option.value) ? "bg-blue-50" : ""
              }`}
              onClick={() => handleSelectOption(option.value)}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleSelectOption(option.value)}
                className="mr-2"
              />
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultipleValueDropDown;
