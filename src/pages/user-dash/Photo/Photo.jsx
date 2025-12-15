import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaRegCircleUser } from "react-icons/fa6";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function Photo() {

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [fileName, setFileName] = useState("No file selected");
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <Box
      sx={{
    
        bgcolor: "#fff",
        p: 4,
        borderRadius: 1,
        border: "1px solid #ddd",
      }}
    >
      <Typography variant="h5" mb={1} textAlign="center">
        Photo
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        mb={3}
        textAlign="center"
      >
        Add a nice photo of yourself for your profile.
      </Typography>

      <Typography variant="subtitle2" mb={1}>
        Image preview
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: 250,
          border: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <FaRegCircleUser style={{ fontSize: "150px", color: "#999" }} />
        )}
      </Box>

      <Typography variant="subtitle2" mb={1}>
        Add / Change Image
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField fullWidth size="small" value={fileName} disabled />

        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload image
          <VisuallyHiddenInput type="file" onChange={handleImage} />
        </Button>
      </Box>

      <Button variant="contained">
        Save
      </Button>
    </Box>
  );
}
