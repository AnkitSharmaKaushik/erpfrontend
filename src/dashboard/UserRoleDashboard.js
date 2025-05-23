// import React, { useEffect, useState } from "react";
// import { getWithAuth, postWithAuth } from "../provider/helper/axios";

// import DataTable from "react-data-table-component";
// import { BsThreeDots } from "react-icons/bs";
// import { FaRegUserCircle } from "react-icons/fa";
// import {
//   UPDATE_PROFILE,
//   USER_LIST,
//   USER_STATUS,
// } from "../../utils/constants/urls";
// import { customStyles } from "../../utils/tableData/DataTablesData";

// const UserRoleDashboard = () => {
//   const [userListDetails, setUserListDetails] = useState([]);
//   const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
//   const [profileDetails, setProfileDetails] = useState();
//   const [userStatus, setUserStatus] = useState({ id: null, is_active: false });

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const response = await getWithAuth(USER_LIST);
//       setUserListDetails(response?.data?.users || []);
//     };
//     fetchUsers();
//   }, []);

//   const handleMouseEnter = (row, index) => {
//     setUserStatus({ userStatus, id: row.id });
//     setHoveredRowIndex(index);
//   };

//   const handleMouseLeave = () => {
//     setHoveredRowIndex(null);
//   };
//   const handleUserEdit = () => {
//   };
//   const handleUserShow = () => {
//     const GetProfileDetails = async () => {
//       const response = await getWithAuth(UPDATE_PROFILE);
//       if (response?.status == true) {
//         setProfileDetails(response?.data);
//       }
//     };
//     GetProfileDetails();
//   };
//   const handleUserDelete = async (row, index) => {
//     setUserStatus({
//       ...userStatus,
//       is_active: "true",
//     });
//     if (userStatus) {
//       deleteUser();
//     }
//   };
//   const deleteUser = async () => {
//     const response = postWithAuth(USER_STATUS, userStatus);
//     const json = await response;
//   };

//   const UserColumns = [
//     {
//       name: "SN.",
//       selector: (row) => row.id,
//       sortable: true,
//       width: "80px",
//     },
//     {
//       name: "",
//       selector: (row) =>
//         row.profile_picture ? (
//           <img
//             src={BASEURL + row.profile_picture}
//             alt="profile image"
//             className="w-9 h-9 rounded-full bg-cover"
//           />
//         ) : (
//           <FaRegUserCircle className="w-9 h-9 rounded-full bg-cover" />
//         ),
//       sortable: true,
//       width: "100px",
//     },
//     {
//       name: "User Name",
//       selector: (row) => row.username,
//       sortable: true,
//       width: "auto",
//     },
//     {
//       name: "Email",
//       selector: (row) => row.email,
//       sortable: true,
//       width: "auto",
//     },
//     {
//       name: "Role",
//       selector: (row) => row?.user_role?.name,
//       sortable: true,
//       width: "160px",
//     },
//     {
//       name: "Department",
//       selector: (row) => row?.user_department?.name,
//       sortable: true,
//       width: "auto",
//     },
//     {
//       name: "Status",
//       selector: (row) => row.status,
//       sortable: true,
//       width: "auto",
//     },
//     {
//       name: "Action",
//       cell: (row, index) => (
//         <div
//           onMouseEnter={() => handleMouseEnter(row, index)}
//           onMouseLeave={handleMouseLeave}
//           className="relative w-full inline-block"
//         >
//           <div className="relative cursor-pointer p-4">
//             <BsThreeDots className="relative" />
//             {hoveredRowIndex == index && (
//               <div
//                 className={`${
//                   index <= 5
//                     ? "absolute top-7 -left-28 z-50 bg-white border w-32"
//                     : "absolute bottom-6 -left-28 z-50 bg-white border w-32"
//                 }`}
//               >
//                 <button
//                   className="border-b p-2 w-full"
//                   onClick={handleUserEdit}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="border-b p-2 w-full"
//                   onClick={handleUserShow}
//                 >
//                   Show
//                 </button>
//                 <button
//                   className="border-b p-2 w-full"
//                   onClick={() => handleUserDelete(row, index)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       ),
//       sortable: true,
//       width: "200px",
//     },
//   ];

//   return (
//     <div className="w-full relative">
//       <DataTable
//         columns={UserColumns}
//         data={userListDetails}
//         pagination
//         customStyles={customStyles}
//         title="User List"
//         className="relative"
//       />
//     </div>
//   );
// };

// export default UserRoleDashboard;
