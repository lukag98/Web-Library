const isAdminUser = () => {
  return JSON.parse(localStorage.getItem("user")).role === "bibliotekar";
};

export { isAdminUser };
