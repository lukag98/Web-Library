import React, { useEffect, useState, useCallback } from "react";
import { getAllClients } from "../../service";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import debounce from "lodash/debounce";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);

  const username = JSON.parse(localStorage.getItem("user")).name;

  useEffect(() => {
    const fetchClients = async () => {
      const result = await getAllClients();

      if (result.status === "success") {
        setClients(result.data);
        setError(null);
      } else {
        setError(result.message);
      }
      setLoading(false);
    };

    fetchClients();
  }, []);

  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchTerm(query);
      setSearching(false);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    setSearching(true);
    debouncedSearch(e.target.value);
  };

  const filteredClients = clients.filter((client) =>
    `${client.name} ${client.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <Box display="flex" justifyContent="center" my={2}>
        <CircularProgress />
      </Box>
    );
  if (error) return <div>Greška: {error}</div>;

  return (
    <div className="page-container">
      <div className="background-image-container">
        <Box className="search-bar-container">
          <Typography variant="h4" color="white" sx={{ mb: 2 }}>
            Dobrodošao, {username}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Pretraži klijente po imenu i prezimenu"
            onChange={handleSearchChange}
            margin="normal"
            sx={{ position: "relative", zIndex: 1 }}
          />
          {searching && (
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </div>
      <Container
        sx={{
          position: "relative",
          paddingTop: "80px", // Ensure space for the background image and search bar
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            border: "1px solid #ccc", // Border around the table container
            borderRadius: 1,
            boxShadow: 2,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    border: "1px solid #ddd", // Border for table header cells
                    fontWeight: "bold",
                  }}
                >
                  Ime
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid #ddd",
                    fontWeight: "bold",
                  }}
                >
                  Prezime
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid #ddd",
                    fontWeight: "bold",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid #ddd",
                    fontWeight: "bold",
                  }}
                >
                  Akcije
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell
                    sx={{
                      border: "1px solid #ddd", // Border for table cells
                    }}
                  >
                    {client.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid #ddd",
                    }}
                  >
                    {client.lastname}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid #ddd",
                    }}
                  >
                    {client.email}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid #ddd",
                    }}
                  >
                    <Button
                      component={Link}
                      to={`/clients/${client.id}`}
                      variant="outlined"
                      color="primary"
                      size="small"
                    >
                      Izmeni
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default ClientList;
