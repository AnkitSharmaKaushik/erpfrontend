export const canShowAddProjectButton = () => {
  const department = localStorage.getItem("department");
  const role = localStorage.getItem("role");

  // ✅ Allowed departments & roles
  const ALLOWED_DEPARTMENTS = ["1",1];
  const ALLOWED_ROLES = [
    "Manager",
    "Sr.Manager",
    "Ass.Manager",
    "HOD",
    "Team Lead",
  ];

  // ✅ Exception list for specific role & department overrides
  const EXCEPTION_LIST = [
    { department: "2", role: "Director" }, // Allow "Director" in department 2
    { department: "3", role: "Assistant" }, // Allow "Assistant" in department 3
    ...["1", "2", "3", "4"].map((dept) => ({
      department: dept,
      role: "viewer",
    })), // Allow "viewer" in depts 1-4
  ];

  const isException = EXCEPTION_LIST.some(
    (exception) =>
      exception.department === department && exception.role === role
  );
  return (
    isException ||
    (ALLOWED_DEPARTMENTS.includes(department) && ALLOWED_ROLES.includes(role))
  );
};
