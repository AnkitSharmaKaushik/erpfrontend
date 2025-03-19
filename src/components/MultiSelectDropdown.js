import React, { useState, useEffect, useRef } from "react";
import useGetTeamLeadUnderManager from "../../utils/hooks/useGetTeamLeadUnderManagers";

const MultiSelectDropdown = ({ selectedOptions = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [localSelectedOptions, setLocalSelectedOptions] = useState(
    selectedOptions
  );

  const userrole = localStorage.getItem("userrole");
  const teamleads = useGetTeamLeadUnderManager(userrole);
  const options = teamleads.map((user) => user?.label);

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (selectedOptions.length) {
      setLocalSelectedOptions(selectedOptions);
    }
  }, [selectedOptions]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionChange = (option) => {
    const updatedOptions = localSelectedOptions.includes(option)
      ? localSelectedOptions.filter((item) => item !== option)
      : [...localSelectedOptions, option];

    setLocalSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  const handleSelectAll = () => {
    const updatedOptions =
      localSelectedOptions.length === options.length ? [] : [...options];

    setLocalSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  return (
    <div className="relative w-64 text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-2 border border-gray-300 bg-white text-left rounded-md shadow-sm focus:outline-none"
      >
        {localSelectedOptions.length > 0
          ? localSelectedOptions.join(", ")
          : "Select Options"}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full border border-gray-300 bg-white rounded-md shadow-lg z-10">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none"
          />
          <label className="block px-3 py-2 cursor-pointer hover:bg-gray-100">
            <input
              type="checkbox"
              checked={localSelectedOptions.length === options.length}
              onChange={handleSelectAll}
              className="mr-2"
            />
            Select All
          </label>
          <div className="max-h-40 overflow-y-auto">
            {options
              .filter((option) =>
                option.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((option) => (
                <label
                  key={option}
                  className="block px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    checked={localSelectedOptions.includes(option)}
                    onChange={() => handleOptionChange(option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;

