// Pagination.jsx
import React from "react";
import { Pagination as MUIPagination, Stack, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';

const PagePagination = ({
  totalPages = 1,
  currentPage = 1,
  onChange,
  showItemsPerPage = false,
  itemsPerPage = 10,
  onItemsPerPageChange
}) => {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
      {/* Items per page selector */}
      {showItemsPerPage && (
        <FormControl size="small" sx={{ minWidth: 120, mb: { xs: 2, md: 0 } }}>
          <InputLabel>Items/Page</InputLabel>
          <Select
            value={itemsPerPage}
            label="Items/Page"
            onChange={(e) => onItemsPerPageChange && onItemsPerPageChange(e.target.value)}
          >
            {[5, 10, 20, 50].map((num) => (
              <MenuItem key={num} value={num}>{num}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Pagination */}
      <Stack spacing={2}>
        <MUIPagination
          count={totalPages}
          page={currentPage}
          onChange={(e, value) => onChange && onChange(value)}
          color="primary"
          variant="outlined"
          shape="rounded"
          sx={{
            '& .MuiPaginationItem-root': {
              borderRadius: '8px',
              minWidth: '36px',
              height: '36px',
              fontWeight: 500
            },
          }}
        />
      </Stack>
    </div>
  );
};

export default PagePagination;

// import React, { useState } from "react";
// import Pagination from "./Pagination";

// const App = () => {
//   const [page, setPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const totalPages = 20;

//   return (
//     <div className="container mt-4">
//       <h3>Paginated Content</h3>

//       {/* Example items */}
//       <p>Showing page {page}, {itemsPerPage} items per page.</p>

//       <Pagination
//         totalPages={totalPages}
//         currentPage={page}
//         onChange={(value) => setPage(value)}
//         showItemsPerPage={true}
//         itemsPerPage={itemsPerPage}
//         onItemsPerPageChange={(value) => setItemsPerPage(value)}
//       />
//     </div>
//   );
// };

// export default App;
