import React from "react";
import { Button } from "@mui/material";

const UploadImage = ({ setFile }) => {
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  return (
    <Button variant="outlined" component="label">
      Upload Image
      <input type="file" hidden onChange={handleFileChange} />
    </Button>
  );
};

export default UploadImage;
