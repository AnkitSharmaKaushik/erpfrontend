const CanUserView = ({ element, allowedRoles, allowDepartments }) => {
    const userRole = localStorage.getItem("role");
    const department = localStorage.getItem("department");
  
    if (
      !allowedRoles.includes(userRole) ||
      !allowDepartments.includes(Number(department))
    ) {
      return false;
    }
  
    return element;
  };
  
  export default CanUserView;
  