import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Informacije o profilu
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Typography variant="body1">
          <strong>Ime i prezime:</strong> {user.name} {user.lastname}
        </Typography>

        <Typography variant="body1">
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography variant="body1">
          <strong>Uloga:</strong> {user.role}
        </Typography>
      </Paper>

      <Typography variant="h5" component="h3" gutterBottom>
        Istorija
      </Typography>
      {user.rentalHistory?.length > 0 ? (
        <Grid container spacing={2}>
          {user.rentalHistory.map((rental, index) => (
            <Grid item xs={12} key={index}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  backgroundColor: rental.returnedAt ? "lightgreen" : "yellow",
                }}
              >
                <Typography variant="body1">
                  <strong>Knjiga</strong> {rental.naslov}
                </Typography>
                <Typography variant="body1">
                  <strong>Iznajmljena:</strong> {rental.rentedAt}
                </Typography>
                <Typography variant="body1">
                  <strong>Vracena:</strong>{" "}
                  {rental.returnedAt
                    ? rental.returnedAt
                    : "Jos uvek nije vracena"}
                </Typography>
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
  );
};

export default Profile;
