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
  Button,
  TablePagination,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import api from "../helper/api";
import ModalView from "./ModalView";
import Swal from "sweetalert2";
import { UserState } from "./type";
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

  const initial = {
    userContact: {
      firstname: "",
      lastname: "",
      billingaddress: "",
      physicaladdress: "",
    },
    error: [],
    msg: "",
  };
  const [user, setUser] = useState<UserState>(initial);
  const [listOfContact, setListOfContact] = useState([]);
  const [btnAction, setBtnAction] = useState<boolean>(true);

  const handleUserInput = (e: any) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      userContact: { ...user.userContact, [name]: value },
      error: [],
    });
  };

  const handleGetListOfContact = async () => {
    const result = await api.getAllContact();
    if (result.data.msg === "No data Available") {
      setListOfContact([]);
    } else {
      setListOfContact(result.data.data ?? []);
    }
  };
  // For validation (all fields are required)
  const handleValidation = () => {
    let items: string[] = [];
    Object.entries(user.userContact).map(
      ([key, val]) => !val && items.push(key)
    );
    setUser({ ...user, error: items, msg: "❌All Fields Required" });
    return items;
  };

  const handleAddContact = async () => {
    const { firstname, lastname, billingaddress, physicaladdress } =
      user.userContact ?? {};
    let error: string[] = [];
    try {
      !firstname && error.push("firstname");
      !lastname && error.push("lastname");
      !physicaladdress && error.push("physicaladdress");
      !billingaddress && error.push("billingaddress");
      if (!error.length) {
        const res = await api.addContact(user.userContact);
        if (res?.data?.msg !== "Created Successfully") {
          Swal.fire("Warning", "Something went wrong!", "warning");
        } else {
          handleClose();
          setUser({
            ...user,
            userContact: {
              firstname: "",
              lastname: "",
              physicaladdress: "",
              billingaddress: "",
            },
            error: [],
            msg: "",
          });
          handleGetListOfContact();
        }
      } else {
        handleValidation();
      }
    } catch (error) {
      Swal.fire("Warning", "Server error!", "warning");
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
      Swal.fire("Warning", "Server Error", "warning");
    }
  };
  const handleClickedDeleteIcon = (id: string) => {
    Swal.fire({
      allowOutsideClick: false,
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "One contact has been deleted.", "success");
        handleDeleteContact(id);
      }
    });
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
        setUser({ msg: "", error: [], userContact: { ...data} });
        handleOpen();
      }
    } catch (error) {
      Swal.fire("Warning", "Server error!", "warning");
    }
  };
  const handleUpdateContact = async () => {
    const { firstname, lastname, billingaddress, physicaladdress } =
      user.userContact ?? {};
    let error: string[] = [];
    try {
      !firstname && error.push("firstname");
      !lastname && error.push("lastname");
      !physicaladdress && error.push("physicaladdress");
      !billingaddress && error.push("billingaddress");
      if (!error.length) {
        const res = await api.updateContact(user.userContact);
        if (res?.data.msg !== "Success") {
          Swal.fire("Warning", "Something went wrong1", "warning");
        } else {
          // Swal.fire("Updated", "Update Successfully!!!", "success");
          handleGetListOfContact();
          // setUser({ firstname: "", lastname: "", address: "" });
          handleClose();
        }
      } else {
        handleValidation();
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
                <TableCell align="center" colSpan={2}>
                  First Name
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Last Name
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  Physical Address
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  Billing Address
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listOfContact.length ? (
                listOfContact
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((contact, i) => {
                    const {
                      firstname,
                      lastname,
                      physicaladdress,
                      billingaddress,
                      _id,
                    } = contact;
                    return (
                      <TableRow hover role="checkbox" key={i}>
                        <TableCell align="center" colSpan={2}>
                          {firstname}
                        </TableCell>
                        <TableCell align="center" colSpan={2}>
                          {lastname}
                        </TableCell>
                        <TableCell align="center" colSpan={3}>
                          {physicaladdress}
                        </TableCell>
                        <TableCell align="center" colSpan={3}>
                          {billingaddress}
                        </TableCell>
                        <TableCell align="center" colSpan={2}>
                          <span>
                            <EditOutlinedIcon
                              style={{ color: "green" }}
                              onClick={() => handleOpenToUpdate(_id)}
                            ></EditOutlinedIcon>
                          </span>
                          <span>
                            <DeleteOutlineOutlinedIcon
                              style={{ color: "red" }}
                              onClick={() => handleClickedDeleteIcon(_id)}
                            ></DeleteOutlineOutlinedIcon>
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                // <div>a;lsdk</div>
                <TableRow>
                  <TableCell align="center" colSpan={12}>
                    No Data Available
                  </TableCell>
                </TableRow>
              )}
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
      <ModalView
        handleClose={handleClose}
        open={open}
        btnAction={btnAction}
        handleUserInput={handleUserInput}
        handleAddContact={handleAddContact}
        handleUpdateContact={handleUpdateContact}
        user={user}
      />
    </div>
  );
};

export default Dashboard;
