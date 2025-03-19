import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "../slices/notificationSlice";
import { notificationCount } from "../apis/notificationCount";

const useNotificationCount = () => {
  const dispatch = useDispatch();

  const getNotificationCount = async () => {
    try {
      const response = await notificationCount();
      if (response) {
        dispatch(addNotification(response));
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  useEffect(() => {
    getNotificationCount();
  }, []);
};

export default useNotificationCount;
