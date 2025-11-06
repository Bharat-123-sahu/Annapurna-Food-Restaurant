// FormField.jsx
import React from "react";
import TextField from "@mui/material/TextField";
import 'bootstrap/dist/css/bootstrap.min.css';

const FormField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  fullWidth = true,
  error = false,
  helperText = "",
  responsive = true,
  required = false
}) => {
  return (
    <div className={responsive ? "mb-3 col-12 col-md-6" : "mb-3"}>
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        fullWidth={fullWidth}
        error={error}
        helperText={helperText}
        required={required}
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: "12px",
          },
          '& .MuiInputLabel-root': {
            fontWeight: 500,
          },
          '& .MuiFormHelperText-root': {
            fontSize: "0.85rem",
          },
          '@media (max-width: 576px)': {
            '& .MuiOutlinedInput-input': {
              padding: "8px 10px",
            },
            '& .MuiInputLabel-root': {
              fontSize: "0.85rem",
            },
          },
          '@media (min-width: 577px) and (max-width: 768px)': {
            '& .MuiOutlinedInput-input': {
              padding: "10px 12px",
            },
          },
        }}
      />
    </div>
  );
};

export default FormField;

// import React, { useState } from "react";
// import FormField from "./FormField";

// const App = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   return (
//     <div className="container mt-4">
//       <form className="row g-3">
//         <FormField
//           label="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Enter your name"
//           required={true}
//         />
//         <FormField
//           label="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           type="email"
//           placeholder="Enter your email"
//           error={!email.includes("@") && email.length > 0}
//           helperText={!email.includes("@") && email.length > 0 ? "Invalid email" : ""}
//         />
//       </form>
//     </div>
//   );
// };

// export default App;
