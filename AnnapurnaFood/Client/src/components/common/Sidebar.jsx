// Sidebar.jsx
import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = ({ links = [] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Mobile Hamburger */}
      <div className="d-md-none p-2">
        <IconButton onClick={() => setOpen(true)}>
          <MenuIcon />
        </IconButton>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-light position-fixed top-0 start-0 h-100 shadow p-3 d-flex flex-column ${
          open ? "d-block" : "d-none d-md-block"
        }`}
        style={{ width: 250, zIndex: 1050 }}
      >
        {/* Close Button on Mobile */}
        <div className="d-md-none mb-3 d-flex justify-content-end">
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>

        {/* Menu Links */}
        <List>
          {links.map((link, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                if (link.onClick) link.onClick();
              }}
              className="mb-1 rounded"
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "white",
                  "& .MuiListItemIcon-root": { color: "white" },
                },
              }}
            >
              {link.icon && <ListItemIcon>{link.icon}</ListItemIcon>}
              <ListItemText primary={link.text} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Sidebar;

// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import HomeIcon from "@mui/icons-material/Home";
// import InfoIcon from "@mui/icons-material/Info";

// const App = () => {
//   const links = [
//     { text: "Home", icon: <HomeIcon />, onClick: () => alert("Home Clicked") },
//     { text: "About", icon: <InfoIcon />, onClick: () => alert("About Clicked") },
//   ];

//   return (
//     <div className="d-flex">
//       <Sidebar links={links} />
//       <div className="flex-grow-1 p-4 ms-md-250">
//         <h1>Main Content</h1>
//         <p>This is the main area of your app.</p>
//       </div>
//     </div>
//   );
// };

// export default App;
