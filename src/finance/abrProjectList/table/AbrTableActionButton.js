import React, { useRef } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import CreateInvoice from "../../invoice/CreateCbrInvoice";
import ViewProjectDetailsButton from "../../../projectOperationButtons/ViewProjectDetailsButton";
import GetInvoiceButton from "../../../projectOperationButtons/GetInvoiceButton";
import CanUserView from "../../../config/allowUserCanAccess/CanUserView";
import { useHandleOutsideClick } from "../../../../utils/hooks/useHandleOutSideClick";
import { canAcessProjectAction } from "../../../config/allowRole/canAcessProjectAction";
import {
  setIsViewOptionIndex,
  setOpenDropdownIndex,
  setSelectedIndex,
  setSelectedRecord,
  toggleIsViewOptionOpen,
} from "../../../../utils/slices/dataTableSlice";
import GenerateInvoiceButton from "../../../projectOperationButtons/GenerateInvoiceButton";

const AbrTableActionButton = ({ record, index }) => {
  const dispatch = useDispatch();
  const buttonRef = useRef();
  const { openDropdownIndex } = useSelector((store) => store.dataTable);
  const pageSize = useSelector((store) => store.projectData?.page_size);

  const handleAddEditOperation = (record, index) => {
    dispatch(setOpenDropdownIndex(openDropdownIndex == index ? -1 : index));
    dispatch(setIsViewOptionIndex(index));
    dispatch(toggleIsViewOptionOpen());
    dispatch(setSelectedIndex(index));
    dispatch(setSelectedRecord(record));
  };
  const handleClose = () => {
    dispatch(setOpenDropdownIndex(-1));
  };
  const close = useHandleOutsideClick(buttonRef, handleClose);

  return (
    <div className="relative w-full overflow-y-visible">
      <div className="flex items-center overflow-visible relative">
        <button
          onClick={() => handleAddEditOperation(record, index)}
          className="border p-2 rounded-md mr-2 cursor-pointer"
        >
          <MdOutlineMoreVert />
        </button>
        {openDropdownIndex == index && (
          <div
            ref={buttonRef}
            onClick={(e) => e.stopPropagation()}
            className={`${
              index > pageSize - 3 ? "bottom-0" : "top-0"
            } absolute w-24 right-16 z-50`}
          >
            <ViewProjectDetailsButton />
            {record.status !== "Advanced Invoice Generated" && (
              <CanUserView
                element={<GenerateInvoiceButton name={"ABR"}/>}
                allowDepartments={
                  canAcessProjectAction.generateInvoice.department
                }
                allowedRoles={canAcessProjectAction.generateInvoice.role}
              />
            )}
            {record.status === "Invoice Generated" && (
              <CanUserView
                element={<GetInvoiceButton />}
                allowDepartments={canAcessProjectAction.getInvoice.department}
                allowedRoles={canAcessProjectAction.getInvoice.role}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AbrTableActionButton;
