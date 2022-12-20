import React, { useEffect, useState, useContext } from "react";
import DispatchContext from "../../context/DispatchContext";
import { showFlashMessage, logout, showLoading, hideLoading, showErrorMessage } from "../../reducer/actions";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { deleteAccount } from "./helper/API";

import { LogoutHelper } from "../Auth/helper/Auth";

const Confirmation = ({ open, setOpen }) => {
  const { dispatch } = useContext(DispatchContext);
  const [time, setTime] = useState(5);

  const handleClose = () => {
    setOpen(false);
    setTime(5);
  };
  const handleSubmit = async () => {
    handleClose();
    dispatch(showLoading());
    const { status } = await deleteAccount();
    dispatch(hideLoading());

    if (status === 200) {
      await LogoutHelper();
      dispatch(logout());
      dispatch(showFlashMessage("success", "Account has been deleted successfully!"));
    } else {
      dispatch(showErrorMessage());
    }
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
        <DialogTitle id="responsive-dialog-title">Are you sure you want to do this?</DialogTitle>
        <DialogContent>
          <DialogContentText>This is the last time you can change your mind. After pressing the proceed button your account will be deleted permanently.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleSubmit} disabled={time > 0 ? true : false}>
            Proceed {time > 0 ? `(${time})` : null}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Confirmation;
