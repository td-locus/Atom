import React from "react";
import { useHistory } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { Card, CardBody, Button } from "reactstrap";
import moment from "moment";
import EventIcon from "@mui/icons-material/Event";

const UpcomingEvents = ({ upcomingEvents }) => {
  const history = useHistory();
  return (
    <div className="upcoming-events pt-2">
      <Card style={{ height: "100%" }} className="p-3 pt-0">
        <CardBody>
          <h3 className="my-space-card-title pt-2">Upcoming Events</h3>
          <SimpleBar style={{ maxHeight: "340px", minHeight: "330px" }}>
            <ul className="list-unstyled activity-wid">
              {upcomingEvents.map((event) => {
                return (
                  <li className="activity-list" key={event._id} onClick={() => history.push(`/wps?eventId=${event._id}`)}>
                    <div className="activity-icon avatar-xs">
                      <span className="avatar-title bg-soft-primary rounded-circle">
                        <EventIcon />
                      </span>
                    </div>
                    <div className="event-details">
                      <div className="text-overflow-ellipsis">
                        <strong className="mb-0">{event.name}</strong>
                      </div>
                      <div className="text-overflow-ellipsis">
                        <span className="text-muted mb-0">{event.description}</span>
                      </div>
                      <div>
                        <small>
                          {moment(event.duration.from).format("Do MMM, YY")} <small className="text-muted">{moment(event.duration.from).format("LT")}</small>
                        </small>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            {upcomingEvents.length === 0 && (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "330px" }}>
                <i className="text-muted">No upcoming events.</i>
              </div>
            )}
          </SimpleBar>
          <div className="viewAll text-center">
            <Button onClick={() => history.push("/wps")}>View all</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpcomingEvents;
