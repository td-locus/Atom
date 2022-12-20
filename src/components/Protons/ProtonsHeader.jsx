import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ClearIcon from "@mui/icons-material/Clear";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";

import "../../css/Protons/Protons.css";

const ProtonsHeader = ({ setProtons, originalProtons, domain, handleDomain, role, handleRole }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.length) {
      const searchValues = originalProtons.filter((e) => {
        return e.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
      setProtons(searchValues);
    } else {
      setProtons(originalProtons);
    }
  }, [searchTerm]);
  const [state, setState] = useState({
    bottom: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setState({ bottom: open });
  };
  return (
    <>
      <SwipeableDrawer sx={{ overflowX: "hidden" }} anchor={"bottom"} open={state.bottom} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <div className="d-flex justify-content-between">
          <h4 className="px-3 pt-3 fw-bold">Filter & Search</h4>
          <h4 className="px-3 pt-3" style={{ cursor: "pointer" }} onClick={toggleDrawer(false)}>
            <ClearIcon />
          </h4>
        </div>
        <div className="overflow-hide-drawer events-drawer">
          <Box role="presentation">
            <List>
              <ListItem button>
                <FormControl fullWidth>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select labelId="role-label" id="role" label="role" value={role} onChange={handleRole}>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="lead">Leads</MenuItem>
                    <MenuItem value="vice-lead">Vice Leads</MenuItem>
                    <MenuItem value="member">Members</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem button>
                <FormControl fullWidth>
                  <InputLabel id="sort-label">Domain</InputLabel>
                  <Select labelId="domain-label" id="domain" label="domain" value={domain} onChange={handleDomain}>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="Web">Web</MenuItem>
                    <MenuItem value="App">App</MenuItem>
                    <MenuItem value="ML">ML</MenuItem>
                    <MenuItem value="IoT">IOT</MenuItem>
                    <MenuItem value="Media">Media</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem button>
                <FormControl fullWidth>
                  <TextField id="standard-basic" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="searchUser" label="Search for a user" variant="outlined" />
                </FormControl>
              </ListItem>
            </List>
          </Box>
        </div>
      </SwipeableDrawer>
      <div className="heading d-flex justify-content-between mb-2">
        <h3>Team Directory</h3>
        <div className="d-flex justify-content-between align-items-center hide_mobile">
          <FormControl sx={{ minWidth: 120, mr: 1 }}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select labelId="role-label" id="role" label="role" value={role} onChange={handleRole}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="lead">Leads</MenuItem>
              <MenuItem value="vice-lead">Vice Leads</MenuItem>
              <MenuItem value="member">Members</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120, mr: 1 }}>
            <InputLabel id="sort-label">Domain</InputLabel>
            <Select labelId="domain-label" id="domain" label="domain" value={domain} onChange={handleDomain}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Web">Web</MenuItem>
              <MenuItem value="App">App</MenuItem>
              <MenuItem value="ML">ML</MenuItem>
              <MenuItem value="IoT">IOT</MenuItem>
              <MenuItem value="Media">Media</MenuItem>
            </Select>
          </FormControl>
          <TextField id="standard-basic" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="searchUser" label="Search for a user" variant="outlined" />
        </div>
        <div className="hide_screen">
          <IconButton className="drawer ms-2" onClick={toggleDrawer(true)}>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default ProtonsHeader;
