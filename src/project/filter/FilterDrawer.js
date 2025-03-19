import React, { useState, useEffect, useRef, useMemo } from "react";
import Accordion from "../../components/Accordian";
import FilterOptionSelected from "./FilterOptionSelected";
import { useSelector, useDispatch } from "react-redux";
import useUserData from "../../../utils/hooks/useUserData";
import {
  removeAllSelectedOption,
  toggleFilterOption,
} from "../../../utils/slices/filterSlice";
import { useHandleOutsideClick } from "../../../utils/hooks/useHandleOutSideClick";
import {
  addSelectedAssManager,
  addSelectedHod,
  addSelectedManager,
  addSelectedSrManager,
  addSelectedTeamlead,
} from "../../../utils/slices/selectedUserFilterSlice";

const FilterDrawer = () => {
  const { filterOption, openFilter } = useSelector(
    (store) => store.filterSlice
  );
  const clientsList = useSelector((store) => store.projectData.clients);
  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);
  const dispatch = useDispatch();
  const userData = useUserData();

  const filterDrawer = useRef();
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const [selectedItems, setSelectedItems] = useState({
    HOD: null,
    "Sr.Manager": null,
    Manager: null,
    "Ass.Manager": null,
    "Team Lead": null,
    Client: null,
  });

  const roleFilterMap = {
    HOD: addSelectedHod,
    "Sr.Manager": addSelectedSrManager,
    Manager: addSelectedManager,
    "Ass.Manager": addSelectedAssManager,
    "Team Lead": addSelectedTeamlead,
  };

  const filterByRole = (roleName, reportsTo) => {
    return userData.filter(
      (item) =>
        item?.role?.name === roleName &&
        (!reportsTo || item?.reports_to?.name === reportsTo)
    );
  };

  const filteredLists = useMemo(() => {
    const filters = {};
    const reportTo = role === "Director" ? null : username;

    Object.keys(roleFilterMap).forEach((roleKey) => {
      const parentRole = Object.keys(selectedItems).find(
        (key) => selectedItems[key]
      );
      const parentReportsTo = selectedItems[parentRole];

      filters[roleKey] = filterByRole(roleKey, parentReportsTo || reportTo);
    });

    return filters;
  }, [role, username, selectedItems, userData]);

  const handleAccordionToggle = (index) => {
    setOpenAccordionIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const closeDrawerRight = () => {
    document.body.classList.remove("DrawerBody");
    dispatch(toggleFilterOption());
  };
  useHandleOutsideClick(filterDrawer, closeDrawerRight);

  const handleClearAllSelection = () => {
    dispatch(removeAllSelectedOption());
    setSelectedItems({
      HOD: null,
      "Sr.Manager": null,
      Manager: null,
      "Ass.Manager": null,
      "Team Lead": null,
    });
  };

  const accordionData = [
    { title: "Client", options: clientsList?.map((item) => item.name) },
    ...Object.keys(filteredLists).map((key) => ({
      title: key,
      options: filteredLists[key]?.map((item) => item?.user_role?.name),
    })),
  ];

  const visibleAccordionsByRole = {
    Director: ["Client", "HOD", "Sr.Manager", "Manager", "Ass.Manager"],
    HOD: ["Client", "Sr.Manager", "Manager", "Ass.Manager", "Team Lead"],
    "Sr.Manager": ["Client", "Manager", "Ass.Manager", "Team Lead"],
    Manager: ["Client", "Ass.Manager", "Team Lead"],
    "Ass.Manager": ["Client", "Team Lead"],
    "Team Lead": ["Client"],
  };

  const visibleAccordions = visibleAccordionsByRole[role] || [];

  return (
    <div>
      {openFilter && (
        <div
          className={`${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          } fixed top-0 right-0 w-full max-w-md h-full shadow-lg z-50 p-4 transition-all no-scrollbar`}
          ref={filterDrawer}
        >
          <div>
            <h1 className="text-blue-500 pb-4 font-bold text-xl">
              Filter Project
            </h1>
            <FilterOptionSelected
              selectedOptions={filterOption.selectedOption}
              handleClearAllSelection={handleClearAllSelection}
            />
            {accordionData
              .filter((accordion) =>
                visibleAccordions.includes(accordion.title)
              )
              .map((accordion, index) => (
                <Accordion
                  key={index}
                  title={accordion.title}
                  options={accordion.options}
                  name={accordion.title}
                  isOpen={openAccordionIndex === index}
                  onToggle={() => handleAccordionToggle(index)}
                  selectedOptions={filterOption.selectedOption}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDrawer;
