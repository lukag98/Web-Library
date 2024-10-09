import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {!isLoginPage && <Navbar />}
      <Box
        component="main"
        sx={{
          flex: 1,
          width: "100%",
          marginBottom: !isLoginPage ? "50px" : "0",
        }}
      >
        {children}
      </Box>
      {!isLoginPage && <Footer />}
    </Box>
  );
};

export default Layout;
