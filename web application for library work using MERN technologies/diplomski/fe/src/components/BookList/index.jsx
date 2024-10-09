import React, { useEffect, useState, useCallback } from "react";
import { getAllBooks } from "../../service";
import { Link } from "react-router-dom";
import navbarslika from "../../images/navbarslika.jpeg";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import debounce from "lodash/debounce";
import "./BookList.css"; // Ensure this CSS file is imported

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);

  const username = JSON.parse(localStorage.getItem("user")).name;

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await getAllBooks();

      if (result.status === "success") {
        setBooks(result.data);
        setError(null);
      } else {
        setError(result.message);
      }
      setLoading(false);
    };

    fetchBooks();
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

  const filteredBooks = books.filter((book) =>
    book.naslov.toLowerCase().includes(searchTerm.toLowerCase())
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
        <img
          src={navbarslika}
          alt="background-image"
          className="background-image"
        />
        <Box className="search-bar-container">
          <Typography variant="h4" color="white" sx={{ mb: 2 }}>
            Dobrodošao, {username}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Pretraži knjige po naslovu"
            onChange={handleSearchChange}
            margin="normal"
            sx={{ position: "relative", zIndex: 1 }}
          />
          {/* {searching && (
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress />
            </Box>
          )} */}
        </Box>
      </div>
      <Container
        sx={{
          position: "relative",
          paddingTop: "80px", // Ensure space for the background image and search bar
        }}
      >
        <Box
          mt={5}
          mb={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        ></Box>
        <Grid container spacing={3}>
          {searching ? (
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {filteredBooks.map((book) => (
                <Grid item xs={12} sm={6} md={4} key={book.id}>
                  <Card variant="outlined">
                    {book.imagePath && (
                      <CardMedia
                        component="img"
                        height="300"
                        image={`http://localhost:4000/uploads/${
                          book.imagePath.split("uploads")[1]
                        }`}
                        alt={book.naslov}
                      />
                    )}
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {book.naslov}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Autor: {book.autor}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Godina: {book.godina}
                      </Typography>
                      <Button
                        component={Link}
                        to={`/books/${book.id}`}
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={{ mt: 2 }}
                      >
                        Detalji
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default BookList;
