import React, { useState } from "react";
import "./style.css";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Button,
  TablePagination,
  Modal,
  Fade,
  Box,
  Typography,
  Backdrop,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import api from "../helper/api";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Dashboard = () => {
  const rows = [
    { fname: "Jessa Mae", lname: "Yosores", address: "Dalaguete Cebu" },
    { fname: "Redgie", lname: "Gravador", address: "Talamban Cebu" },
  ];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const userContact = { firstname: "", lastname: "", address: "" };
  const [user, setUser] = useState(userContact);

  const handleUserInput = (e: any) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleAddContact = async () => {
    const { firstname, lastname, address } = user ?? {};
    console.log("%c ⏏️: handleAddContact -> user ", "font-size:16px;background-color:#1430e9;color:white;", user)
    try {
      if (firstname && lastname && address) {
        const res = await api.addContact(user);
        console.log("%c 🥑: handleAddContact -> res ", "font-size:16px;background-color:#629d9d;color:white;", res)
        setUser(user)
        handleClose()
    }
    } catch (error) {

    }
  };

  return (
    <div>
      {" "}
      <div className="buttonCreate">
        <Button variant="contained" onClick={handleOpen}>
          Create
        </Button>
      </div>
      <Paper sx={{ maxWidth: 1000, margin: "auto", top: 500 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow style={{ backgroundColor: "yellow" }}>
                <TableCell align="center" colSpan={12}>
                  User Contact Management System
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  First Name
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  Last Name
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  Address
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox">
                      <TableCell align="center" colSpan={3}>
                        {row.fname}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {row.lname}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {row.address}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        <span>
                          <EditOutlinedIcon
                            style={{ color: "green" }}
                          ></EditOutlinedIcon>
                        </span>
                        <span>
                          <DeleteOutlineOutlinedIcon
                            style={{ color: "red" }}
                          ></DeleteOutlineOutlinedIcon>
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={{ ...style, textAlign: "center" }}>
            <Typography style={{ textAlign: "center" }}>
              Create User Contact
            </Typography>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <TextField
                sx={{ width: 250 }}
                id="standard-basic"
                label="First Name"
                name="firstname"
                variant="standard"
                onChange={(e) => handleUserInput(e)}
              />
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 4 }}>
              <TextField
                id="standard-basic"
                label="Last Name"
                sx={{ width: 250 }}
                name="lastname"
                variant="standard"
                onChange={(e) => handleUserInput(e)}
              />
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <TextField
                id="standard-basic"
                sx={{ width: 250 }}
                label="Address"
                name="address"
                variant="standard"
                onChange={(e) => handleUserInput(e)}
              />
            </Typography>
            <Button variant="contained" sx={{ top: 10 }} onClick={handleAddContact}>
              Add Contact
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Dashboard;
