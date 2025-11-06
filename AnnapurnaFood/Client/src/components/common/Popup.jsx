// Popup.jsx
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import 'bootstrap/dist/css/bootstrap.min.css';

const Popup = ({
  open="open",
  onClose,
  title = "hahaha",
  children,
  maxWidth = 500, // maximum width of modal
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="popup-title"
      aria-describedby="popup-content"
    sx={{backgroundColor:"green"}}
    >
      <Box
        className="container bg-white p-4 rounded shadow"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: maxWidth },
          maxWidth: '95%',
          borderRadius: 2,
          boxShadow: 24,
          outline: 'none',
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">{title}</h5>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </div>

        {/* Content */}
        <div className="popup-content">
          {children}
        </div>
      </Box>
    </Modal>
  );
};

export default Popup;

// import React, { useState } from "react";
// import Popup from "./Popup";
// import FormField from "./FormField";
// import MUIButton from "./MUIButton";

// const App = () => {
//   const [open, setOpen] = useState(false);
//   const [name, setName] = useState("");

//   return (
//     <div className="container mt-5 text-center">
//       <MUIButton text="Open Popup" color="primary" onClick={() => setOpen(true)} />

//       <Popup open={open} onClose={() => setOpen(false)} title="Enter Your Name">
//         <form className="row g-3">
//           <FormField
//             label="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <MUIButton
//             text="Submit"
//             color="success"
//             onClick={() => {
//               alert(`Hello ${name}`);
//               setOpen(false);
//             }}
//             fullWidth
//           />
//         </form>
//       </Popup>
//     </div>
//   );
// };

// export default App;

