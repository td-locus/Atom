import React, { useState, useEffect, useContext } from "react";
import DispatchContext from "../../context/DispatchContext";
import { showFlashMessage, showLoading, hideLoading, showErrorMessage } from "../../reducer/actions";

import { Container } from "reactstrap";
import { useLocation, useHistory } from "react-router-dom";
import { Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { FetchEvent, UpdateEvent, DeleteEvent } from "./helper/API";

const Event = () => {
  const { dispatch } = useContext(DispatchContext);
  const history = useHistory();
  const location = useLocation();
  const eventId = location.search.split("=")[1];
  const [event, setEvent] = useState({
    name: "",
    description: "",
    domain: "",
    meta: {
      isInternal: false,
      isSharable: false,
      isFree: true,
    },
    duration: {
      to: new Date(),
      from: new Date(),
    },
    type: "",
    eventLink: "",
    eventLocation: "",
  });
  const [original, setOriginal] = useState({});
  useEffect(() => {
    dispatch(showLoading());
    const fetchEvent = async () => {
      const event = await FetchEvent(eventId);
      setEvent(event);
      setOriginal(event);
      dispatch(hideLoading());
    };
    fetchEvent();
  }, []);

  const handleSubmit = async () => {
    dispatch(showLoading());
    const data = { ...event };
    if (event.type === "online") delete data.eventLocation;
    else delete data.eventLink;
    data._id = eventId;
    const status = await UpdateEvent(data);
    dispatch(hideLoading());
    if (status === 200) dispatch(showFlashMessage("success", "Event updated successfully!"));
    else dispatch(showErrorMessage());
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    const status = await DeleteEvent(eventId);
    if (status === 200) {
      history.push(`/my-space`);
      dispatch(showFlashMessage("success", "Event deleted successfully!"));
    } else {
      dispatch(showErrorMessage());
    }
  };

  return (
    <Container fluid className="auth-layout py-3">
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete this event?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">This event be deleted immediately. You can't undo this action.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
      <div className="heading d-flex justify-content-between">
        <h3>Edit Event</h3>
      </div>
      <Grid container spacing={2} xs={12} md={10} sx={{ mx: "auto", mt: 3 }}>
        <Grid item xs={8}>
          <TextField
            // focused
            required
            id="outlined-required"
            label="Name"
            fullWidth
            value={event.name}
            onChange={(e) =>
              setEvent({
                ...event,
                name: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl sx={{ minWidth: 120, mr: 1 }} fullWidth required>
            <InputLabel id="sort-label">Domain</InputLabel>
            <Select labelId="domain-label" id="domain" label="domain" value={event.domain} onChange={(e) => setEvent({ ...event, domain: e.target.value })}>
              <MenuItem value="Web">Web</MenuItem>
              <MenuItem value="App">App</MenuItem>
              <MenuItem value="ML">ML</MenuItem>
              <MenuItem value="IoT">IOT</MenuItem>
              <MenuItem value="Media">Media</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <TextField
            required
            id="outlined-required"
            label="Description"
            multiline
            rows={4}
            fullWidth
            value={event.description}
            onChange={(e) =>
              setEvent({
                ...event,
                description: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={4}>
          <FormGroup aria-label="position" column>
            <FormControlLabel
              control={
                <Checkbox
                  name="sharable"
                  checked={event.meta.isSharable}
                  onChange={(e) =>
                    setEvent({
                      ...event,
                      meta: { ...event.meta, isSharable: e.target.checked },
                    })
                  }
                />
              }
              label="Sharable"
            />
            <FormControlLabel control={<Checkbox name="free" checked={false} disabled />} label="Free" />
            <FormControlLabel
              control={
                <Checkbox
                  name="internal"
                  checked={event.meta.isInternal}
                  onChange={(e) =>
                    setEvent({
                      ...event,
                      meta: { ...event.meta, isInternal: e.target.checked },
                    })
                  }
                />
              }
              label="Internal"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} fullWidth />}
              label="Starts At"
              value={event.duration.from}
              onChange={(newValue) => {
                setEvent({ ...event, duration: { ...event.duration, from: newValue } });
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} fullWidth />}
              label="Ends At"
              value={event.duration.to}
              onChange={(newValue) => {
                setEvent({ ...event, duration: { ...event.duration, to: newValue } });
              }}
              minDateTime={event.duration.from}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth required>
            <InputLabel id="type-label">Event Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              label="type"
              value={event.type}
              onChange={(e) => setEvent({ ...event, type: e.target.value, [e.target.value === "offline" ? `eventLocation` : `eventLink`]: "" })}
            >
              <MenuItem value="online">Online</MenuItem>
              <MenuItem value="offline">Offline</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <TextField
            // focused={true}
            id="outlined-required"
            label={event.type === "offline" ? "Event Location" : "Event Link"}
            fullWidth
            value={event.type === "offline" ? event.eventLocation : event.eventLink}
            onChange={(e) =>
              setEvent({
                ...event,
                [event.type === "offline" ? `eventLocation` : `eventLink`]: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" color="error" className="me-2 mb-2" onClick={handleClickOpen} startIcon={<DeleteIcon />}>
            Delete Event
          </Button>
          <Button variant="outlined" className="me-2 mb-2" onClick={() => setEvent(original)} startIcon={<RotateLeftIcon />}>
            Undo Changes
          </Button>
          <Button variant="contained" className="me-2 mb-2" onClick={handleSubmit} startIcon={<SaveIcon />}>
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Event;
