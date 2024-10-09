import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../images/logo.jpg"; // Import your logo image
import "./navbar.css"; // Import the CSS file
import Logout from "../Logout";

const Navbar = () => {
  // const navigate = useNavigate();
  const userRole = JSON.parse(localStorage.getItem("user")).role;
  const isAdmin = userRole === "bibliotekar";

  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   navigate("/login");
  // };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Box sx={{ marginRight: 2 }}>
          <Link to={isAdmin ? "/books" : "/books"}>
            <img src={logoImage} alt="Logo" className="circular-logo" />
          </Link>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {isAdmin ? (
          <>
            <Button color="inherit" component={Link} to="/rent-book">
              Iznajmi knjigu
            </Button>
            <Button color="inherit" component={Link} to="/return-book">
              Vrati knjigu
            </Button>
            <Button color="inherit" component={Link} to="/clients/add">
              +Dodaj klijenta
            </Button>
            <Button color="inherit" component={Link} to="/books/add">
              +Dodaj knjigu
            </Button>
            <Button color="inherit" component={Link} to="/clients">
              Lista klijenata
            </Button>
          </>
        ) : (
          // Navigation Links for Regular Users
          <>
            <Button color="inherit" component={Link} to="/books">
              Lista Knjiga
            </Button>
            <Button color="inherit" component={Link} to="/about">
              O nama
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Moj profil
            </Button>
          </>
        )}

        {/* <Button color="inherit" onClick={handleLogout}>
          Odjava
        </Button> */}
        <Logout></Logout>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
