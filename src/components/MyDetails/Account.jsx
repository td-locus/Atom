import React, { useEffect, useState, useContext, useRef } from "react";
import StateContext from "../../context/StateContext";
import DispatchContext from "../../context/DispatchContext";
import { showErrorMessage, showFlashMessage } from "../../reducer/actions";

import { Divider, Grid } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { FormGroup } from "reactstrap";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

import Confirmation from "./Confirmation";
import { changePassword, isPasswordMatching } from "./helper/API";

const Account = () => {
  const { state } = useContext(StateContext);
  const { dispatch } = useContext(DispatchContext);
  const oldPass = useRef();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordValid", (value) => {
      if (value && value.length < 8) return false;
      return true;
    });
    ValidatorForm.addValidationRule("isPasswordMatch", () => {
      return true;
    });
    ValidatorForm.addValidationRule("isPasswordCorrect", () => {
      return true;
    });
  }, []);
  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordCorrect", () => {
      return true;
    });
  }, [oldPassword]);
  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (!password.length) return true;
      if (value?.length && value === password) return true;
      return false;
    });
  }, [password]);

  const handleSubmit = async () => {
    setLoading(true);
    const isPasswordMatch = await isPasswordMatching(oldPassword);
    if (isPasswordMatch) {
      setLoading(false);
      const changed = await changePassword(password);
      if (changed) {
        dispatch(showFlashMessage("success", "Password changed successfully!"));
        setOldPassword("");
        setPassword("");
        setConfirmPassword("");
      } else {
        dispatch(showErrorMessage());
      }
    } else {
      setLoading(false);
      ValidatorForm.addValidationRule("isPasswordCorrect", () => {
        return false;
      });
      oldPass.current.validate();
    }
  };
  return (
    <>
      {!state.user.googleAuth && (
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <p className="details-heading">Change Password</p>
            <Divider flexItem style={{ marginTop: 20, marginBottom: 30 }} />
            <FormGroup className="mb-4">
              <TextValidator
                ref={oldPass}
                label="Old Password *"
                type="password"
                onChange={(e) => setOldPassword(e.target.value)}
                name="oldpassword"
                fullWidth
                value={oldPassword}
                validators={["required", "isPasswordValid", "isPasswordCorrect"]}
                errorMessages={["This field is required.", "Must have atleast 8 characters.", "Invalid Password."]}
                autoComplete="off"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup className="mb-4">
              <TextValidator
                label="New Password *"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                fullWidth
                value={password}
                validators={["required", "isPasswordValid"]}
                errorMessages={["This field is required.", "Must have atleast 8 characters."]}
                autoComplete="off"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup className="mb-4">
              <TextValidator
                label="Confirm New Password *"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="confirmpassword"
                fullWidth
                value={confirmPassword}
                validators={["required", "isPasswordValid", "isPasswordMatch"]}
                errorMessages={["This field is required.", "Must have atleast 8 characters.", "Password does not match."]}
                autoComplete="off"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <LoadingButton type="submit" loading={loading} loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">
              Change Password
            </LoadingButton>
          </Grid>
        </ValidatorForm>
      )}
      <Confirmation open={open} setOpen={setOpen} />
      <div className="mt-3">
        <p className="details-heading" style={{ color: "#D32F2F", fontWeight: 600 }}>
          Delete Account
        </p>
      </div>
      <Divider flexItem style={{ marginTop: 20, marginBottom: 20 }} />
      <Grid item xs={12}>
        <span className="deleteAccount text-muted">Once you delete your account, there is no going back. Please be certain.</span>
        <br />
        <LoadingButton loadingPosition="start" startIcon={<DeleteIcon />} variant="outlined" color="error" className="mt-2" onClick={() => setOpen(true)}>
          Delete Account
        </LoadingButton>
      </Grid>
    </>
  );
};

export default Account;
