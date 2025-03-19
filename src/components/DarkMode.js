import React from "react";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { useSelector,useDispatch } from "react-redux";
import { toggleDarkMode } from "../../utils/slices/themeSettingSlice";

const DarkMode = () => {
  const themeSetting = useSelector(store=>store.themeSetting)
  const dispatchDarkMode = useDispatch();
  const HandleDarkMode = () => {
    dispatchDarkMode(toggleDarkMode());
  };

  return (
    <div>
      {themeSetting.isDarkMode && (
        <MdOutlineDarkMode
          className="mr-4 cursor-pointer color-black min-[320px]:text-md sm:text-xl"
          onClick={HandleDarkMode}
        />
      )}
      {!themeSetting.isDarkMode && (
        <MdDarkMode
          className="mr-4 cursor-pointer text-black min-[320px]:text-md sm:text-xl"
          onClick={HandleDarkMode}
        />
      )}
    </div>
  );
};

export default DarkMode;
