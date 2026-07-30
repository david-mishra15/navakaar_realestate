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
  Typography,
} from "@mui/material";

export default function IndustrialPlotsPage() {
  const [plots, setPlots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/sell/industrial`)
      .then((res) => {
        console.log("API Response:", res.data);
        setPlots(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const totalPages = Math.ceil(plots.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = plots.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, page) => {
    console.log("Page changed to:", page);
    setCurrentPage(page);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3, overflowX: "auto" }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Industrial Plots
      </Typography>

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
          {currentData.length > 0 ? (
            currentData.map((plot) => (
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={14} align="center">
                No Data Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Stack spacing={2} alignItems="center" sx={{ my: 2 }}>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        )}
      </Stack>
    </TableContainer>
  );
}
