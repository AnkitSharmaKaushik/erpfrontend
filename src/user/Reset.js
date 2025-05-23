// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Input from "../components/InputField";
// import Button from "../components/Button";
// import { useNavigate } from "react-router-dom";
// import SweetAlert from "../components/SweetAlert";
// import { RESET_PASSWORD } from "../../utils/constants/urls";

// const Reset = () => {
//   const [email, setEmail] = useState({
//     email: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const forgotPassword = async () => {
//     setLoading(true);
//     const response = await fetch(RESET_PASSWORD, {
//       method: "POST",
//       headers: {
//         "Content-Type": "Application/Json",
//         Accept: "Application/Json",
//       },
//       body: JSON.stringify(email),
//     });
//     setLoading(false);
//     let message = await response.json();
//     if (response.ok) {
//       SweetAlert({
//         title: "Success",
//         text: message.detail + "Please check your email!!",
//         icon: "success",
//       });
//       navigate("/login");
//     } else {
//       SweetAlert({
//         title: "",
//         text: message.email,
//         icon: "info",
//       });
//     }
//   };

//   const handleResetEmail = (e) => {
//     const { name, value } = e.target;
//     setEmail((prevData) => ({ ...prevData, [name]: value }));
//   };
//   const handleReset = () => {
//     forgotPassword();
//   };
//   return (
//     <div className="bg-[url('./assets/HS-blog-post-20-2048x1075.png')] opacity-80 w-full h-screen bg-contain">
//       <div className="flex h-full">
//         <div className="w-2/3 h-2/3 flex flex-col items-center justify-center p-8 pl-8">
//           {/* <h2 className="text-4xl text-white ">Welcome To UNIMRKT</h2>
//           <p className="text-xl text-white w-2/3 pt-8">
//             {" "}
//             Lorem IspumLorem IspumLorem IspumLorem IspumLorem IspumLorem
//             IspumLorem IspumLorem IspumLorem Ispum
//           </p> */}
//         </div>
//         <div className="w-1/3">
//           <div className="h-screen shadow-gray-600 shadow-lg bg-white flex justify-center items-center w-full relative">
//             <div className="flex flex-col gap-4 p-4 w-9/12">
//               <h1 className="text-5xl p-8 ">Forgot Password</h1>
//               <Input
//                 type={"email"}
//                 name={"email"}
//                 className={
//                   "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
//                 }
//                 required={"required"}
//                 placeholder={"email"}
//                 onChange={handleResetEmail}
//               />
//               <div className="flex justify-center pt-4">
//                 <Button
//                   className={"p-4 bg-[#e7251e] w-1/2 rounded-full text-white "}
//                   name={loading ? "Please wait..." : "Reset"}
//                   onClick={handleReset}
//                 />
//               </div>
//               <div className="flex flex-col items-center">
//                 <Link to="/login">
//                   <Button className={"p-2"} name={"Have a account? Login"} />
//                 </Link>
//                 <Link to="/register">
//                   <Button className={"p-2"} name={"Create Account"} />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reset;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Atom/InputField";
import Button from "../Atom/Button";
import { useNavigate } from "react-router-dom";
import SweetAlert from "../components/SweetAlert";
import { RESET_PASSWORD } from "../../utils/constants/urls";

const Reset = () => {
  const [email, setEmail] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const forgotPassword = async () => {
    setLoading(true);
    const response = await fetch(RESET_PASSWORD, {
      method: "POST",
      headers: {
        "Content-Type": "Application/Json",
        Accept: "Application/Json",
      },
      body: JSON.stringify(email),
    });
    setLoading(false);
    let message = await response.json();
    if (response.ok) {
      SweetAlert({
        title: "Success",
        text: message.detail + "Please check your email!!",
        icon: "success",
      });
      navigate("/login");
    } else {
      SweetAlert({
        title: "",
        text: message.email,
        icon: "info",
      });
    }
  };

  const handleResetEmail = (e) => {
    const { name, value } = e.target;
    setEmail((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleReset = () => {
    forgotPassword();
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('./assets/HS-blog-post-20-2048x1075.png')",
      }}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full relative">
        <h1 className="text-3xl font-semibold text-center mb-6 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
          Forgot Password
        </h1>
        <div className="flex flex-col gap-4">
          <Input
            type="email"
            name="email"
            className="outline-none p-3 border border-gray-300 rounded-lg focus:border-blue-500 w-full shadow-lg"
            required
            placeholder="Enter your email"
            onChange={handleResetEmail}
          />
          <Button
            className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition shadow-lg focus:ring-4 focus:ring-red-300"
            name={loading ? "Please wait..." : "Reset"}
            onClick={handleReset}
          />
          <div className="flex justify-between mt-4">
            <Link to="/login" className="text-blue-600 hover:underline">
              Have an account? Login
            </Link>
            <Link to="/register" className="text-blue-600 hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
