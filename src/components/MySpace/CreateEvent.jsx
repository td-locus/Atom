import React, { useState, useContext, useEffect } from "react";
import "../../css/MySpace/MySpace.css";
import DispatchContext from "../../context/DispatchContext";
import { showFlashMessage } from "../../reducer/actions";

import SimpleBar from "simplebar-react";
import { Card, CardBody } from "reactstrap";
import LoadingButton from "@mui/lab/LoadingButton";
import Tooltip from "@mui/material/Tooltip";
import SendIcon from "@mui/icons-material/Send";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";

import { CreateEvent_ } from "./helper/API";
import { CreateAudit } from "../Auth/helper/functions";

const CreateEvent = ({ fetchActivity, fetchUpcomingEvents, fetchEventsByMe }) => {
  const { dispatch } = useContext(DispatchContext);

  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [event, setEvent] = useState("");
  const [domain, setDomain] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [meta, setMeta] = useState({
    isSharable: false,
    isInternal: false,
    isFree: true,
    isWPS: false,
  });
  const options = [
    { label: "Online", value: "online" },
    { label: "Offline", value: "offline" },
  ];
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    let data = {
      name: eventName,
      type: eventType,
      domain,
      description,
      meta: {
        isSharable: meta.isSharable,
        isInternal: meta.isInternal,
        isFree: true,
        isWPS: meta.isWPS,
      },
      duration: {
        from: startDate,
        to: endDate,
      },
    };
    data["event" + (eventType === "online" ? "Link" : "Location")] = event;

    const response = await CreateEvent_(data);

    setLoading(false);

    if (response.status === 201) {
      await CreateAudit("event", "You created an event.");
      fetchActivity();
      fetchUpcomingEvents();
      fetchEventsByMe();

      dispatch(showFlashMessage("success", "Event created successfully!"));

      // resetForm();
    } else dispatch(showFlashMessage("error", "An error occurred! Please try again."));
  };

  const resetForm = () => {
    setEventName("");
    setEventType("");
    setDescription("");
    setEvent("");
    setDomain("");
    setMeta({
      isSharable: false,
      isInternal: false,
      isFree: true,
      isWPS: false,
    });
  };

  useEffect(() => {
    function validURL(str) {
      var pattern = new RegExp(
        "^(http(s)?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    }
    ValidatorForm.addValidationRule("isLink", (val) => {
      if (!validURL(val)) return false;
      else return true;
    });
  }, []);
  return (
    <div className="create-event pt-2">
      <Card style={{ position: "relative" }} className="p-1 pt-0">
        <CardBody>
          <SimpleBar style={{ maxHeight: "420px", padding: 10 }}>
            <h3 className="my-space-card-title">Create New Event</h3>
            <ValidatorForm className="myspace-form" onSubmit={handleSubmit}>
              <div className="form-item mb-3">
                <TextValidator
                  label="Event Name"
                  variant="outlined"
                  fullWidth
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  validators={["required"]}
                  errorMessages={["This field is required."]}
                />
              </div>
              <div className="form-item mb-3">
                <FormControl fullWidth>
                  <InputLabel id="domain-label">Domain</InputLabel>
                  <Select labelId="domain-label" id="domain" label="domain" value={domain} onChange={(e) => setDomain(e.target.value)}>
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Web">Web</MenuItem>
                    <MenuItem value="App">App</MenuItem>
                    <MenuItem value="ML">ML</MenuItem>
                    <MenuItem value="IoT">IOT</MenuItem>
                    <MenuItem value="Media">Media</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="form-item mb-3 form-item-select">
                <FormControl fullWidth>
                  <InputLabel id="event-type">Event Type</InputLabel>
                  <Select labelId="event-type-select" id="event-type-select" variant="outlined" value={eventType} label="Event type" onChange={(e) => setEventType(e.target.value)}>
                    {options.map((option, idx) => {
                      return (
                        <MenuItem value={option.value} key={idx}>
                          {option.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              {eventType.length > 0 && (
                <>
                  <div className="form-item mb-2">
                    {eventType === "online" ? (
                      <TextValidator
                        label={"Event Link"}
                        variant="outlined"
                        fullWidth
                        value={event}
                        onChange={(e) => setEvent(e.target.value)}
                        validators={["required", "isLink"]}
                        errorMessages={["This field is required.", "Please enter a valid link."]}
                      />
                    ) : (
                      <TextValidator
                        label={"Event Location"}
                        variant="outlined"
                        fullWidth
                        value={event}
                        onChange={(e) => setEvent(e.target.value)}
                        validators={["required"]}
                        errorMessages={["This field is required."]}
                      />
                    )}
                  </div>
                  <div className="form-item py-2">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} fullWidth />}
                        label="Starts At"
                        value={startDate}
                        onChange={(newValue) => {
                          setStartDate(newValue);
                        }}
                        // minDateTime={new Date()}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="form-item py-2">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} fullWidth />}
                        label="Ends At"
                        value={endDate}
                        onChange={(newValue) => {
                          setEndDate(newValue);
                        }}
                        minDateTime={startDate}
                      />
                    </LocalizationProvider>
                  </div>
                </>
              )}
              <div className="form-item my-2">
                <TextValidator
                  validators={["required"]}
                  errorMessages={["This field is required."]}
                  id="outlined-multiline-static"
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="form-item mb-2">
                <FormGroup aria-label="position" row>
                  <FormControlLabel control={<Checkbox name="sharable" checked={meta.isSharable} onChange={(e) => setMeta({ ...meta, isSharable: e.target.checked })} />} label="Sharable" />
                  <div className="me-2">
                    <Tooltip title="Event can be shared by attendees" placement="top" arrow>
                      <HelpOutlineIcon className="help-icon" />
                    </Tooltip>
                  </div>
                  <FormControlLabel control={<Checkbox name="free" checked={true} disabled />} label="Free" />
                  <FormControlLabel control={<Checkbox name="internal" checked={meta.isInternal} onChange={(e) => setMeta({ ...meta, isInternal: e.target.checked })} />} label="Internal" />
                  <FormControlLabel control={<Checkbox name="wps" checked={meta.isWPS} onChange={(e) => setMeta({ ...meta, isWPS: e.target.checked })} />} label="WPS" />
                </FormGroup>
              </div>
              <div className="form-item form-buttons">
                <LoadingButton loadingPosition="start" startIcon={<RotateLeftIcon />} variant="contained" onClick={resetForm} className="reset-form">
                  Reset Form
                </LoadingButton>
                <LoadingButton type="submit" loading={loading} loadingPosition="start" startIcon={<SendIcon />} variant="outlined">
                  Create event
                </LoadingButton>
              </div>
            </ValidatorForm>
          </SimpleBar>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateEvent;
