import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useUserData from "../../../utils/hooks/useUserData";
import { toggleIsOpenFilterDrawer } from "../../../utils/slices/filterSlice";
import {
  addInvoiceAge,
  addInvoiceStatus,
  addSalesPerson,
} from "../../../utils/slices/reportSlice";

const ProjectReportFilterDrawer = () => {
  const { openFilterDrawer } = useSelector((store) => store.filterSlice);
  const { invoiceStatus, invoiceAge, salesPerson } = useSelector(
    (store) => store.ReportSlice
  );
  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);
  const dispatch = useDispatch();

  const filterDrawer = useRef();

  const users = useUserData();

  const invoiceStatusItems = [
    {
      name: "Pending Payments",
      value: "Invoice Generated",
    },
    {
      name: "Payment Received",
      value: "Payment Received",
    },
  ];

  const invoiceAgeItems = [
    {
      name: "Less than 15 Days",
    },
    {
      name: "15 days - 30 Days",
    },
    {
      name: "45 days - 60 Days",
    },
    {
      name: "More than 60 Days",
    },
  ];

  const salesPersonItems = users.filter(
    (u) => u?.department?.name === "Sales" && u?.role?.name === "HOD"
  );
  
  

  const handleFilter = (name, value) => {
    const actionMap = {
      salesPerson: addSalesPerson,
      invoiceStatus: addInvoiceStatus,
      invoiceAge: addInvoiceAge,
    };

    if (actionMap[name]) {
      dispatch(actionMap[name](value));
    }
  };
  const removethis = (name, value) => {
    if (name === "salesPerson") {
      const sales = salesPerson.filter((item) => {
        return item !== value;
      });
      dispatch(addSalesPerson(sales));
    }
    if (name === "invoiceAge") {
      const iAge = invoiceAge.filter((item) => {
        return item !== value;
      });
      dispatch(addInvoiceAge(iAge));
    } else {
      dispatch(addInvoiceStatus(null));
    }
  };
  return (
    <div className="text-left">
      {openFilterDrawer && (
        <div
          className={`${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          } fixed top-0 right-0 w-full max-w-md h-full shadow-lg z-50 p-4 transition-all no-scrollbar`}
          ref={filterDrawer}
        >
          <button
            className="bg-red-300 absolute right-2 top-2 p-2 rounded-md hover:bg-red-400 text-white"
            onClick={() => dispatch(toggleIsOpenFilterDrawer())}
          >
            Close
          </button>

          <div>
            <h1 className="text-blue-500 pb-4 font-bold text-xl border-b">
              Filter Project
            </h1>
            <div className="p-2 border-b">
              <ul className="flex flex-wrap">
                {salesPerson.map((p) => {
                  return (
                    <li
                      className="border p-1 rounded-md bg-gray-300 m-1"
                      key={p}
                    >
                      <span
                        className="cursor-pointer p-1 rounded-md mr-2"
                        onClick={() => removethis("salesPerson", p)}
                      >
                        X
                      </span>
                      {p}
                    </li>
                  );
                })}
                {invoiceAge.map((p) => {
                  return (
                    <li
                      className="border p-1 rounded-md bg-gray-300 m-1"
                      key={p}
                    >
                      <span
                        className="cursor-pointer p-1 rounded-md mr-2"
                        onClick={() => removethis("invoiceAge", p)}
                      >
                        X
                      </span>
                      {p}
                    </li>
                  );
                })}
                {invoiceStatus && (
                  <li className="border p-1 rounded-md bg-gray-300 m-1">
                    <span
                      className="cursor-pointer p-1 rounded-md mr-2"
                      onClick={() => removethis("invoiceStatus", invoiceStatus)}
                    >
                      X
                    </span>
                    {invoiceStatus === "Invoice Generated" ? "Pending Payments" : invoiceStatus}
                  </li>
                )}
              </ul>
            </div>
            <div className="border-b p-2">
              <p>Invoice Status :</p>
              <div className="flex flex-wrap">
                {invoiceStatusItems.map((value, index) => {
                  return (
                    <button
                      name="invoiceStatus"
                      key={index}
                      className="bg-gray-300 rounded-md p-2 m-1"
                      onClick={() => handleFilter("invoiceStatus", value.value)}
                      value={value.value}
                    >
                      {value.name}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="border-b p-2">
              <p>Invoice Age :</p>
              <div className="flex flex-wrap">
                {invoiceAgeItems.map((value, index) => {
                  return (
                    <button
                      key={index}
                      name="invoiceAge"
                      value={value.name}
                      className="bg-gray-300 rounded-md p-2 m-1"
                      onClick={() => handleFilter("invoiceAge", value.name)}
                    >
                      {value.name}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="p-2">
              <p>Sales Person :</p>
              <div className="flex flex-wrap">
                {salesPersonItems.map((value, index) => {
                  return (
                    <button
                      key={index}
                      name="salesPerson"
                      className="bg-gray-300 rounded-md p-2 m-1"
                      onClick={() =>
                        handleFilter("salesPerson", value.user?.name)
                      }
                      value={value?.user?.name}
                    >
                      {value?.user?.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectReportFilterDrawer;
