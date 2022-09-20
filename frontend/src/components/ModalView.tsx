import React from "react";
import {
  Modal,
  Fade,
  Box,
  Typography,
  TextField,
  Backdrop,
} from "@mui/material";
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
function ModalView() {
  const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
  return (
    <div>
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
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <TextField
                id="standard-basic"
                label="First Name"
                variant="standard"
              />
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 4 }}>
              <TextField
                id="standard-basic"
                label="Last Name"
                variant="standard"
              />
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <TextField
                id="standard-basic"
                label="Address"
                variant="standard"
              />
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalView;
