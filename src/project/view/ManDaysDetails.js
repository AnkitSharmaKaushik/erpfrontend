import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useContext } from "react";

import { useSelector } from "react-redux";

const ManDaysDetails = ({ perDayDetailsData }) => {
  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);
  const columnHelper = createColumnHelper();


  if (!Array.isArray(perDayDetailsData)) {
    return <p className="p-4">No man days data available</p>;
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
  
    const getOrdinal = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
  
    return (
      <>
        {day}
        <sup className="mr-1">{getOrdinal(day)}</sup> {month} {year}
      </>
    );
  };

  const columns = [
    columnHelper.accessor("update_date", {
      id: "update_date",
      header: "Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("total_achievement", {
      id: "total_achievement",
      header: "Achieved Target",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("total_man_days", {
      id: "total_man_days",
      header: "Total Man",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("remaining_interview", {
      id: "remaining_interview",
      header: "Remaining Till Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("updated_by", {
      id: "updated_by",
      header: "Updated By",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("status", {
      id: "status",
      header: "Status",
      cell: (info) => info.getValue(),
    }),
  ];

  const data = perDayDetailsData.map((item, index) => ({
    id:item.id,
    update_date: formatDate(item?.update_date),
    total_achievement: item?.total_achievement,
    total_man_days: item?.total_man_days,
    remaining_interview: item?.remaining_interview,
    updated_by: item?.updated_by?.name,
    status: item?.status,
  }));

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div
      className={`${
        darkMode ? "w-full bg-black text-white" : "bg-white"
      } w-full p-2 mt-2 `}
    >
      <table className="rounded-sm text-xs w-full h-full text-center overflow-visible">
        <thead className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border border-gray-300  primary_color text-white"
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border border-gray-300 p-3">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-300 bg-white overflow-visible">
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={`border border-gray-300 ${
                rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-400 text-black transition duration-200`}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-2 py-1 border border-gray-300 text-xs text-gray-800 "
                >
                  <span className="text-center flex justify-center items-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <DataTable
        columns={columns}
        data={data}
        theme={darkMode ? "dark" : "default"}
        striped={true}
        customStyles={customStylesFormanDaysDetails
        }
        conditionalRowStyles={conditionalRowStyles}
        pagination
      /> */}
    </div>
  );
};

export default ManDaysDetails;
