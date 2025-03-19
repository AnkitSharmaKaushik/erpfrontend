import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { useAuth } from "../provider/authProvider.js";
import { useRedirectUser } from "../../utils/hooks/useRedirectUser.js";
import { useHandleLogin } from "../../utils/hooks/useHAndleLogin.js";
import { useSelector } from "react-redux";

const Login = () => {
  const darkMode = useSelector((store) => store?.darkMode?.isDarkMode);
  const navigate = useNavigate();
  const { token, setToken } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleonChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      if (value !== "") {
        setShowPasswordIcon(true);
      } else {
        setShowPasswordIcon(false);
      }
    }
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if(token){
      useRedirectUser(navigate); 
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.setItem("darkmode", true);
    useHandleLogin(loginData, setToken);
  };

  return (
    <form
      onSubmit={handleLogin}
      id="loginForm"
      className="h-screen relative overflow-hidden"
    >
      <div className="flex justify-center items-center h-full  container mx-auto">
        {/* Circle design for the left side */}
        <div className="absolute top-0 left-0 w-3/5 h-full bg-gradient-to-r rounded-tr-full rounded-br-full from-red-500 to-orange-300 -z-10">
          <div className="flex flex-col justify-center h-full pl-20">
            <h1 className="text-white text-5xl font-bold mb-4">
              Welcome Back!
            </h1>
            <p className="text-white text-xl">Sign in to continue</p>
          </div>
        </div>

        {/* Small circle in the bottom right */}
        <div className="absolute right-0 w-20 h-20 bg-red-600 rounded-full -mr-10 -mb-10"></div>

        {/* Form container */}
        <div className="relative w-full max-w-md p-8 bg-white shadow-lg rounded-lg z-10 ml-auto mr-8 sm:mr-16 lg:mr-24">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
            Log In
          </h1>

          <div className="flex flex-col gap-4">
            <input
              type="email"
              className="outline-none p-3 pl-4 border bg-gray-200 shadow-lg focus:border-cyan-600 w-full"
              required
              placeholder="Email or User ID"
              name="email"
              onChange={(e) => handleonChange(e)}
            />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                className="p-3 pl-4 border bg-gray-200 outline-none shadow-lg focus:border-cyan-600 w-full"
                required
                placeholder="Password"
                name="password"
                onChange={(e) => handleonChange(e)}
              />
              {showPasswordIcon && (
                <BiShow
                  className={`absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>

            <div className="flex justify-between items-center mt-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Keep me logged in</span>
              </label>
              <Link to="/reset" className="text-cyan-600">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="p-3 mt-4 bg-red-600 w-full text-white transition hover:bg-blue-500 duration-300"
              onClick={handleLogin}
            >
              Log In
            </button>

            <div className="text-center mt-4">
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/register" className="text-cyan-600">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
