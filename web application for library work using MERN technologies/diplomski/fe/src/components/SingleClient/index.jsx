import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClient, deleteClient, updateClient } from "../../service";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  FormControl,
} from "@mui/material";

const SingleClient = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedClient, setUpdatedClient] = useState(null);
  const [role, setRole] = useState("korisnik");

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const result = await getClient(clientId);
        if (result.status === "success") {
          setClient(result.data);
          setUpdatedClient(result.data);
          setRole(result.data.role || "korisnik");
          setError(null);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [clientId]);

  const handleDelete = async () => {
    try {
      const result = await deleteClient(clientId);
      if (result.status === "success") {
        navigate("/clients");
      } else {
        alert("Greška pri brisanju klijenta: " + result.message);
      }
    } catch (err) {
      alert("Greška pri brisanju klijenta: " + err.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedData = { ...updatedClient, role };
      const result = await updateClient(clientId, updatedData);
      if (result.status === "success") {
        setClient(result.data);
        setIsEditing(false);
      } else {
        alert("Greška pri ažuriranju klijenta: " + result.message);
      }
    } catch (err) {
      alert("Greška pri ažuriranju klijenta: " + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedClient({ ...updatedClient, [name]: value });
  };

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  if (error) return <div>Greška: {error}</div>;
  if (!client) return <div>Odabrani klijent ne postoji!</div>;

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ padding: 2 }}
      >
        <Card sx={{ width: "100%" }}>
          <CardContent>
            {isEditing ? (
              <>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Ime"
                    name="name"
                    value={updatedClient.name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Prezime"
                    name="lastname"
                    value={updatedClient.lastname}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={updatedClient.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={updatedClient.password}
                    onChange={handleChange}
                  />
                </FormControl>
              </>
            ) : (
              <>
                <Typography variant="h5" component="div">
                  {client.name} {client.lastname}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Email: {client.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Password: {client.password}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Uloga: {client.role}
                </Typography>
              </>
            )}
          </CardContent>
          <CardActions>
            {isEditing ? (
              <>
                <Button
                  onClick={handleUpdate}
                  variant="contained"
                  color="primary"
                >
                  Sačuvaj izmene
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outlined">
                  Otkaži
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setIsEditing(true)} variant="contained">
                  Ažuriraj
                </Button>
                <Button onClick={handleDelete} variant="outlined" color="error">
                  Obriši
                </Button>
              </>
            )}
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

export default SingleClient;
