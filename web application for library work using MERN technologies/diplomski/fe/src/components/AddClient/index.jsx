import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addClient } from "../../service";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const AddClient = () => {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("korisnik"); // Default role

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newClient = {
      name: ime,
      lastname: prezime,
      email: email,
      password: password,
      role: role, // Include role in the request
    };

    const result = await addClient(newClient);
    if (result.status === "success") {
      setIme("");
      setPrezime("");
      setEmail("");
      setPassword("");
      setRole("korisnik"); // Reset role field
      navigate("/clients");
    } else {
      alert("Greška pri dodavanju klijenta: " + result.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Dodaj Klijenta
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Ime"
            value={ime}
            onChange={(e) => setIme(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Prezime"
            value={prezime}
            onChange={(e) => setPrezime(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Uloga</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Uloga"
              required
            >
              <MenuItem value="korisnik">Korisnik</MenuItem>
              <MenuItem value="bibliotekar">Bibliotekar</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sačuvaj
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddClient;
