// components/Utils/SupportPopup.jsx
import React, { useState } from "react";
import {
  Box,
  IconButton,
  Modal,
  Typography,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Reusable Support Popup Component
 */

const SupportPopup = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Thank you, ${form.name}! We’ll get back to you soon.`);
    setForm({ name: "", email: "", message: "" });
    setOpen(false);
  };

  return (
    <>
      {/* Floating Help Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          zIndex: 2500,
        }}
      >
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            background: "linear-gradient(135deg, #FF6A00, #EE0979)",
            color: "#fff",
            boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
            "&:hover": {
              background: "linear-gradient(135deg, #EE0979, #FF6A00)",
            },
          }}
          size="large"
        >
          <HelpOutlineIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </motion.div>

      {/* Support Modal */}
      <AnimatePresence>
        {open && (
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="support-popup"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Box
                sx={{
                  background: "#fff",
                  borderRadius: "20px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                  width: "90vw",
                  maxWidth: 450,
                  p: 3,
                  position: "relative",
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#FF6A00",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <HelpOutlineIcon />
                    Need Help?
                  </Typography>

                  <IconButton
                    onClick={() => setOpen(false)}
                    sx={{ color: "#EE0979" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    variant="outlined"
                    size="small"
                    value={form.name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    variant="outlined"
                    size="small"
                    value={form.email}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={3}
                    variant="outlined"
                    size="small"
                    value={form.message}
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                    required
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      background: "linear-gradient(90deg, #FF6A00, #EE0979)",
                      borderRadius: "50px",
                      fontWeight: 600,
                      textTransform: "none",
                      py: 1.2,
                      "&:hover": {
                        background: "linear-gradient(90deg, #EE0979, #FF6A00)",
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </form>

                {/* Divider */}
                <Box sx={{ my: 3, textAlign: "center" }}>
                  <Typography sx={{ color: "gray", fontSize: "0.9rem" }}>
                    or check FAQs
                  </Typography>
                </Box>

                {/* FAQ Accordion */}
                <Accordion sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 600 }}>
                      How long will support take to respond?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ fontSize: "0.9rem", color: "gray" }}>
                      Usually within 24 hours, depending on the issue.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 600 }}>
                      Can I contact via email?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ fontSize: "0.9rem", color: "gray" }}>
                      Yes, email us anytime at <b>support@annapurnafood.com</b>.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 600 }}>
                      Is 24/7 chat support available?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ fontSize: "0.9rem", color: "gray" }}>
                      Currently, our chat hours are 9 AM - 9 PM IST.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default SupportPopup;

// import React from "react";
// import SupportPopup from "../Utils/SupportPopup";
// import { Box, Typography } from "@mui/material";

// const Dashboard = () => (
//   <Box sx={{ p: 4 }}>
//     <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
//       Admin Dashboard
//     </Typography>
//     <Typography sx={{ mb: 4 }}>
//       Manage orders, restaurants, and customers. Click the help button if you need assistance.
//     </Typography>

//     {/* Floating Support Button */}
//     <SupportPopup />
//   </Box>
// );

// export default Dashboard;
