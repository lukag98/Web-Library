import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "20px 0",
        height: "60px", // Fixed height for the footer
        display: "flex",
        alignItems: "center", // Center content vertically
        position: "relative",
        width: "100%", // Ensures the footer spans the full width
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%", // Full height of the footer
          }}
        >
          <Box>
            <Link
              href="/about"
              variant="body2"
              color="textPrimary"
              sx={{ marginRight: 2 }}
            >
              O nama
            </Link>
          </Box>

          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} MojaBiblioteka. Sva prava zadržana.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
