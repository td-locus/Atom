import React, { useState, useContext, useEffect } from "react";
import DispatchContext from "../../context/DispatchContext";
import { showFlashMessage, showLoading, hideLoading, showErrorMessage } from "../../reducer/actions";

import { LoadingButton } from "@mui/lab";
import { Divider, Grid, TextField } from "@mui/material";
import { FormGroup } from "reactstrap";
import SaveIcon from "@mui/icons-material/Save";
import InputAdornment from "@mui/material/InputAdornment";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import WarningIcon from "@mui/icons-material/Warning";
import { useImmer } from "use-immer";

import { addSocial, getSocial } from "./helper/API";

const Social = () => {
  const { dispatch } = useContext(DispatchContext);
  const [loading, setLoading] = useState(false);
  const [social, setSocial] = useImmer({
    github: "",
    linkedIn: "",
    instagram: "",
  });
  const handleSave = async () => {
    setLoading(true);
    const responseValues = await addSocial(social);
    setLoading(false);
    if (responseValues.status === 200) {
      dispatch(showFlashMessage("success", "Saved successfully."));
    } else dispatch(showErrorMessage());
  };
  useEffect(() => {
    const fetchSocialLinks = async () => {
      dispatch(showLoading());

      const { response } = await getSocial();
      setSocial((draft) => {
        draft.github = response.github || "";
        draft.linkedIn = response.linkedIn || "";
        draft.instagram = response.instagram || "";
      });
      dispatch(hideLoading());
    };
    fetchSocialLinks();
  }, []);
  return (
    <>
      <Grid item xs={16}>
        <p className="details-heading">Social Accounts</p>
        <Divider flexItem style={{ marginTop: 20, marginBottom: 10 }} />
        <div className="mb-4 info-social">
          <WarningIcon />
          Please enter the username only (Not the whole URL)
        </div>
        <FormGroup className="mb-4">
          <TextField
            label="GitHub Username"
            value={social.github}
            onChange={(e) =>
              setSocial((draft) => {
                draft.github = e.target.value;
              })
            }
            type="text"
            fullWidth
            autoComplete="off"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GitHubIcon />
                </InputAdornment>
              ),
            }}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={16}>
        <FormGroup className="mb-4">
          <TextField
            label="LinkedIn Username"
            onChange={(e) =>
              setSocial((draft) => {
                draft.linkedIn = e.target.value;
              })
            }
            value={social.linkedIn}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkedInIcon />
                </InputAdornment>
              ),
            }}
            type="text"
            fullWidth
            autoComplete="off"
          />
        </FormGroup>
      </Grid>
      <Grid item xs={16}>
        <FormGroup className="mb-4">
          <TextField
            label="Instagram Username"
            onChange={(e) =>
              setSocial((draft) => {
                draft.instagram = e.target.value;
              })
            }
            value={social.instagram}
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InstagramIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            autoComplete="off"
          />
        </FormGroup>
      </Grid>
      <Grid item xs={16}>
        <LoadingButton type="submit" loading={loading} onClick={handleSave} loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">
          Save Changes
        </LoadingButton>
      </Grid>
    </>
  );
};

export default Social;
