import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdDownload } from "react-icons/md";
import { BASEURL } from "../../../utils/constants/urls";
import Tooltip from "../../components/Tooltip";
import { toggleShowSowList } from "../../../utils/slices/dataTableSlice";

const ViewSowUploadList = () => {
  const ProjectResponse = useSelector((store) => store.projectData.projects);
  const selectedRow = useSelector((store) => store.dataTable);

  const dispatch = useDispatch();

  const handleCloseSowView = () => {
    dispatch(toggleShowSowList());
  };

  const SowList = ProjectResponse?.filter(
    (item) => item.id === selectedRow.sowList.id
  );

  const handlePdfOpen = (filePath) => {
    window.open(BASEURL + filePath, "_blank");
  };

  return (
    <div className="relative p-4">
      <table className="min-w-full bg-white">
        <thead className="bg-[#bd1d1d] text-white">
          <tr>
            <th className="py-3 px-6 text-left">Project Name</th>
            <th className="py-3 px-6 text-left">Document Name</th>
            <th className="py-3 px-6 text-left">Download/View</th>
          </tr>
        </thead>
        <tbody>
          {SowList.map((item) =>
            item.documents.map((doc) => {
              const fileName = decodeURIComponent(
                doc?.upload_document?.split("/")?.pop()
              );
              const fileExtension = doc.upload_document
                ?.split(".")
                ?.pop()
                ?.toLowerCase();

              return (
                <tr
                  key={doc.id}
                  className="border-b hover:bg-gray-100 transition duration-200 ease-in-out"
                >
                  <td className="py-3 px-6 text-left">{item.name}</td>
                  <td className="py-3 px-6 text-left">{fileName}</td>
                  <td className="py-3 px-6 text-left">
                    {fileExtension === "pdf" ||
                    fileExtension === "png" ||
                    fileExtension === "jpg" ||
                    fileExtension === "jpeg" ? (
                      <button
                        onClick={() => handlePdfOpen(doc.upload_document)}
                        className="text-blue-500 underline"
                      >
                        <Tooltip text="Open PDF" className="!left-2">
                          Open PDF
                        </Tooltip>
                      </button>
                    ) : fileExtension === "csv" ||
                      fileExtension === "xlsx" ||
                      fileExtension === "xls" ? (
                      <Link to={BASEURL + doc.upload_document} download>
                        <Tooltip text="Download File" className="!left-2">
                          <MdDownload />
                        </Tooltip>
                      </Link>
                    ) : (
                      <span>Unsupported file type</span>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div
        className="cursor-pointer absolute -top-4 bg-red-400 -right-[15px] p-1 text-white font-bold hover:bg-red-600 rounded-md transition duration-150 text-sm"
        onClick={handleCloseSowView}
      >
        X
      </div>
    </div>
  );
};

export default ViewSowUploadList;
