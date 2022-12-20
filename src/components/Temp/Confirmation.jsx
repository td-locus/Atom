import React, { useEffect, useState, useContext } from "react";
import DispatchContext from "../../context/DispatchContext";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Confirmation = ({ open, setOpen, handleSubmit }) => {
  const { dispatch } = useContext(DispatchContext);
  const [time, setTime] = useState(5);

  const handleClose = () => {
    setOpen(false);
    setTime(5);
  };

  useEffect(() => {
    let timer;
    if (open) {
      timer = setInterval(() => {
        setTime((draft) => draft - 1);
      }, 1000);
      if (time === 0) {
        clearInterval(timer);
      }
    }
    return () => clearInterval(timer);
  }, [time, open]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">Are you sure you want to proceed?</DialogTitle>
        <DialogContent>
          <DialogContentText>After pressing the proceed button your order will be confirmed.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleSubmit();
              handleClose();
            }}
            disabled={time > 0 ? true : false}
          >
            Proceed {time > 0 ? `(${time})` : null}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Confirmation;
