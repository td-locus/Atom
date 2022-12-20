import React from "react";
import SimpleBar from "simplebar-react";
import { Card, CardBody } from "reactstrap";
import moment from "moment";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EventIcon from "@mui/icons-material/Event";
const RecentActivity = ({ activities }) => {
  return (
    <div className="activity-widget pt-2">
      <Card style={{ height: "100%" }} className="p-3 pt-0">
        <CardBody>
          <h3 className="my-space-card-title pt-2">Recent Activity</h3>
          <SimpleBar style={{ maxHeight: "380px" }}>
            <ul className="list-unstyled activity-wid">
              {activities.map((activity, idx) => {
                return (
                  <li className="activity-list" key={idx}>
                    <div className="activity-icon avatar-xs">
                      <span className="avatar-title bg-soft-primary rounded-circle">
                        {activity.type === "login" && <PersonIcon />}
                        {activity.type === "signup" && <PersonAddIcon />}
                        {activity.type === "event" && <EventIcon />}
                      </span>
                    </div>
                    <div>
                      <div>
                        <h5 className="font-size-10">
                          {moment(activity.timestamp).format("Do MMM, YY")} <small className="text-muted">{moment(activity.timestamp).format("LT")}</small>
                        </h5>
                      </div>

                      <div>
                        <p className="text-muted mb-0">{activity.log}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </SimpleBar>
        </CardBody>
      </Card>
    </div>
  );
};

export default RecentActivity;
