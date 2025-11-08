// components/Utils/ChatWidget.jsx
import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  TextField,
  Avatar,
  Paper,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hello! How can I assist you today?" },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg = { from: "user", text: message };
    setMessages([...messages, newMsg]);
    setMessage("");

    // Simulate bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "✅ Got it! We’ll get back to you soon." },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            bottom: 30,
            right: 30,
            zIndex: 2000,
          }}
        >
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              background: "linear-gradient(135deg, #FF6A00, #EE0979)",
              color: "#fff",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              "&:hover": {
                background: "linear-gradient(135deg, #EE0979, #FF6A00)",
              },
            }}
            size="large"
          >
            <ChatIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </motion.div>
      )}

      {/* Chat Box */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              bottom: 30,
              right: 30,
              zIndex: 2000,
              width: 320,
            }}
          >
            <Paper
              elevation={8}
              sx={{
                borderRadius: "20px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: 420,
                background: "#fff",
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  background: "linear-gradient(90deg, #FF6A00, #EE0979)",
                  color: "#fff",
                  py: 1.2,
                  px: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    src="https://cdn-icons-png.flaticon.com/512/4712/4712105.png"
                    alt="Support"
                    sx={{ width: 32, height: 32 }}
                  />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Chat Support
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => setOpen(false)}
                  sx={{ color: "#fff" }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Chat Body */}
              <Box
                sx={{
                  flex: 1,
                  p: 2,
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  backgroundColor: "#fafafa",
                }}
              >
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: msg.from === "user" ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      alignSelf:
                        msg.from === "user" ? "flex-end" : "flex-start",
                      background:
                        msg.from === "user"
                          ? "linear-gradient(90deg, #FF6A00, #EE0979)"
                          : "#EAEAEA",
                      color: msg.from === "user" ? "#fff" : "#333",
                      padding: "8px 14px",
                      borderRadius:
                        msg.from === "user"
                          ? "16px 16px 0px 16px"
                          : "16px 16px 16px 0px",
                      maxWidth: "80%",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </Box>

              {/* Input Area */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 1,
                  borderTop: "1px solid #ddd",
                  backgroundColor: "#fff",
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Type a message..."
                  size="small"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "30px",
                      backgroundColor: "#f8f8f8",
                    },
                  }}
                />
                <IconButton
                  onClick={handleSend}
                  sx={{
                    color: "#FF6A00",
                    ml: 1,
                    "&:hover": { color: "#EE0979" },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;

// import React from "react";
// import ChatWidget from "../Utils/ChatWidget";

// const AdminDashboard = () => {
//   return (
//     <div style={{ position: "relative", height: "100vh" }}>
//       <h2 style={{ padding: "20px" }}>Admin Dashboard</h2>
//       {/* Floating Chat Widget */}
//       <ChatWidget />
//     </div>
//   );
// };

// export default AdminDashboard;

// socket.emit("message", message);
// socket.on("reply", (msg) => setMessages((prev) => [...prev, msg]));
