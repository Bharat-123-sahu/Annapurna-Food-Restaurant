// Loader.jsx
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import 'bootstrap/dist/css/bootstrap.min.css';

const Loader = ({ size = 60, color = "primary", fullScreen = false, text = "" }) => {
  return (
    <div
      className={`d-flex justify-content-center align-items-center ${fullScreen ? "position-fixed top-0 start-0 w-100 h-100 bg-light bg-opacity-75" : ""}`}
      style={{ zIndex: fullScreen ? 1050 : "auto", minHeight: fullScreen ? "100vh" : "auto" }}
    >
      <div className="text-center">
        <CircularProgress color={color} size={size} />
        {text && <div className="mt-2" style={{ fontWeight: 500 }}>{text}</div>}
      </div>
    </div>
  );
};

export default Loader;

// import React, { useState, useEffect } from "react";
// import Loader from "./Loader";

// const App = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 3000); // simulate data fetching
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <Loader fullScreen={true} text="Loading, please wait..." />
//       ) : (
//         <div className="container mt-5">
//           <h1>Data Loaded!</h1>
//           <p>This is your content.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
