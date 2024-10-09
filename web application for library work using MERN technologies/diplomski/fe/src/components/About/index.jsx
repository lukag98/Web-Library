import React from "react";
import { Paper, Typography, Container } from "@mui/material";

const About = () => {
  return (
    <Container sx={{ maxWidth: "md", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        O nama
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Moja biblioteka
        </Typography>
        <Typography variant="body1" paragraph>
          Dobrodošli na zvaničnu stranicu naše kompanije. Mi smo posvećeni
          pružanju najkvalitetnijih usluga i proizvoda našim klijentima. Naša
          misija je da konstantno unapređujemo naše usluge i obezbedimo najbolje
          iskustvo za naše korisnike.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Kontakt informacije
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Adresa:</strong>
          <br />
          Šerifova , Smederevska Palanka, 11420, Srbija
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Telefon:</strong>
          <br />
          +381 123 456 789
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Email:</strong>
          <br />
          info@mojabiblioteka.com
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;
