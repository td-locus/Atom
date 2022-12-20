import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Event from "@mui/icons-material/Event";
import TimerIcon from "@mui/icons-material/Timer";
import ClearIcon from "@mui/icons-material/Clear";
import RedeemIcon from "@mui/icons-material/Redeem";
import moment from "moment";

import { CheckOrder } from "./helper/API";

const Drawer = ({ role, events, tasks }) => {
  const [state, setState] = useState({
    right: false,
  });
  const [order, setOrder] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setState({ right: open });
  };

  const history = useHistory();
  useEffect(() => {
    const checkOrder = async () => {
      const checkStatus = await CheckOrder();
      if (checkStatus === 200) {
        setOrder(true);
      }
    };
    checkOrder();
  }, []);

  const DrawerItemEvent = ({ event }) => {
    return (
      <Box sx={{ minWidth: 330 }} role="presentation" onClick={() => history.push(`/events/edit?eventId=${event._id}`)} onKeyDown={toggleDrawer(false)}>
        <List>
          <ListItem button>
            <Event sx={{ fontSize: 15, mr: 1 }} />
            <div className="d-flex justify-content-between w-100">
              <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "120px" }}>
                <span>{event.name}</span>
              </div>
              <small>
                <TimerIcon className="timer" />
                <span>{moment(event.duration.from).startOf("hour").fromNow()}</span>
              </small>
            </div>
          </ListItem>
        </List>
      </Box>
    );
  };

  const DrawerItemTask = ({ task }) => {
    return (
      <Box sx={{ minWidth: 330 }} role="presentation" onClick={() => history.push(`/task/edit?taskId=${task._id}`)} onKeyDown={toggleDrawer(false)}>
        <List>
          <ListItem button>
            <Event sx={{ fontSize: 15, mr: 1 }} />
            <div className="d-flex justify-content-between w-100">
              <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "120px" }}>
                <span>{task.title}</span>
              </div>
              <small>
                <TimerIcon className="timer" />
                <span>{moment(task.dueDate).startOf("hour").fromNow()}</span>
              </small>
            </div>
          </ListItem>
        </List>
      </Box>
    );
  };

  return (
    <React.Fragment>
      <div className="heading d-flex justify-content-between">
        <h3>My Space</h3>
        <div>
          {order && (
            <Badge className="giftIcon" variant="dot" color="error" invisible={false} onClick={() => history.push(`/claim/goodies`)}>
              <RedeemIcon />
            </Badge>
          )}

          {role && (
            <IconButton className="drawer ms-2" onClick={toggleDrawer(true)}>
              <MenuOpenIcon />
            </IconButton>
          )}
        </div>
      </div>
      <SwipeableDrawer sx={{ overflowX: "hidden" }} anchor={"right"} open={state.right} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <div className="d-flex justify-content-between">
          <h4 className="px-3 pt-3 fw-bold">Events</h4>
          <h4 className="px-3 pt-3" style={{ cursor: "pointer" }} onClick={toggleDrawer(false)}>
            <ClearIcon />
          </h4>
        </div>
        <div className="overflow-hide-drawer events-drawer">
          {events.map((event) => (
            <DrawerItemEvent event={event} key={event._id} />
          ))}

          {!events.length && (
            <Box sx={{ minWidth: 300, minHeight: 100 }} className="px-3 pt-3 text-muted">
              No events created.
            </Box>
          )}
        </div>

        <Divider />

        <div className="d-flex justify-content-between">
          <h4 className="px-3 pt-3 fw-bold">Tasks</h4>
        </div>
        <div className="overflow-hide-drawer tasks-drawer">
          {tasks.map((task) => (
            <DrawerItemTask task={task} key={task._id} />
          ))}
          {!tasks.length && (
            <Box sx={{ minWidth: 300 }} className="px-3 pt-3 text-muted">
              No tasks created.
            </Box>
          )}
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  );
};
export default Drawer;
