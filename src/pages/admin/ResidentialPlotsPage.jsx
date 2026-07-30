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

export default function ResidentialPlotsPage() {
  const [plots, setPlots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const API_URL = import.meta.env.VITE_API_URL; // .env से base URL

  useEffect(() => {
    axios
      .get(`${API_URL}/api/sell/residential`)
      .then((res) => setPlots(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(plots.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = plots.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3, overflowX: "auto" }}>
      <h2 style={{ padding: "10px" }}>Residential Plots</h2>
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
          {currentData.map((plot) => (
            <TableRow key={plot.id}>
              <TableCell>{plot.id}</TableCell>
              <TableCell>{plot.name}</TableCell>
              <TableCell>{plot.phone}</TableCell>
              <TableCell>{plot.email}</TableCell>
              <TableCell>{plot.sector}</TableCell>
              <TableCell>{plot.plot_no}</TableCell>
              <TableCell>{plot.block_no}</TableCell>
              <TableCell>{plot.plot_size}</TableCell>
              <TableCell>{plot.facing}</TableCell>
              <TableCell>{plot.facilities}</TableCell>
              <TableCell>{plot.authority}</TableCell>
              <TableCell>{plot.anything_else}</TableCell>
              <TableCell>{plot.expected_price}</TableCell>
              <TableCell>
                {plot.image?.split(",").map((img, idx) => (
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
