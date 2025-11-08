// components/Utils/MapComponent.jsx
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Box, Typography, Button } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import { motion } from "framer-motion";
import L from "leaflet";
import "bootstrap/dist/css/bootstrap.min.css";

// Custom Marker Icon (Orange-Pink Gradient)
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 34],
  popupAnchor: [0, -30],
});

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} draggable={true} icon={markerIcon}>
      <Popup>
        📍 Latitude: {position.lat.toFixed(4)}, Longitude:{" "}
        {position.lng.toFixed(4)}
      </Popup>
    </Marker>
  );
}

const MapComponent = ({
  defaultCenter = [22.7196, 75.8577], // Indore, India
  zoom = 13,
  onLocationSelect,
  height = "400px",
}) => {
  const [position, setPosition] = useState(null);

  const handleConfirm = () => {
    if (position && onLocationSelect) {
      onLocationSelect(position);
      alert(
        `✅ Location selected: ${position.lat.toFixed(
          4
        )}, ${position.lng.toFixed(4)}`
      );
    } else {
      alert("⚠️ Please select a location on the map first.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        sx={{
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            background: "linear-gradient(90deg, #FF6A00, #EE0979)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <RoomIcon />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Select Location
          </Typography>
        </Box>

        {/* Map Container */}
        <Box sx={{ height, position: "relative" }}>
          <MapContainer
            center={defaultCenter}
            zoom={zoom}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
        </Box>

        {/* Footer / Button */}
        <Box
          className="text-center p-3"
          sx={{
            backgroundColor: "rgba(255,106,0,0.05)",
          }}
        >
          <Button
            variant="contained"
            onClick={handleConfirm}
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
            Confirm Location
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
};

export default MapComponent;

// import React from "react";
// import MapComponent from "../Utils/MapComponent";
// import { Box, Typography } from "@mui/material";

// const LocationSelector = () => {
//   const handleLocationSelect = (coords) => {
//     console.log("📍 Selected:", coords);
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
//         Choose Your Restaurant Location
//       </Typography>
//       <MapComponent
//         defaultCenter={[22.7196, 75.8577]} // Indore
//         onLocationSelect={handleLocationSelect}
//         zoom={13}
//         height="420px"
//       />
//     </Box>
//   );
// };

// export default LocationSelector;

// const handleLocationSelect = async (coords) => {
//   await axios.post("/api/restaurant/location", {
//     latitude: coords.lat,
//     longitude: coords.lng,
//   });
// };
