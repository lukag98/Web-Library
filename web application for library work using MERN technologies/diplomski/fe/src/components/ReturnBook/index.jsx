import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooks, getAllClients, returnBook } from "../../service";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";

const filterClientsByRenters = (clients, selectedBook) => {
  if (!selectedBook) return [];
  const renterIds = selectedBook.renters
    .filter((renter) => !renter.returnedAt) // vrati samo one koji nemaju returnedAt -> to znaci da jos uvek nisu vratili knjigu
    .map((renter) => renter.userId);

  const filteredClients = clients.filter((client) =>
    renterIds.includes(client._id.toString())
  );

  return filteredClients;
};

const ReturnBook = () => {
  const [bookId, setBookId] = useState("");
  const [clientId, setClientId] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [books, setBooks] = useState([]);
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  const selectedBook = books.find((book) => book._id === bookId);
  const filteredClients = filterClientsByRenters(clients, selectedBook);

  const filteredBooks = books
    .filter((book) => !!book.renters?.length)
    .filter((book) => book.renters.some((renter) => !renter.returnedAt)); // !! -> prebacuje vrednost u boolean, znaci true ili false -> 0 = false, 1 = true

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

    console.log("evo me ");

    const result = await returnBook(bookId, clientId, returnDate);
    console.log(result, "- result");

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
          Vrati Knjigu
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
            {filteredBooks.map((book) => (
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
            {filteredClients.map((client) => (
              <MenuItem key={client._id} value={client._id}>
                {client.name} {client.lastname}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Datum Vracanja"
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
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
            Vrati Knjigu
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ReturnBook;
