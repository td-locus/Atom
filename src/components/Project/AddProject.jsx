import React from "react";
import { useImmer } from "use-immer";

import { Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
const AddProject = () => {
  const [data, setData] = useImmer({
    name: "",
    domain: "",
    desc: "",
    lead: [],
    members: [],
    meta: {
      isOpenSource: false,
      isInternal: false,
      isPaid: false,
    },
    clients: [],
    startDateTime: new Date(),
    endDateTime: new Date(),
  });
  const handleChange = (e, prop) =>
    setData((draft) => {
      draft[prop] = e.target.value;
    });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField required id="outlined-required" label="Name" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <FormControl sx={{ minWidth: 120, mr: 1 }} fullWidth required>
            <InputLabel id="sort-label">Domain</InputLabel>
            <Select labelId="domain-label" id="domain" label="domain" value={data.domain} onChange={(e) => handleChange(e, "domain")}>
              <MenuItem value="Web">Web</MenuItem>
              <MenuItem value="App">App</MenuItem>
              <MenuItem value="ML">ML</MenuItem>
              <MenuItem value="IoT">IOT</MenuItem>
              <MenuItem value="Media">Media</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <TextField required id="outlined-required" label="Description" multiline rows={4} fullWidth value={data.desc} onChange={(e) => handleChange(e, "desc")} />
        </Grid>
        <Grid item xs={4}>
          <FormGroup aria-label="position" column>
            <FormControlLabel control={<Checkbox name="sharable" checked={data.meta.isOpenSource} />} label="Open Source" />
            <FormControlLabel control={<Checkbox name="free" checked={false} disabled />} label="Paid" />
            <FormControlLabel control={<Checkbox name="internal" checked={data.meta.isInternal} />} label="Internal" />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" startIcon={<ControlPointIcon />}>
            Create
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AddProject;
