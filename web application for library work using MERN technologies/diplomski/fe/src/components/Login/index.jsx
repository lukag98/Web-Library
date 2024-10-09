import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Alert,
} from "@mui/material";

import "./login.css";
import backgroundImage from "../../images/loginslika.jpg";
import logoImage from "../../images/logo.jpg"; // Import your logo image

import { loginUser } from "../../service";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = JSON.parse(localStorage.getItem("user")) !== null;

  const handleLogin = async () => {
    setError(null);

    // Perform validation (e.g., check if fields are empty)
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const result = await loginUser(username, password);

      if (result.status === "success") {
        localStorage.setItem("user", JSON.stringify(result.data.loggedUser));
        navigate("/books");
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/books");
  }, [isLoggedIn]);

  return (
    <div className="login-container">
      <img
        src={backgroundImage}
        alt="Background"
        className="background-image"
      />
      <div className="logo-container">
        <img src={logoImage} alt="Logo" className="logo-image" />
        <Typography
          variant="h5"
          component="p"
          style={{
            marginTop: "55px",
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 40,
            fontFamily: "Comic Sans MS",
          }}
        >
          Dobrodošli u biblioteku
        </Typography>
      </div>
      <div className="login-form">
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <CardActions>
          <Button
            onClick={handleLogin}
            variant="contained"
            color="primary"
            fullWidth
          >
            Login
          </Button>
        </CardActions>
      </div>
    </div>
  );
};

export default Login;
