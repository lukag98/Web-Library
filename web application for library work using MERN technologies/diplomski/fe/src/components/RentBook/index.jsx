import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooks, getAllClients, rentBook } from "../../service";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";

const RentBook = () => {
  const [bookId, setBookId] = useState("");
  const [clientId, setClientId] = useState("");
  const [rentedAt, setRentDate] = useState("");
  const [books, setBooks] = useState([]);
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch books and clients on component mount
    const fetchData = async () => {
      const booksData = await getAllBooks();
      const clientsData = await getAllClients();
      setBooks(booksData.data);
      setClients(clientsData.data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await rentBook(bookId, clientId, rentedAt);

    if (result.status === "success") {
      navigate("/books");
    } else {
      alert("Greška pri iznajmljivanju knjige: " + result.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Iznajmi Knjigu
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            select
            label="Knjiga"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            fullWidth
            required
            margin="normal"
          >
            {books
              .filter((book) => parseInt(book.brojPrimeraka) > 0)
              .map((book) => (
                <MenuItem key={book._id} value={book._id}>
                  {book.naslov}
                </MenuItem>
              ))}
          </TextField>

          <TextField
            select
            label="Klijent"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            fullWidth
            required
            margin="normal"
          >
            {clients.map((client) => (
              <MenuItem key={client._id} value={client._id}>
                {client.name} {client.lastname}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Datum Iznajmljivanja"
            type="date"
            value={rentedAt}
            onChange={(e) => setRentDate(e.target.value)}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Iznajmi Knjigu
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RentBook;
