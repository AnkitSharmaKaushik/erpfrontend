import React, { useState } from "react";

const CheckboxList = ({onCheckboxChange,label,checked }) => {


  return (
    <div>
        <div className="mt-2">
          <input
            type="checkbox"
            name={label}
            checked={checked}
            onChange={onCheckboxChange}
            className="mr-4"
          />
          <label>{label}</label>
        </div>
    </div>
  );
};

export default CheckboxList;
