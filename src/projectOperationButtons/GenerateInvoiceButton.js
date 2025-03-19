import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleIsCreateInvoice } from "../../utils/slices/financeDepartmentSlice";

const GenerateInvoiceButton = () => {
  const dispatch = useDispatch();
  const { selectedRecord } = useSelector((store) => store.dataTable);
  const navigate = useNavigate();

  const handleGenerateInvoice = (selectedRecord) => {
    // dispatch(toggleIsCreateInvoice())
    navigate("/finance/cbr/create-invoice");
  };
  return (
    <div className="flex justify-center items-center">
      <button
        className="border-b border-black text-left bg-[#bd1d1d] text-white z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
        onClick={() => handleGenerateInvoice(selectedRecord)}
      >
        Generate Invoice
      </button>
    </div>
  );
};

export default GenerateInvoiceButton;
