export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userData");

};

export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

export const getUserRole = () => {
  return localStorage.getItem("userRole");
};
