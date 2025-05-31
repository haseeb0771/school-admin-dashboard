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

export default { logout, isAuthenticated, getUserRole };
