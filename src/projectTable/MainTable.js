import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableColumn } from "./TableColumn";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableData } from "./TableData";
import Popup from "../Atom/Popup";
import ViewMultipleSampleCpi from "../project/view/ViewMultipleSampleCpi";
import ViewSowUploadList from "../project/view/ViewSowUploadList";
import Pagination from "./Pagination";
import ProjectSampleEditRequest from "../operation/projectSampleEditRequest/projectSampleEditRequest";
import AddManDaysInduvisual from "../operation/addManDays/AddManDaysInduvisual";
import UpdateStatus from "../operation/updateStatus/UpdateStatus";
import UpdateSow from "../sales/updateSow/UpdateSow";
import { addPageSize } from "../../utils/slices/projectSlice";
import RaiseCbr from "../operation/raiseCbr/RaiseCbr";
import ViewCbr from "../project/view/ViewCbr";

const MainTable = () => {
  const dispatch = useDispatch();
  const { isViewMultipleSampleCpiRecords } = useSelector(
    (store) => store.addMultipleSampleCpi
  );
  const {
    showSowList,
    isEdit,
    changeProjectStatus,
    isAddManDays,
    isUploadSow,
    isRaiseCbr,
    isViewCbr
  } = useSelector((store) => store.dataTable);
  const { page_size, page_number, projects } = useSelector(
    (store) => store.projectData
  );
  const [pagination, setPagination] = useState({
    page_number,
    page_size,
  });
  const listInnerRef = useRef();
  const [rowSelection, setRowSelection] = useState([]);

  const currentDate = new Date().toISOString().split("T")[0];

  const data = TableData();
  const columns = TableColumn();

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: (row) => {
      let enableDate =
        new Date(row.original.tentative_end_date) >= new Date(currentDate);
      let enableStatus =
        row.original.status !== "CBR Raised" &&
        row.original.status !== "Completed";
      return enableDate && enableStatus;
    },
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },

    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    getRowCanSelect: (row) => {
      let enableDate =
        new Date(row.original.tentative_end_date) >= new Date(currentDate);
      let enableStatus =
        row.original.status !== "CBR Raised" ||
        row.original.status !== "Completed";
      return enableDate && enableStatus;
    },
  });

  const onScrollLoadProjectData = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        dispatch(addPageSize(page_size + 10));
      }
    }
  };

  return (
    <div className="rounded-sm overflow-auto">
      <div
        className={`${data.length > 20 ? "h-[800px]" : "h-auto"} overflow-auto`}
        onScroll={onScrollLoadProjectData}
        ref={listInnerRef}
      >
        <table className="rounded-sm text-xs w-full h-full text-center overflow-visible relative">
          <thead className="sticky top-0 z-30">
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
      {isEdit && (
        <Popup>
          <ProjectSampleEditRequest />
        </Popup>
      )}
      {isAddManDays && (
        <Popup>
          <AddManDaysInduvisual />
        </Popup>
      )}
      {changeProjectStatus && (
        <Popup>
          <UpdateStatus />
        </Popup>
      )}
      {isUploadSow && (
        <Popup>
          <UpdateSow />
        </Popup>
      )}
      {isRaiseCbr && (
        <Popup className={"!w-2/3"}>
          <RaiseCbr />
        </Popup>
      )}
      {isViewCbr && (
        <Popup className={"!w-2/3"}>
          <ViewCbr />
        </Popup>
      )}
    </div>
  );
};

export default MainTable;
