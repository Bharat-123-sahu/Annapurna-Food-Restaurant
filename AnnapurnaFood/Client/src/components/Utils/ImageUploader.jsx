// components/Utils/ImageUploader.jsx
import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  LinearProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const ImageUploader = ({
  label = "Upload Image",
  multiple = false,
  onUpload,
  maxFiles = 3,
  maxSize = 2 * 1024 * 1024, // 2MB
}) => {
  const [images, setImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef(null);

  const handleFiles = (selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter((file) => {
      if (!file.type.startsWith("image/")) {
        alert("⚠ Only image files are allowed.");
        return false;
      }
      if (file.size > maxSize) {
        alert("🚫 File too large. Max size is 2MB.");
        return false;
      }
      return true;
    });

    const newImages = multiple
      ? [...images, ...validFiles].slice(0, maxFiles)
      : [validFiles[0]];

    setImages(newImages);
    simulateUpload();
    if (onUpload) onUpload(newImages);
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 15;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 150);
  };

  const handleChange = (e) => handleFiles(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    if (onUpload) onUpload(updated);
  };

  return (
    <Box className="my-4">
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
        {label}
      </Typography>

      {/* Upload Drop Zone */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
      >
        <Box
          sx={{
            border: dragActive
              ? "2px dashed #EE0979"
              : "2px dashed rgba(255,106,0,0.5)",
            borderRadius: "16px",
            textAlign: "center",
            py: 4,
            px: 2,
            backgroundColor: dragActive
              ? "rgba(238,9,121,0.05)"
              : "rgba(255,106,0,0.02)",
            transition: "0.3s ease",
            cursor: "pointer",
          }}
        >
          <CloudUploadIcon
            sx={{
              fontSize: 60,
              color: dragActive ? "#EE0979" : "#FF6A00",
              mb: 1,
            }}
          />
          <Typography sx={{ fontWeight: 600 }}>
            Drag & Drop your image here
          </Typography>
          <Typography sx={{ color: "gray", fontSize: "0.9rem" }}>
            or click to browse files
          </Typography>
          <input
            type="file"
            accept="image/*"
            multiple={multiple}
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleChange}
          />
        </Box>
      </motion.div>

      {/* Progress Bar */}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ color: "gray" }}>
            Uploading... {uploadProgress}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            sx={{
              mt: 1,
              borderRadius: "10px",
              height: 6,
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(90deg, #FF6A00, #EE0979)",
              },
            }}
          />
        </Box>
      )}

      {/* Preview Section */}
      {images.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            mt: 3,
          }}
        >
          {images.map((file, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 120,
                  height: 120,
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                }}
              >
                <Avatar
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  variant="rounded"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />

                <IconButton
                  size="small"
                  onClick={() => handleRemove(i)}
                  sx={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    backgroundColor: "rgba(255,255,255,0.9)",
                    color: "#EE0979",
                    "&:hover": { backgroundColor: "#fff" },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 0.5,
                  textAlign: "center",
                  color: "gray",
                  maxWidth: 120,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {file.name}
              </Typography>
            </motion.div>
          ))}
        </Box>
      )}

      {/* Upload Button */}
      {images.length > 0 && (
        <Box className="text-center mt-3">
          <Button
            variant="contained"
            onClick={() => alert("✅ Image(s) uploaded successfully!")}
            sx={{
              background: "linear-gradient(90deg, #FF6A00, #EE0979)",
              borderRadius: "50px",
              fontWeight: 600,
              textTransform: "none",
              px: 4,
              py: 1,
              "&:hover": {
                background: "linear-gradient(90deg, #EE0979, #FF6A00)",
              },
            }}
          >
            Upload Image{images.length > 1 ? "s" : ""}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ImageUploader;

// import React from "react";
// import ImageUploader from "../Utils/ImageUploader";
// import { Box, Typography } from "@mui/material";

// const RestaurantLogoUpload = () => {
//   const handleImages = (files) => {
//     console.log("📸 Selected images:", files);
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
//         Upload Restaurant Logo
//       </Typography>
//       <ImageUploader
//         label="Logo Upload"
//         multiple={false}
//         onUpload={handleImages}
//       />
//     </Box>
//   );
// };

// export default RestaurantLogoUpload;
