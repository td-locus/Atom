import React, { useEffect } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TimerIcon from "@mui/icons-material/Timer";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import "../../css/WPS/WPS.css";
import { Badge } from "reactstrap";

const ModalEvent = ({ selectedEvent, open, handleClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: window.innerWidth > 500 ? 500 : 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      keepMounted={false}
    >
      <Fade in={open}>
        <Box sx={style} className="eventModalOpen">
          {selectedEvent.owner && (
            <>
              <div className="event-heading d-flex justify-content-between">
                <small className="season">WPS Season 6</small>
                <small className="text-primary">
                  <TimerIcon className="timer" />
                  {moment(selectedEvent.duration.from).startOf("hour").fromNow()}
                </small>
              </div>
              <Typography id="transition-modal-title" variant="h5" component="h2">
                {selectedEvent?.name}
              </Typography>

              <Typography id="transition-modal-description" sx={{ mt: 1 }}>
                {selectedEvent?.description}
              </Typography>
              <div className="text-muted mt-3">
                <small>{moment(selectedEvent.duration.from).format("MMMM Do YYYY, hh:mm a")}</small>
              </div>
              <div>
                {selectedEvent.eventLocation && (
                  <div>
                    Location: <Badge color="primary">{selectedEvent.eventLocation}</Badge>
                  </div>
                )}
              </div>
              <div>
                {selectedEvent.eventLink && (
                  <div>
                    Link:{" "}
                    <a href={selectedEvent.eventLink} target="_blank" rel="noreferrer noopener">
                      {selectedEvent.eventLink}
                    </a>
                  </div>
                )}
              </div>
              <div className="d-flex mt-2">
                {selectedEvent.meta.isInternal && (
                  <Badge color="primary" className="me-1">
                    Internal
                  </Badge>
                )}
                {selectedEvent.meta.isFree && (
                  <Badge color="primary" className="me-1">
                    Free
                  </Badge>
                )}
                {selectedEvent.meta.isSharable && (
                  <Badge color="primary" className="me-1">
                    Sharable
                  </Badge>
                )}
                {selectedEvent.meta.isWPS && (
                  <Badge color="primary" className="me-1">
                    WPS
                  </Badge>
                )}
              </div>
              <div className="event-footer d-flex text-primary mt-3">
                <Avatar alt={selectedEvent?.owner.name} src={selectedEvent?.owner.avatar || selectedEvent?.owner.defaultAvatar} sx={{ width: 25, height: 25 }} />
                <div className="owner ps-2">
                  <strong>{selectedEvent?.owner.name}</strong> <small>on {moment(selectedEvent?.createdAt).format("MMM Do YY")}</small>
                </div>
              </div>
            </>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalEvent;
