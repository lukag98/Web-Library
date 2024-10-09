import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
