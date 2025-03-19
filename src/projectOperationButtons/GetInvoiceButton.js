import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const GetInvoiceButton = () => {
    const dispatch = useDispatch();
    const { selectedRecord } = useSelector((store) => store.dataTable);
      const navigate = useNavigate();
        const [isInvoice, setIsInvoice] = useState(false);
      
    
    const handleGetInvoice = (selectedRecord) => {
        setIsInvoice(true);
        navigate("/finance/invoice", { state: selectedRecord });
      };
  return (
    <div className="flex justify-center items-center">
 <button
    className="border-b border-black text-left bg-[#bd1d1d] text-white z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
    onClick={() => handleGetInvoice(selectedRecord)}
  >
    Get Invoice
  </button></div>
  )
}

export default GetInvoiceButton