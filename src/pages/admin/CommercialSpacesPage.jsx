import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Stack,
} from "@mui/material";

export default function CommercialSpacesPage() {
  const [spaces, setSpaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/sell/commercial`)
      .then((res) => setSpaces(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(spaces.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = spaces.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3, overflowX: "auto" }}>
      <h2 style={{ padding: "10px" }}>Commercial Spaces</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Sector</TableCell>
            <TableCell>Plot No</TableCell>
            <TableCell>Block No</TableCell>
            <TableCell>Plot Size</TableCell>
            <TableCell>Facing</TableCell>
            <TableCell>Facilities</TableCell>
            <TableCell>Authority</TableCell>
            <TableCell>Anything Else</TableCell>
            <TableCell>Expected Price</TableCell>
            <TableCell>Images</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentData.map((space) => (
            <TableRow key={space.id}>
              <TableCell>{space.id}</TableCell>
              <TableCell>{space.name}</TableCell>
              <TableCell>{space.phone}</TableCell>
              <TableCell>{space.email}</TableCell>
              <TableCell>{space.sector}</TableCell>
              <TableCell>{space.plot_no}</TableCell>
              <TableCell>{space.block_no}</TableCell>
              <TableCell>{space.plot_size}</TableCell>
              <TableCell>{space.facing}</TableCell>
              <TableCell>{space.facilities}</TableCell>
              <TableCell>{space.authority}</TableCell>
              <TableCell>{space.anything_else}</TableCell>
              <TableCell>{space.expected_price}</TableCell>
              <TableCell>
                {space.image?.split(",").map((img, idx) => (
                  <img
                    key={idx}
                    src={`${API_URL}/uploads/${img}`}
                    alt=""
                    width={50}
                    style={{ marginRight: 5, borderRadius: 4 }}
                  />
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Stack spacing={2} alignItems="center" sx={{ my: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      )}
    </TableContainer>
  );
}
