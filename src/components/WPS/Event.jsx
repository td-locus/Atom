import React, { useEffect } from "react";
import "../../css/WPS/WPS.css";

import { Card, CardBody, CardFooter } from "reactstrap";
import moment from "moment";
import { Avatar } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import SimpleBar from "simplebar-react";
import "../../css/WPS/WPS.css";

const Event = ({ event, setSelectedEvent, handleOpen }) => {
  return (
    <div className="event pt-3">
      <Card
        onClick={() => {
          setSelectedEvent(event);
          handleOpen();
        }}
      >
        <CardBody>
          <div className="event-heading d-flex justify-content-between">
            <small className="season">WPS Season 6</small>
            <small className="text-primary">
              <TimerIcon className="timer" />
              {moment(event.duration.from).startOf("hour").fromNow()}
            </small>
          </div>
          <div className="event-body">
            <div className="title text-primary">
              <strong>{event.name}</strong>
            </div>
            <SimpleBar className="description text-primary">
              <small>{event.description}</small>
            </SimpleBar>
          </div>
        </CardBody>
        <CardFooter>
          <div className="event-footer d-flex text-primary">
            <Avatar alt={event.owner.name} src={event.owner.avatar || event.owner.defaultAvatar} sx={{ width: 25, height: 25 }} />
            <div className="owner ps-2">
              <strong>{event.owner.name}</strong> <small>on {moment(event.createdAt).format("MMM Do YY")}</small>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Event;
