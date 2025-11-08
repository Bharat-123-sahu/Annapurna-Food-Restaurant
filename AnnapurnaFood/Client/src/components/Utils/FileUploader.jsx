// components/Utils/FileUploader.jsx
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

/**
 * Reusable FileUploader component
 * @param {boolean} multiple - Allow multiple file uploads
 * @param {function} onFilesSelect - Callback when files are selected
 * @param {string} accept - Accepted file types
 * @param {boolean} preview - Show file previews (for images)
 */

const FileUploader = ({
  multiple = false,
  onFilesSelect,
  accept = "image/*",
  preview = true,
}) => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef(null);

  const handleFiles = (selectedFiles) => {
    const newFiles = multiple
      ? [...files, ...selectedFiles]
      : Array.from(selectedFiles).slice(0, 1);
    setFiles(newFiles);
    if (onFilesSelect) onFilesSelect(newFiles);

    // Simulate upload progress
    setUploadProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 100);
  };

  const handleChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemoveFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    if (onFilesSelect) onFilesSelect(newFiles);
  };

  const handleClick = () => inputRef.current.click();

  return (
    <Box className="my-4">
      {/* Upload Box */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={handleClick}
        sx={{
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            border: dragActive
              ? "2px dashed #EE0979"
              : "2px dashed rgba(255,106,0,0.4)",
            borderRadius: "16px",
            p: 4,
            textAlign: "center",
            backgroundColor: dragActive
              ? "rgba(238,9,121,0.05)"
              : "rgba(255,106,0,0.02)",
            transition: "0.3s",
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
            Drag & Drop your file here
          </Typography>
          <Typography sx={{ color: "gray", fontSize: "0.9rem" }}>
            or click to browse files
          </Typography>
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            ref={inputRef}
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </Box>
      </motion.div>

      {/* Upload Progress */}
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
              borderRadius: "8px",
              height: 6,
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(90deg, #FF6A00, #EE0979)",
              },
            }}
          />
        </Box>
      )}

      {/* Preview Section */}
      {preview && files.length > 0 && (
        <Box
          className="mt-4"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {files.map((file, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 100,
                  height: 100,
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                }}
              >
                {file.type.startsWith("image/") ? (
                  <Avatar
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    variant="rounded"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      backgroundColor: "rgba(255,106,0,0.1)",
                      color: "#FF6A00",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                    }}
                  >
                    {file.name.split(".").pop().toUpperCase()}
                  </Box>
                )}

                <IconButton
                  size="small"
                  onClick={() => handleRemoveFile(index)}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    color: "#EE0979",
                    "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
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
                  maxWidth: 100,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {file.name}
              </Typography>
            </motion.div>
          ))}
        </Box>
      )}

      {/* Upload Button */}
      {files.length > 0 && (
        <Box className="text-center mt-3">
          <Button
            variant="contained"
            onClick={() => alert("✅ Files uploaded successfully!")}
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
            Upload Now
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FileUploader;

// import React from "react";
// import FileUploader from "../Utils/FileUploader";
// import { Box, Typography } from "@mui/material";

// const UploadExample = () => {
//   const handleFiles = (files) => {
//     console.log("📁 Selected files:", files);
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
//         Upload Restaurant Images
//       </Typography>
//       <FileUploader multiple accept="image/*" onFilesSelect={handleFiles} />
//     </Box>
//   );
// };

// export default UploadExample;
