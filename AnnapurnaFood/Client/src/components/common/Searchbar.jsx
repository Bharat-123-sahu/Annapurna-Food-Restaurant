// SearchBar.jsx
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchBar = ({ placeholder = "Search...", onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) onSearch("");
  };

  return (
    <div className="mb-3 col-12 col-md-6 mx-auto">
      <TextField
        fullWidth
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        variant="outlined"
        size="medium"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} edge="end">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          borderRadius: "12px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
          "@media (max-width: 576px)": {
            "& .MuiOutlinedInput-input": {
              padding: "8px 12px",
            },
          },
          "@media (min-width: 577px) and (max-width: 768px)": {
            "& .MuiOutlinedInput-input": {
              padding: "10px 14px",
            },
          },
        }}
      />
    </div>
  );
};

export default SearchBar;

// import React, { useState } from "react";
// import SearchBar from "./SearchBar";

// const App = () => {
//   const [results, setResults] = useState([]);

//   const handleSearch = (query) => {
//     console.log("Searching for:", query);
//     // Here you can implement your search logic
//     setResults(query ? [`Result for "${query}"`] : []);
//   };

//   return (
//     <div className="container mt-4">
//       <SearchBar placeholder="Search items..." onSearch={handleSearch} />
//       <div className="mt-3">
//         {results.length > 0 ? (
//           results.map((item, index) => <p key={index}>{item}</p>)
//         ) : (
//           <p>No results</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;
