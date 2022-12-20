import React from "react";
import { useHistory } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { Card, CardBody, Button } from "reactstrap";
import moment from "moment";
import AssignmentIcon from "@mui/icons-material/Assignment";

const ViewTasks = ({ tasks }) => {
  const history = useHistory();
  return (
    <div className="view-tasks pt-2">
      <Card style={{ height: "100%" }} className="p-3 pt-0">
        <CardBody>
          <h3 className="my-space-card-title pt-2">View Tasks</h3>
          <SimpleBar style={{ maxHeight: "340px", minHeight: "330px" }}>
            <ul className="list-unstyled activity-wid">
              {tasks.map((task) => {
                return (
                  <li className="activity-list" key={task._id} onClick={() => history.push(`/tasks/me`)}>
                    <div className="activity-icon avatar-xs">
                      <span className="avatar-title bg-soft-primary rounded-circle">
                        <AssignmentIcon />
                      </span>
                    </div>
                    <div className="task-details">
                      <div className="text-overflow-ellipsis">
                        <strong className="mb-0">{task.title}</strong>
                      </div>
                      <div className="text-overflow-ellipsis">
                        <span className="text-muted mb-0">{task.description}</span>
                      </div>
                      <div>
                        <small>
                          {moment(task.dueDate).format("Do MMM, YY")} <small className="text-muted">{moment(task.dueDate).format("LT")}</small>
                        </small>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            {tasks.length === 0 && (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "330px" }}>
                <i className="text-muted">No pending tasks.</i>
              </div>
            )}
          </SimpleBar>

          <div className="viewAll text-center">
            <Button onClick={() => history.push("/tasks/me")}>View all</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ViewTasks;
