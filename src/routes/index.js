import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../user/Login.js";
import OperationDashboard from "../pages/OperationDashboard.js";
import SignUp from "../user/SignUp.js";
import SalesDashboard from "../pages/SalesDashboard.js";
import AdminPanel from "../dashboard/AdminPanel.js";
import Reset from "../user/Reset.js";
import Error from "../pages/Error.js";
import DefaultDashboard from "../dashboard/DefaultDashboard.js";
// import FinanceDashboard from "../dashboard/FinanceDashboard.js";
import Invoice from "../components/Invoice";
import ResetPassword from "../user/ResetPassword.js";
import ChangePassword from "../user/ChangePassword.js";
import { Profile } from "../user/userProfile";
import LogoutTimer from "../user/LogoutTimer.js";
import ManagementPanel from "../dashboard/ManagementRole";
// import Report from "../pages/ProjectDashboard.js";
import RoleProtectedRoute from "./allowRoutes/index.js";
import NotAuthorized from "../pages/NotAuthorized.js";
import AddManDaysButton from "../projectOperationButtons/AddManDaysButton.js";
import ViewProjectDetails from "../project/view/ViewProjectDetails.js";
import SampleEdit from "../operation/projectSampleEditRequest/projectSampleEditRequest.js";
import UpdateStatus from "../operation/updateStatus/UpdateStatus.js";
import UpdateSow from "../sales/updateSow/UpdateSow.js";
import Form from "../sales/createProject/Form.js";
import { canAccessOperationProjects } from "../config/allowRole/canAccessOperationProjects.js";
import { canAccessSalesProjects } from "../config/allowRole/canAccessSalesProjects.js";
import { canAccessFinanceProjects } from "../config/allowRole/canAccessFinanceProjects.js";
import { canAccessReportDashboard } from "../config/allowRole/canAccessReportDashboard.js";
import { canAccessProjectEntry } from "../config/allowRole/canAccessProjectEntry.js";
import CbrProjectList from "../finance/cbrProjectList/CbrProjectList.js";
import AbrProjectList from "../finance/abrProjectList/AbrProjectList.js";
import AbrDashboard from "../pages/AbrDashboard.js";
import ProjectDashboard from "../pages/ProjectDashboard.js";
import ProjectReport from "../report/ProjectReport.js";
import CreateCbrInvoice from "../finance/invoice/CreateCbrInvoice.js";
import CreateAbrInvoice from "../finance/invoice/CreateAbrInvoice.js";

const Routes = () => {
  const routesForPublic = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <SignUp />,
    },
    {
      path: "/reset",
      element: <Reset />,
    },
    {
      path: "/confirm-password",
      element: <ResetPassword />,
    },
    { path: "*", element: <Error /> },
    {
      path: "/logout",
      element: <LogoutTimer />,
    },
  ];
  // Combine and conditionally include routes based on authentication status
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/operation-projects",
          element: (
            <RoleProtectedRoute
              element={<OperationDashboard />}
              allowedRoles={canAccessOperationProjects.role}
              allowDepartments={canAccessOperationProjects.department}
            />
          ),
        },
        {
          path: "/sales-projects",
          element: (
            <RoleProtectedRoute
              element={<SalesDashboard />}
              allowedRoles={canAccessSalesProjects.role}
              allowDepartments={canAccessSalesProjects.department}
            />
          ),
        },
        { path: "/admin", element: <AdminPanel /> },
        { path: "/logout", element: <div>Logout</div> },
        { path: "/view-project-details", element: <ViewProjectDetails /> },
        { path: "/change-password", element: <ChangePassword /> },
        { path: "/profile", element: <Profile /> },
        { path: "/Admin-panel", element: <AdminPanel /> },
        { path: "/Management-Role", element: <ManagementPanel /> },
        { path: "/default-panel", element: <DefaultDashboard /> },
        
        {
          path: "/finance-projects/cbr",
          element: (
            <RoleProtectedRoute
              element={<CbrProjectList />}
              allowedRoles={canAccessFinanceProjects.role}
              allowDepartments={canAccessFinanceProjects.department}
            />
          ),
        },
        {
          path: "/finance/cbr/create-invoice",
          element: (
            <RoleProtectedRoute
              element={<CreateCbrInvoice />}
              allowedRoles={canAccessFinanceProjects.role}
              allowDepartments={canAccessFinanceProjects.department}
            />
          ),
        },
        {
          path: "/finance-projects/abr",
          element: (
            <RoleProtectedRoute
              element={<AbrProjectList />}
              allowedRoles={canAccessFinanceProjects.role}
              allowDepartments={canAccessFinanceProjects.department}
            />
          ),
        },
        {
          path: "/finance/abr/create-invoice",
          element: (
            <RoleProtectedRoute
              element={<CreateAbrInvoice />}
              allowedRoles={canAccessFinanceProjects.role}
              allowDepartments={canAccessFinanceProjects.department}
            />
          ),
        },
        {
          path: "/finance/invoice",
          element: (
            <RoleProtectedRoute
              element={<Invoice />}
              allowedRoles={canAccessFinanceProjects.role}
              allowDepartments={canAccessFinanceProjects.department}
            />
          ),
        },
        {
          path: "/project-report",
          element: (
            <RoleProtectedRoute
              element={<ProjectReport />}
              allowedRoles={canAccessReportDashboard.role}
              allowDepartments={canAccessReportDashboard.department}
            />
          ),
        },
        {
          path: "/project-dashboard",
          element: (
            <RoleProtectedRoute
              element={<ProjectDashboard />}
              allowedRoles={canAccessReportDashboard.role}
              allowDepartments={canAccessReportDashboard.department}
            />
          ),
        },
        {
          path: "/entry-page",
          element: (
            <RoleProtectedRoute
              element={<Form />}
              allowedRoles={canAccessProjectEntry.role}
              allowDepartments={canAccessProjectEntry.department}
            />
          ),
        },
        // {
        //   path: "/dashboard",
        //   element: (
        //     <RoleProtectedRoute
        //       element={<Report />}
        //       allowedRoles={canAccessReportDashboard.role}
        //       allowDepartments={canAccessReportDashboard.department}
        //     />
        //   ),
        // },
        // {
        //   path: "/edit",
        //   element: (
        //     <RoleProtectedRoute
        //       element={<SampleEdit />}
        //       allowedRoles={[
        //         "Admin",
        //         "Director",
        //         "HOD",
        //         "Ass.Manager",
        //         "Manager",
        //         "Sr.Manager",
        //       ]}
        //       allowDepartments={[1, 2, 3]}
        //     />
        //   ),
        // },
        // {
        //   path: "/add-man-days",
        //   element: (
        //     <RoleProtectedRoute
        //       element={<AddManDaysButton />}
        //       allowedRoles={[
        //         "Admin",
        //         "Director",
        //         "HOD",
        //         "Ass.Manager",
        //         "Manager",
        //         "Sr.Manager",
        //       ]}
        //       allowDepartments={[2, 3]}
        //     />
        //   ),
        // },
        // {
        //   path: "/change-status",
        //   element: (
        //     <RoleProtectedRoute
        //       element={<UpdateStatus />}
        //       allowedRoles={[
        //         "Admin",
        //         "Director",
        //         "HOD",
        //         "Ass.Manager",
        //         "Manager",
        //         "Sr.Manager",
        //       ]}
        //       allowDepartments={[2, 3]}
        //     />
        //   ),
        // },
        // {
        //   path: "/update-sow",
        //   element: (
        //     <RoleProtectedRoute
        //       element={<UpdateSow />}
        //       allowedRoles={[
        //         "Admin",
        //         "Director",
        //         "HOD",
        //         "Ass.Manager",
        //         "Manager",
        //         "Sr.Manager",
        //         "Team Lead",
        //       ]}
        //       allowDepartments={[1, 3]}
        //     />
        //   ),
        // },

        { path: "*", element: <Error /> },
        { path: "/not-authorized", element: <NotAuthorized /> },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
