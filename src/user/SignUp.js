import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER } from "../../utils/constants/urls";
import SweetAlert from "../components/SweetAlert";

const SignUp = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleregisterDataSubmit = async (e) => {
    e.preventDefault();
    if (!registerData.username.trim()) {
      SweetAlert({
        title: "Username cannot be empty",
        text: "",
        icon: "info",
      });
      return;
    }

    try {
      const response = await fetch(REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(registerData),
      });
      if (response.ok) {
        SweetAlert({
          title: "Success",
          text: "Registration Successful !!",
          icon: "success",
        });
        navigate("/login");
      } else {
        const errorData = await response.json();
        if (errorData.email) {
          SweetAlert({
            title: "Error",
            text: errorData.email,
            icon: "error",
          });
        } else if (errorData.password) {
          SweetAlert({
            title: "Error",
            text: "password :" + errorData.password,
            icon: "error",
          });
        } else if (errorData.confirm_password) {
          SweetAlert({
            title: "Error",
            text: "confirm password :" + errorData.confirm_password,
            icon: "error",
          });
        } else if (errorData.non_field_errors) {
          SweetAlert({
            title: "Error",
            text: errorData.non_field_errors[0],
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form id="RegForm" className="h-screen relative overflow-hidden">
      <div className="flex justify-center items-center h-full">
        {/* Background Gradient */}
        <div className="absolute top-0 left-0 w-3/5 h-full bg-gradient-to-r rounded-tr-full rounded-br-full from-red-500 to-orange-300 -z-10">
          <div className="flex flex-col justify-center h-full pl-20">
            <h1 className="text-white text-5xl font-bold mb-4">
              Create Your Account
            </h1>
            <p className="text-white text-xl">Join us and get started today!</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="absolute right-0 w-20 h-20 bg-red-600 rounded-full -mr-10 -mb-10"></div>

        {/* Form content */}
        <div className="relative w-full max-w-md p-8 bg-white shadow-lg rounded-lg z-10 ml-auto mr-8 sm:mr-16 lg:mr-24">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
            Sign Up
          </h1>

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="outline-none p-3 border bg-gray-200 shadow-lg focus:border-cyan-600 rounded-md"
              placeholder="Username"
              required
              name="username"
              onChange={handleInputChange}
              value={registerData.username}
            />

            <input
              type="email"
              className="outline-none p-3 border bg-gray-200 shadow-lg focus:border-cyan-600 rounded-md"
              placeholder="Email ID"
              required
              name="email"
              onChange={handleInputChange}
              value={registerData.email}
            />

            <input
              type="password"
              className="outline-none p-3 border bg-gray-200 shadow-lg focus:border-cyan-600 rounded-md"
              placeholder="Password"
              required
              name="password"
              onChange={handleInputChange}
              value={registerData.password}
            />

            <input
              type="password"
              className="outline-none p-3 border bg-gray-200 shadow-lg focus:border-cyan-600 rounded-md"
              placeholder="Confirm Password"
              required
              name="confirm_password"
              onChange={handleInputChange}
              value={registerData.confirm_password}
            />

            <input
              type="number"
              className="outline-none p-3 border bg-gray-200 shadow-lg focus:border-cyan-600 rounded-md"
              placeholder="Phone Number"
              required
              name="phone"
              onChange={handleInputChange}
              value={registerData.phone}
            />

            <button
              className="p-3 bg-red-600 text-white shadow-lg hover:bg-blue-700 w-full"
              onClick={handleregisterDataSubmit}
            >
              Register Now
            </button>

            <div className="flex justify-center mt-4">
              <span className="text-gray-600"> Don't have an account?</span>
              <Link to="/login">
                <button className="text-cyan-600"> Login </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
