import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CbrProjectTableData } from "./CbrProjectTableData";
import { CbrProjectColumn } from "./CbrProjectColumn";
import Pagination from "../../../projectTable/Pagination";
import ViewSowUploadList from "../../../project/view/ViewSowUploadList";
import ViewMultipleSampleCpi from "../../../project/view/ViewMultipleSampleCpi";
import Popup from "../../../Atom/Popup";
import ViewCbr from "../../../project/view/ViewCbr";

const CbrTable = () => {
  const { isViewMultipleSampleCpiRecords } = useSelector(
    (store) => store.addMultipleSampleCpi
  );
  const { showSowList, isViewCbr } = useSelector((store) => store.dataTable);
  const { page_size, page_number } = useSelector((store) => store.projectData);
  const [pagination, setPagination] = useState({
    page_number,
    page_size,
  });

  const data = CbrProjectTableData();
  const columns = CbrProjectColumn();

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div className="rounded-sm overflow-auto">
      <div className="overflow-auto">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Pagination /> */}
      {isViewMultipleSampleCpiRecords && (
        <Popup>
          <ViewMultipleSampleCpi />
        </Popup>
      )}
      {showSowList && (
        <Popup>
          <ViewSowUploadList />
        </Popup>
      )}
      {isViewCbr && (
        <Popup>
          <ViewCbr />
        </Popup>
      )}
    </div>
  );
};

export default CbrTable;
