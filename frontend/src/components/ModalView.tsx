import React from "react";
import {
  Modal,
  Fade,
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  Backdrop,
} from "@mui/material";
import { Props } from "./type";
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
const ModalView = (props: Props) => {
  const {
    open,
    handleClose,
    btnAction,
    handleUpdateContact,
    handleAddContact,
    handleUserInput,
    user,
  } = props;
  const { error, userContact } = user ?? {};
  const { firstname, lastname, physicaladdress, billingaddress } =
    userContact ?? {};

  return (
    // <div>
    <Paper>
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
            <Typography style={{ textAlign: "center" }} component={"div"}>
              {btnAction ? "Create User Contact" : "Update User Contact"}
            </Typography>
            <Typography
              id="transition-modal-title"
              sx={{ mt: 2 }}
              variant="h6"
              component={"div"}
            >
              <TextField
                sx={{ width: 250 }}
                id="standard-basic"
                required
                label="First Name"
                name="firstname"
                value={firstname ?? ""}
                error={error.includes("firstname")}
                variant="standard"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleUserInput(e)
                }
              />
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              component={"div"}
            >
              <TextField
                id="standard-basic"
                required
                label="Last Name"
                sx={{ width: 250 }}
                name="lastname"
                value={lastname ?? ""}
                variant="standard"
                error={error.includes("lastname")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleUserInput(e)
                }
              />
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              component={"div"}
            >
              <TextField
                id="standard-basic"
                sx={{ width: 250 }}
                label="PhysicalAddress"
                name="physicaladdress"
                value={physicaladdress ?? ""}
                variant="standard"
                required
                error={error.includes("physicaladdress")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleUserInput(e)
                }
              />
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              component={"div"}
            >
              <TextField
                id="standard-basic"
                required
                sx={{ width: 250 }}
                label="Billing Address"
                name="billingaddress"
                value={billingaddress ?? ""}
                error={error.includes("billingaddress")}
                variant="standard"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleUserInput(e)
                }
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
    </Paper>
  );
};

export default ModalView;
