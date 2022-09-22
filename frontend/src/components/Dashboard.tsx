import React, { useState, useEffect } from "react";
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
  const [listOfContact, setListOfContact] = useState([]);
  const [btnAction, setBtnAction] = useState<boolean>(true);

  const handleUserInput = (e: any) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const { firstname, lastname, address } = user ?? {};

  const handleGetListOfContact = async () => {
    const result = await api.getAllContact();
    setListOfContact(result.data.data);
  };

  const handleAddContact = async () => {
    try {
      if (firstname && lastname && address) {
        const res = await api.addContact(user);
        if (res?.data?.msg !== "Created Successfully") {
          alert("Something went wrong");
        } else {
          handleClose();
          setUser({ firstname: "", lastname: "", address: "" });
          handleGetListOfContact();
        }
      } else {
        alert("all fields are required!");
      }
    } catch (error) {
      alert("Internal server error");
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      const res = await api.deleteContact(id);
      const contactList = listOfContact.filter((contact: any) => {
        return contact._id !== id;
      });
      setListOfContact(contactList);
      return res;
    } catch (error) {
      alert("Internal server error");
    }
  };

  const openCreate = () => {
    setBtnAction(true);
    handleOpen();
  };
  const handleOpenToUpdate = async (id: string) => {
    try {
      if (id) {
        const res = await api.getContactById(id);
        const { data } = res.data;
        setBtnAction(false);
        setUser({ ...data });
        handleOpen();
      }
    } catch (error) {
      alert("Internal sserver error");
    }
  };
  const handleUpdateContact = async () => {
    try {
      if (firstname && lastname && address) {
        const res = await api.updateContact(user);
        if (res?.data.msg !== "Success") {
          alert("Something went wrong");
        } else {
          handleGetListOfContact();
          setUser({ firstname: "", lastname: "", address: "" });
          handleClose();
        }
      } else {
        alert("All fields are required!");
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleGetListOfContact();
  }, []);

  return (
    <div>
      {" "}
      <div className="buttonCreate">
        <Button variant="contained" onClick={openCreate}>
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
              {listOfContact
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((contact, i) => {
                  const { firstname, lastname, address, _id } = contact;
                  return (
                    <TableRow hover role="checkbox" key={i}>
                      <TableCell align="center" colSpan={3}>
                        {firstname}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {lastname}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {address}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        <span>
                          <EditOutlinedIcon
                            style={{ color: "green" }}
                            onClick={() => handleOpenToUpdate(_id)}
                          ></EditOutlinedIcon>
                        </span>
                        <span>
                          <DeleteOutlineOutlinedIcon
                            style={{ color: "red" }}
                            onClick={() => handleDeleteContact(_id)}
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
          count={listOfContact.length}
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
                value={firstname ?? ""}
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
                value={lastname ?? ""}
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
                value={address ?? ""}
                variant="standard"
                onChange={(e) => handleUserInput(e)}
              />
            </Typography>
            {btnAction ? (
              <Button
                variant="contained"
                sx={{ top: 10 }}
                onClick={handleAddContact}
              >
                Add Contact
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ top: 10 }}
                onClick={() => handleUpdateContact()}
              >
                Update Contact
              </Button>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Dashboard;
