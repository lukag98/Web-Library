import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBook, deleteBook, updateBook, getAllClients } from "../../service";
import { isAdminUser } from "../../utils";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Alert,
  Paper,
  Grid,
  CardMedia,
} from "@mui/material";

const SingleBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBook, setUpdatedBook] = useState(null);
  const [comment, setComment] = useState("");
  const [clients, setClients] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const isAdmin = isAdminUser();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const result = await getBook(bookId);
        const clientsResult = await getAllClients();
        const user = JSON.parse(localStorage.getItem("user"));

        if (result.status === "success") {
          setBook(result.data);
          setUpdatedBook(result.data);
          setClients(clientsResult.data);
          setCurrentUser(user);
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
    fetchBook();
  }, [bookId]);

  const handleDelete = async () => {
    try {
      const result = await deleteBook(bookId);
      if (result.status === "success") {
        navigate("/books");
      } else {
        alert("Greška pri brisanju knjige: " + result.message);
      }
    } catch (err) {
      alert("Greška pri brisanju knjige: " + err.message);
    }
  };

  const handleUpdate = async (updatedBookWithComment) => {
    try {
      const result = await updateBook(
        bookId,
        updatedBookWithComment || updatedBook
      );
      if (result.status === "success") {
        setBook(result.data);
        setIsEditing(false);
      } else {
        alert("Greška pri ažuriranju knjige: " + result.message);
      }
    } catch (err) {
      alert("Greška pri ažuriranju knjige: " + err.message);
    }
  };

  const handleUpdateWithoutComment = async () => {
    try {
      const result = await updateBook(bookId, updatedBook);
      if (result.status === "success") {
        setBook(result.data);
        setIsEditing(false);
      } else {
        alert("Greška pri ažuriranju knjige: " + result.message);
      }
    } catch (err) {
      alert("Greška pri ažuriranju knjige: " + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook({ ...updatedBook, [name]: value });
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = () => {
    const updatedBookWithComment = {
      ...updatedBook,
      comments: [...(updatedBook.comments || []), comment],
    };
    setUpdatedBook(updatedBookWithComment);
    setComment("");

    handleUpdate(updatedBookWithComment);
  };

  if (loading) return <CircularProgress />;
  if (!book) return <Alert severity="error">Odabrana knjiga ne postoji!</Alert>;
  if (error) return <Alert severity="error">Greška: {error}</Alert>;

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3 }}>
      <CardContent>
        {book.imagePath && (
          <CardMedia
            component="img"
            height="240"
            image={`http://localhost:4000/uploads/${
              book.imagePath.split("uploads")[1]
            }`}
            alt={book.naslov}
          />
        )}
        {isEditing ? (
          <>
            <TextField
              label="Naslov"
              name="naslov"
              value={updatedBook.naslov}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Autor"
              name="autor"
              value={updatedBook.autor}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Godina"
              name="godina"
              type="number"
              value={updatedBook.godina}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Opis"
              name="opis"
              value={updatedBook.opis}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              label="Broj slobodnih primeraka"
              name="brojSlobodnihPrimeraka"
              type="number"
              value={updatedBook.brojPrimeraka}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <CardActions>
              <Button
                onClick={handleUpdateWithoutComment}
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
              >
                Sačuvaj izmene
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                variant="outlined"
                color="secondary"
              >
                Otkaži
              </Button>
            </CardActions>
          </>
        ) : (
          <>
            <Typography variant="h4" component="h2" gutterBottom>
              {book.naslov}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Autor: {book.autor}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Godina: {book.godina}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Broj slobodnih primeraka: {book.brojPrimeraka}
            </Typography>

            <Typography variant="body1" gutterBottom>
              Opis: {book.opis}
            </Typography>

            {isAdmin && (
              <CardActions>
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                >
                  Ažuriraj
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="outlined"
                  color="secondary"
                >
                  Obriši
                </Button>
              </CardActions>
            )}

            {/* Show comment section only if the current user is a client */}
            {currentUser && !isAdmin && (
              <Box mt={3}>
                <TextField
                  label="Dodaj komentar"
                  name="comment"
                  value={comment}
                  onChange={handleCommentChange}
                  fullWidth
                  margin="normal"
                />
                <Button
                  onClick={handleAddComment}
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Dodaj komentar
                </Button>
              </Box>
            )}

            <Box mt={3}>
              <Typography variant="h6" component="h4" gutterBottom>
                Komentari
              </Typography>
              {updatedBook.comments?.length > 0 ? (
                <Grid container spacing={2}>
                  {updatedBook.comments.map((comment, index) => (
                    <Grid item xs={12} key={index}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="body1">{comment}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Nema komentara.
                </Typography>
              )}
            </Box>

            {/* Rental History Section */}
            {isAdmin && (
              <Box mt={3}>
                <Typography variant="h6" component="h4" gutterBottom>
                  Istorija iznajmljivanja
                </Typography>
                {book.renters?.length > 0 ? (
                  <Grid container spacing={2}>
                    {[...book.renters].reverse().map((rental, index) => (
                      <Grid item xs={12} key={index}>
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 2,
                            bgcolor: rental.returnedAt
                              ? "lightgreen"
                              : "yellow",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            gutterBottom
                          >
                            Datum nabavke: {book.datumNabavke}
                          </Typography>
                          <Typography variant="body1">
                            Korisnik:{" "}
                            {clients.find(
                              (client) => client._id === rental.userId
                            )?.name || "Nepoznat"}
                          </Typography>
                          <Typography variant="body1">
                            Datum iznajmljivanja: {rental.rentedAt}
                          </Typography>
                          {rental.returnedAt && (
                            <Typography variant="body1">
                              Datum povratka: {rental.returnedAt}
                            </Typography>
                          )}
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Nema istorije iznajmljivanja.
                  </Typography>
                )}
              </Box>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SingleBook;
