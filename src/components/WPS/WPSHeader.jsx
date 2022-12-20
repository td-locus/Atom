import React, { useState, useContext } from "react";
import StateContext from "../../context/StateContext";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ClearIcon from "@mui/icons-material/Clear";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";

import "../../css/Reusable/drawer.css";

const WPSHeader = ({ sort, order, date, type, toggleType, toggleDate, toggleSort, toggleOrder }) => {
  const { state } = useContext(StateContext);

  const [drawer, setDrawer] = useState({
    bottom: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawer({ bottom: open });
  };

  return (
    <div className="heading d-flex justify-content-between mb-2">
      <h3>Weekly Productive Sessions</h3>
      <SwipeableDrawer sx={{ overflowX: "hidden" }} anchor={"bottom"} open={drawer.bottom} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <div className="d-flex justify-content-between">
          <h4 className="px-3 pt-3 fw-bold">Filters</h4>
          <h4 className="px-3 pt-3" style={{ cursor: "pointer" }} onClick={toggleDrawer(false)}>
            <ClearIcon />
          </h4>
        </div>
        <div className="overflow-hide-drawer events-drawer">
          {state.user.role !== "registered" && (
            <Box role="presentation">
              <List>
                <ListItem button>
                  <FormControl sx={{ minWidth: "100%", mr: 1 }}>
                    <InputLabel id="type-label">Event Type</InputLabel>
                    <Select labelId="type-label" id="type" value={type} label="Sort" onChange={toggleType}>
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="internal">Internal</MenuItem>
                      <MenuItem value="external">External</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
              </List>
            </Box>
          )}
          <Box role="presentation">
            <List>
              <ListItem button>
                <FormControl sx={{ minWidth: "100%", mr: 1 }}>
                  <InputLabel id="date-label">Date Range</InputLabel>
                  <Select labelId="date-label" id="date" value={date} label="Sort" onChange={toggleDate}>
                    <MenuItem value="all">All Events</MenuItem>
                    <MenuItem value="upcoming">Upcoming</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            </List>
          </Box>
          <Box role="presentation">
            <List>
              <ListItem button>
                <FormControl sx={{ minWidth: "100%", mr: 1 }}>
                  <InputLabel id="sort-label">Sort By</InputLabel>
                  <Select labelId="sort-label" id="sort" value={sort} label="Sort" onChange={toggleSort}>
                    <MenuItem value="default">Created At</MenuItem>
                    <MenuItem value="start">Start Date</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            </List>
          </Box>
          <Box role="presentation">
            <List>
              <ListItem button>
                <FormControl sx={{ minWidth: "100%" }}>
                  <InputLabel id="sort-label">Order By</InputLabel>
                  <Select labelId="sort-label" id="sort" value={order} label="Order" onChange={toggleOrder}>
                    <MenuItem value="asc">Newest first</MenuItem>
                    <MenuItem value="desc">Oldest first</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            </List>
          </Box>
        </div>
      </SwipeableDrawer>

      <div className="hide_mobile">
        {state.user.role !== "registered" && (
          <FormControl sx={{ minWidth: 120, mr: 1 }}>
            <InputLabel id="type-label">Event Type</InputLabel>
            <Select labelId="type-label" id="type" value={type} label="Sort" onChange={toggleType}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="internal">Internal</MenuItem>
              <MenuItem value="external">External</MenuItem>
            </Select>
          </FormControl>
        )}
        <FormControl sx={{ minWidth: 120, mr: 1 }}>
          <InputLabel id="date-label">Date Range</InputLabel>
          <Select labelId="date-label" id="date" value={date} label="Sort" onChange={toggleDate}>
            <MenuItem value="all">All Events</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, mr: 1 }}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select labelId="sort-label" id="sort" value={sort} label="Sort" onChange={toggleSort}>
            <MenuItem value="default">Created At</MenuItem>
            <MenuItem value="start">Start Date</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="sort-label">Order By</InputLabel>
          <Select labelId="sort-label" id="sort" value={order} label="Order" onChange={toggleOrder}>
            <MenuItem value="asc">Newest first</MenuItem>
            <MenuItem value="desc">Oldest first</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="hide_screen">
        <IconButton className="drawer ms-2" onClick={toggleDrawer(true)}>
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default WPSHeader;
