import React, { useEffect, useRef, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { getWithAuth } from "../provider/helper/axios";
import { EDITPROJECTREQUEST } from "../../utils/constants/urls";
import { useSelector,useDispatch } from "react-redux";
import { useHandleOutsideClick } from "../../utils/hooks/useHandleOutSideClick";
import { addNotification, toggleViewNotification } from "../../utils/slices/notificationSlice";

const Notification = () => {
  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);

  const {notificationList,isViewNotification} = useSelector(store=>store.notification);
  const dispatch = useDispatch()

  const role = localStorage.getItem("role");
  const allManagerRolesRole = ["Sr.Manager", "Ass.Manager", "Manager"].includes(
    role
  );

  const [isNotificationActive, setIsNotificationActive] = useState(false);
  
  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  }, [darkMode]);
  const projectDataResponse = useSelector(
    (store) => store.projectData.projects
  );

  
  // useEffect(() => {
  //   const fetchProjectData = async () => {
  //     dispatch(addNotificationList(notificationList))
  //   };
  //   fetchProjectData();
  // }, [projectDataResponse,notificationList]);

  const notification_btn_ref = useRef(null);

  const handleClose = () => {
    setIsNotificationActive(false);
  };

  useHandleOutsideClick(notification_btn_ref, handleClose);

  const handleViewNotification = async (id) => {
    const response = await getWithAuth(EDITPROJECTREQUEST(id));
    if(response.status == true){
      dispatch(addNotification(response?.data))
    }
    dispatch(toggleViewNotification())
  };
  const projectCode =projectDataResponse.length>0 &&  projectDataResponse?.filter((old_item)=>{
   return notificationList?.project_id?.some((item)=>item == old_item.id)
  })

  return (
    <div className="relative flex items-center">
      <div
        className="relative"
        onClick={() => {
          setIsNotificationActive(!isNotificationActive);
        }}
      >
        <IoNotifications className="mr-4 cursor-pointer min-[320px]:text-base sm:text-base text-black" />
        <span className="bg-red-600 text-white rounded-full sm:w-3 sm:h-3 sm:p-3 min-[320px]:w-1 min-[320px]:h-1 min-[320px]:p-2 absolute sm:-top-3 sm:left-2 min-[320px]:-top-2 min-[320px]:left-2 min-[320px]:text-sm sm:text-sm flex justify-center items-center">
          {allManagerRolesRole && notificationList
            ? notificationList?.notification_count
            : 0}
        </span>
      </div>
      {isNotificationActive && (
        <div
          className="border bg-[#bd1d1d] text-white cursor-pointer text-left absolute sm:top-10 sm:-left-1/2 min-[320px]:left-1/3 min-[320px]:top-5 min-[320px]:w-44 sm:w-72 p-2 rounded-md min-[320px]:text-base sm:text-base"
          ref={notification_btn_ref}
        >
          {allManagerRolesRole && notificationList?.notification_count ? (
            <ul>
              {projectCode?.map((item, ind) => {
                return (
                  <li
                    key={ind}
                    className="border-b-black border-b p-1"
                    onClick={() => handleViewNotification(item?.id)}
                  >
                    <span>
                      Project Code: {item?.project_code.toUpperCase()}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul>
              <li className="border-b-black border-b p-2">
                No Notification found
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
