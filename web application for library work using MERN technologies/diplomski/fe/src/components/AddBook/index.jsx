import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBook } from "../../service";
import UploadImage from "../UploadImage";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";

const AddBook = () => {
  const [naslov, setNaslov] = useState("");
  const [autor, setAutor] = useState("");
  const [godina, setGodina] = useState("");
  const [opis, setOpis] = useState("");
  const [brojPrimeraka, setBrojPrimeraka] = useState(0);
  const [datumNabavke, setDatumNabavke] = useState("");
  const [isbn, setIsbn] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("naslov", naslov);
    formData.append("autor", autor);
    formData.append("godina", parseInt(godina, 10));
    formData.append("opis", opis);
    formData.append("brojPrimeraka", parseInt(brojPrimeraka, 10));
    formData.append("datumNabavke", datumNabavke);
    formData.append("isbn", isbn);
    if (file) {
      formData.append("file", file); // Include file in the form data
    }

    const result = await addBook(formData);

    if (result.status === "success") {
      setNaslov("");
      setAutor("");
      setGodina("");
      setOpis("");
      setBrojPrimeraka("");
      setDatumNabavke("");
      setIsbn("");
      setFile(null);
      navigate("/books");
    } else {
      alert("Greška pri dodavanju knjige: " + result.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Dodaj Knjigu
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <TextField
            label="Naslov"
            value={naslov}
            onChange={(e) => setNaslov(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Godina"
            type="number"
            value={godina}
            onChange={(e) => setGodina(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Opis"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Broj Primeraka"
            type="number"
            value={brojPrimeraka}
            onChange={(e) => setBrojPrimeraka(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Datum Nabavke"
            type="date"
            value={datumNabavke}
            onChange={(e) => setDatumNabavke(e.target.value)}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <UploadImage setFile={setFile} />{" "}
          {/* Pass setFile to handle file selection */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Dodaj Knjigu
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddBook;
