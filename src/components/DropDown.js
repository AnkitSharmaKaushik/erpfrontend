import React, { useContext, useEffect, useState } from "react";
import Button from "../Atom/Button";
import AddClient from "../sales/createProject/Form/AddClient";
import { TiPlus } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../Atom/Popup";
import { toggleAddClient } from "../../utils/slices/projectSlice";

const Dropdown = ({
  className,
  onChange,
  Option_Name,
  RequireAddButton,
  name,
  multiple,
  defaultValue,
  selectedOption,
  id,
}) => {
  const { isAddClient } = useSelector((store) => store.projectData);
  const dispatch = useDispatch();
  const [addOptionValue, setAddOptionValue] = useState("");
  const [requireAddButton] = useState(RequireAddButton);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
  const [addOptionItem, setAddOptionItem] = useState([]);

  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);

  useEffect(() => {
    setAddOptionItem(Option_Name?.slice());
  }, [Option_Name]);

  const OpenOptionFieldHandler = (e) => {
    e.preventDefault();
    setAddOptionValue("");
    dispatch(toggleAddClient());
  };

  const HandleDropdownonChange = (e) => {
    const value = e.target.value;
    onChange(name, value);
    setSelectedDropdownValue(value);
  };

  return (
    <div className="w-full">
      <div className="relative flex p-1">
        <select
          className={
            `${darkMode && "bg-black border-white"} rounded-full p-2 ` +
            className
          }
          onChange={HandleDropdownonChange}
          name={name}
          multiple={multiple}
          value={selectedOption}
          id={id}
        >
          {addOptionItem?.map((option, index) => {
            return (
              <option key={index} className="p-4 text-xl" value={option}>
                {option?.charAt(0)?.toUpperCase() + option?.slice(1)}
                {defaultValue}
              </option>
            );
          })}
        </select>
        {requireAddButton && (
          <button
            onClick={OpenOptionFieldHandler}
            className="bg-green-300 rounded-md rounded-l-none p-2"
          >
            <TiPlus />
          </button>
        )}
      </div>

      {isAddClient && (
        <Popup>
          <AddClient />
          <Button
            name="X"
            className="absolute top-3 right-3 bg-red-400 p-2 rounded-md text-white hover:bg-red-600"
            onClick={() => {
              dispatch(toggleAddClient());
            }}
          />
        </Popup>
      )}
    </div>
  );
};

export default Dropdown;
