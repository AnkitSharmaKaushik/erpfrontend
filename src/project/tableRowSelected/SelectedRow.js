import React from "react";
import Button from "../../Atom/Button";
import { toggleIsDrawerOpen } from "../../../utils/slices/dataTableSlice";
import { useDispatch, useSelector } from "react-redux";
import { canAccessAddManDaysButton } from "../../config/allowRole/canAccessAddManDaysButton";
import { canAccessAssignProjectButton } from "../../config/allowRole/canAccessAssignProjectButton";
import CanUserView from "../../config/allowUserCanAccess/CanUserView";

const SelectedRow = ({ setDrawerContent, setMultiEditFieldOpen }) => {
  const { isDrawerOpen, isMultiEdit, selectedRow } = useSelector(
    (store) => store.dataTable
  );
  const dispatch = useDispatch();

  const handleAddManDays = () => {
    setDrawerContent("AddManDays");
    dispatch(toggleIsDrawerOpen());
    setMultiEditFieldOpen(true);
    document.body.classList.toggle("DrawerBody");
  };

  const handleAssignProject = () => {
    setDrawerContent("AssignProject");
    setMultiEditFieldOpen(true);
    dispatch(toggleIsDrawerOpen());
    document.body.classList.toggle("DrawerBody");
  };

  return (
    <>
      {isMultiEdit && (
        <div
          className={`${
            isMultiEdit
              ? "AddManDaysAnimation opacity-100 flex items-center justify-left bg-[#bd1d1d] border absolute right-0 top-[-0.3rem] w-full p-2"
              : " opacity-0"
          } z-20`}
        >
          <span className="text-white text-xl">
            row selected ({selectedRow.length})
          </span>
          <CanUserView
            element={
              <Button
                name={"Add Man Days"}
                className={
                  "p-2 bg-yellow-200 border rounded-lg border-black ml-4"
                }
                onClick={handleAddManDays}
              />
            }
            allowDepartments={canAccessAddManDaysButton.department}
            allowedRoles={canAccessAddManDaysButton.role}
          />
          <div>
            <CanUserView
              element={
                <Button
                  name={"Assign Project"}
                  className={
                    "p-2 bg-yellow-200 border rounded-lg border-black ml-4"
                  }
                  onClick={handleAssignProject}
                />
              }
              allowDepartments={canAccessAssignProjectButton.department}
              allowedRoles={canAccessAssignProjectButton.role}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedRow;
