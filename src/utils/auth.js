export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userData");
  window.location.href = "/login";
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

export const getUserRole = () => {
  return localStorage.getItem("userRole");
};

export const getUserData = () => {
  return localStorage.getItem("userData");
};

export default { logout, isAuthenticated, getUserRole, getUserData };
