import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ClearIcon from "@mui/icons-material/Clear";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";

import "../../css/Nucleus/Nucleus.css";

function NucleusHeader({ nucleus, setNucleus, originalNucleus }) {
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (searchTerm.length) {
      const searchValues = originalNucleus.filter((e) => {
        return e.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
      setNucleus(searchValues);
    } else setNucleus(originalNucleus);
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
          <h4 className="px-3 pt-3 fw-bold">Search</h4>
          <h4 className="px-3 pt-3" style={{ cursor: "pointer" }} onClick={toggleDrawer(false)}>
            <ClearIcon />
          </h4>
        </div>
        <div className="overflow-hide-drawer events-drawer">
          <Box role="presentation">
            <List>
              <ListItem button>
                <TextField id="standard-basic" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="searchUser" label="Search for a user" variant="outlined" fullWidth />
              </ListItem>
            </List>
          </Box>
        </div>
      </SwipeableDrawer>
      <div className="heading d-flex justify-content-between mb-2">
        <h3>Active Mentors</h3>
        <div className="hide_mobile">
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
}

export default NucleusHeader;
