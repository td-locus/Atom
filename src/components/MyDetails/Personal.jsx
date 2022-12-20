import React, { useEffect, useState, useContext } from "react";
import DispatchContext from "../../context/DispatchContext";
import { showLoading, hideLoading, showFlashMessage, showErrorMessage } from "../../reducer/actions";

import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FormGroup } from "reactstrap";
import { useImmer } from "use-immer";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { addDetails, getDetails } from "./helper/API";

const Personal = () => {
  const { dispatch } = useContext(DispatchContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useImmer({
    college: {
      name: "",
      location: "",
      graduationYear: Date.now(),
    },
    domain: {
      domainPrimary: "",
      domainSecondary: "",
      memberSince: Date.now(),
    },
    skillSet: {
      soft: [],
      hard: [],
    },
    dob: new Date(),
    phone: "",
  });

  useEffect(() => {
    const getPersonalDetails = async () => {
      dispatch(showLoading());
      const { response } = await getDetails();
      response.skillSet.soft = response.skillSet.soft.toString();
      response.skillSet.hard = response.skillSet.hard.toString();
      setData((draft) => {
        draft.college = response.college;
        draft.domain = response.domain;
        draft.skillSet = response?.skillSet;
        draft.dob = response?.dob;
        draft.phone = response?.phone;
      });
      dispatch(hideLoading());
    };
    getPersonalDetails();
  }, []);

  const handleSubmit = async () => {
    console.log(data);
    setLoading(true);
    const responseValues = await addDetails(data);
    setLoading(false);
    if (responseValues.status === 200) {
      dispatch(showFlashMessage("success", "Profile updated successfuly!"));
    } else {
      dispatch(showErrorMessage());
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <p className="details-heading">Personal Details</p>
        <Divider flexItem style={{ marginTop: 20, marginBottom: 30 }} />
        <FormGroup className="college ">
          <TextField
            id="outlined-basic"
            label="Soft Skills"
            variant="outlined"
            value={data.skillSet.soft}
            onChange={(e) =>
              setData((draft) => {
                draft.skillSet.soft = e.target.value;
              })
            }
            fullWidth
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12}>
        <FormGroup className="college ">
          <TextField
            id="outlined-basic"
            label="Hard Skills"
            variant="outlined"
            value={data.skillSet.hard}
            onChange={(e) =>
              setData((draft) => {
                draft.skillSet.hard = e.target.value;
              })
            }
            fullWidth
          />
        </FormGroup>
      </Grid>
      <Grid item xs={6}>
        <FormGroup className="">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date of Birth"
              inputFormat="dd/MM/yyyy"
              value={data.dob}
              onChange={(newVal) =>
                setData((draft) => {
                  draft.dob = newVal;
                })
              }
              views={["year", "month", "day"]}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </FormGroup>
      </Grid>
      <Grid item xs={6}>
        <FormGroup className="">
          <TextField
            id="outlined-basic"
            label="Phone No."
            variant="outlined"
            value={data.phone}
            onChange={(e) =>
              setData((draft) => {
                draft.phone = e.target.value;
              })
            }
            fullWidth
          />
        </FormGroup>
      </Grid>

      <Grid item xs={12}>
        <p className="details-heading">College Details</p>
        <Divider flexItem style={{ marginTop: 20, marginBottom: 30 }} />
        <FormGroup className="college ">
          <TextField
            id="outlined-basic"
            label="College Name"
            variant="outlined"
            value={data.college.name}
            onChange={(e) =>
              setData((draft) => {
                draft.college.name = e.target.value;
              })
            }
            fullWidth
          />
        </FormGroup>
      </Grid>

      <Grid item xs={12}>
        <FormGroup className="college ">
          <TextField
            id="outlined-basic"
            label="Location"
            variant="outlined"
            value={data.college.location}
            onChange={(e) =>
              setData((draft) => {
                draft.college.location = e.target.value;
              })
            }
            fullWidth
          />
        </FormGroup>
      </Grid>

      <Grid item xs={12}>
        <FormGroup className="">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Graduation Year"
              inputFormat="MM/yyyy"
              value={data.college.graduationYear}
              onChange={(newVal) =>
                setData((draft) => {
                  draft.college.graduationYear = newVal;
                })
              }
              views={["year", "month"]}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormGroup>
      </Grid>

      <Grid item xs={12}>
        <p className="details-heading">Club Details</p>
        <Divider flexItem style={{ marginTop: 20, marginBottom: 30 }} />
        <FormControl fullWidth className="college ">
          <InputLabel id="primary-domain">Domain (primary)</InputLabel>
          <Select
            labelId="primary-domain"
            value={data.domain.domainPrimary || ""}
            label="Age"
            onChange={(e) =>
              setData((draft) => {
                draft.domain.domainPrimary = e.target.value;
              })
            }
          >
            <MenuItem value={"Web"}>Web</MenuItem>
            <MenuItem value={"App"}>App</MenuItem>
            <MenuItem value={"IoT"}>IoT</MenuItem>
            <MenuItem value={"Media"}>Media</MenuItem>
            <MenuItem value={"ML"}>Machine Learning</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth className="college ">
          <InputLabel id="secondary-domain">Domain (secondary)</InputLabel>
          <Select
            labelId="secondary-domain"
            value={data.domain.domainSecondary || ""}
            label="Age"
            onChange={(e) =>
              setData((draft) => {
                draft.domain.domainSecondary = e.target.value;
              })
            }
          >
            <MenuItem value={"Web"}>Web</MenuItem>
            <MenuItem value={"App"}>App</MenuItem>
            <MenuItem value={"IoT"}>IoT</MenuItem>
            <MenuItem value={"Media"}>Media</MenuItem>
            <MenuItem value={"ML"}>Machine Learning</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormGroup className="">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Member since"
              inputFormat="MM/yyyy"
              value={data.domain.memberSince}
              onChange={(newVal) =>
                setData((draft) => {
                  draft.domain.memberSince = newVal;
                })
              }
              views={["year", "month"]}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormGroup>
      </Grid>
      <Grid item xs={12}>
        <LoadingButton type="submit" loading={loading} loadingPosition="start" onClick={handleSubmit} startIcon={<SaveIcon />} variant="outlined">
          Save changes
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default Personal;
