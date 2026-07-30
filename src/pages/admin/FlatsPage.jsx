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

export default function FlatsPage() {
  const [flats, setFlats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const API_URL = import.meta.env.VITE_API_URL; // .env se base URL

  useEffect(() => {
    axios
      .get(`${API_URL}/api/sell/flats`)
      .then((res) => setFlats(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(flats.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = flats.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3, overflowX: "auto" }}>
      <h2 style={{ padding: "10px" }}>Flats</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Sector</TableCell>
            <TableCell>Flat No</TableCell>
            <TableCell>Flat Size</TableCell>
            <TableCell>Bedroom</TableCell>
            <TableCell>Bathroom</TableCell>
            <TableCell>Furnish</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Facilities</TableCell>
            <TableCell>Authority</TableCell>
            <TableCell>Anything Else</TableCell>
            <TableCell>Expected Price</TableCell>
            <TableCell>Images</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentData.map((flat) => (
            <TableRow key={flat.id}>
              <TableCell>{flat.id}</TableCell>
              <TableCell>{flat.name}</TableCell>
              <TableCell>{flat.phone}</TableCell>
              <TableCell>{flat.email}</TableCell>
              <TableCell>{flat.sector}</TableCell>
              <TableCell>{flat.flat_no}</TableCell>
              <TableCell>{flat.flat_size}</TableCell>
              <TableCell>{flat.bedroom}</TableCell>
              <TableCell>{flat.bathroom}</TableCell>
              <TableCell>{flat.furnish}</TableCell>
              <TableCell>{flat.status}</TableCell>
              <TableCell>{flat.address}</TableCell>
              <TableCell>{flat.facilities}</TableCell>
              <TableCell>{flat.authority}</TableCell>
              <TableCell>{flat.anything_else}</TableCell>
              <TableCell>{flat.expected_price}</TableCell>
              <TableCell>
                {flat.image?.split(",").map((img, idx) => (
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
