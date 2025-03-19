import React from "react";

const Button = ({ onClick, className, name, type, value,disabled }) => {
  return (
    <button type={type} onClick={onClick} className={className} value={value} disabled={disabled}>
      {name}
    </button>
  );
};
export default Button;
