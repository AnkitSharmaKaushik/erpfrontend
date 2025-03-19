import React, { useState } from "react";
import Input from "../Atom/InputField";
import Button from "../Atom/Button";
import { postWithAuth } from "../provider/helper/axios";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import SweetAlert from "../components/SweetAlert";
import { CHANGE_PASSWORD } from "../../utils/constants/urls";
import { useSelector } from "react-redux";
 
const ChangePassword = () => {
  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);

  const [changePasswordData, setChangePasswordData] = useState({
    email: localStorage.getItem("user"),
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
 
  const [passwordErrors, setPasswordErrors] = useState({
    new_password: "",
    confirm_password: "",
  });
 
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
 
  const navigate = useNavigate();
 
  const handleChangePasswordInput = (name, value) => {
    setChangePasswordData((prevData) => ({ ...prevData, [name]: value }));
 
    if (name === "new_password") {
      validatePasswordFormat(value);
    } else if (name === "confirm_password") {
      validateConfirmPassword(value);
    }
  };
 
  const validatePasswordFormat = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    setIsPasswordValid(regex.test(password));
 
    if (!regex.test(password)) {
      setPasswordErrors((prevErrors) => ({
        ...prevErrors,
        new_password: "Password must be at least 8 characters and include letters and numbers.",
      }));
    } else {
      setPasswordErrors((prevErrors) => ({
        ...prevErrors,
        new_password: "",
      }));
    }
  };
 
  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== changePasswordData.new_password) {
      setIsConfirmPasswordValid(false);
      setPasswordErrors((prevErrors) => ({
        ...prevErrors,
        confirm_password: "Passwords do not match",
      }));
    } else {
      setIsConfirmPasswordValid(true);
      setPasswordErrors((prevErrors) => ({
        ...prevErrors,
        confirm_password: "",
      }));
    }
  };
 
  const handleChangePassword = async () => {
    if (!validatePasswords()) {
      return;
    }
 
    try {
      const response = await postWithAuth(CHANGE_PASSWORD, changePasswordData);
      if (response.status === true) {
        SweetAlert({
          title: "Password Changed Successfully",
          text: "",
          icon: "success",
        });
        localStorage.clear();
        navigate("/login");
      } else {
        SweetAlert({
          title: "Error",
          text: response?.ex?.response?.data?.non_field_errors[0],
          icon: "error",
        });
      }
    } catch (error) {
    }
  };
 
  const validatePasswords = () => {
    if (changePasswordData.new_password !== changePasswordData.confirm_password) {
      SweetAlert({
        title: "Error",
        text: "Passwords do not match",
        icon: "error",
      });
      return false;
    }
    return true;
  };
 
  const handleClearPassword = () => {
    setChangePasswordData({
      email: localStorage.getItem("user"),
      old_password: "",
      new_password: "",
      confirm_password: "",
    });
    setPasswordErrors({
      new_password: "",
      confirm_password: "",
    });
  };
 
  return (
    <div className={`${darkMode ? "bg-black pt-8" : "bg-white mt-16"} h-screen`}>
      <div className={`${darkMode ? "bg-black mt-0" : "bg-white mt-16"} m-8 mb-8`}>
        <div className="flex justify-center">
          <div className={`${darkMode ? "bg-black shadow-md shadow-white" : "bg-white"} p-6 w-full rounded-md flex flex-col gap-6 shadow-md max-w-lg`}>
            <div className="flex flex-col gap-4">
              <h1 className={`${darkMode ? "text-white" : "text-black"} "text-3xl p-4 flex items-center"`}>
                <FaLock className="mr-4" />
                Change Password
              </h1>
              <Input
                type={"password"}
                name={"old_password"}
                className={
                  "outline-none p-2 pl-4 border bg-[#f3eded] rounded-md focus:border-cyan-600 relative w-full"
                }
                required={"required"}
                placeholder={"Old Password"}
                onChange={(e) =>
                  handleChangePasswordInput("old_password", e.target.value)
                }
                value={changePasswordData.old_password}
              />
              <div className="relative w-full">
                <Input
                  type={"password"}
                  name={"new_password"}
                  className={
                    "outline-none p-2 pl-4 border bg-[#f3eded] rounded-md focus:border-cyan-600 relative w-full"
                  }
                  required={"required"}
                  placeholder={"New Password"}
                  onChange={(e) =>
                    handleChangePasswordInput("new_password", e.target.value)
                  }
                  value={changePasswordData.new_password}
                />
                {isPasswordValid && (
                  <FaCheck className="absolute right-4 top-3 text-green-500" />
                )}
                {passwordErrors.new_password && (
                  <p className="text-sm text-red-500">{passwordErrors.new_password}</p>
                )}
              </div>
              <Input
                type={"password"}
                name={"confirm_password"}
                className={
                  "outline-none p-2 pl-4 border bg-[#f3eded] rounded-md focus:border-cyan-600 relative w-full"
                }
                required={"required"}
                placeholder={"Confirm New Password"}
                onChange={(e) =>
                  handleChangePasswordInput("confirm_password", e.target.value)
                }
                value={changePasswordData.confirm_password}
              />
              {passwordErrors.confirm_password && (
                <p className="text-sm text-red-500">{passwordErrors.confirm_password}</p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button
                className={
                  "p-3 bg-green-500 rounded-md text-white hover:bg-green-600"
                }
                name={"Change Password"}
                onClick={handleChangePassword}
              />
              <Button
                className={"p-3 bg-red-500 rounded-md text-white"}
                name={"Clear"}
                onClick={handleClearPassword}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default ChangePassword;
 