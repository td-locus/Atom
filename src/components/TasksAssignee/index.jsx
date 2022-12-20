import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Button from "@mui/material/Button";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import { GetTasksAssignee, MarkTask } from "./helper/API";

import "../../css/Tasks/Tasks.css";

const Tasks = () => {
  const [tasks_, setTasks] = useState([]);
  const [userId, setUserId] = useState("");
  const getTasksAssignee = async () => {
    const { tasks, user } = await GetTasksAssignee();
    setUserId(user);
    for (let i = 0; i < tasks.length; i++) {
      for (let j = 0; j < tasks[i].assignees.length; j++) {
        if (tasks[i].assignees[j].assignee === user) {
          tasks[i].completed = tasks[i].assignees[j].completed;
        }
      }
    }
    setTasks(tasks);
  };
  const handleChange = async (id) => {
    const tasks = [...tasks_];
    for (let i = 0; i < tasks.length; i++) {
      for (let j = 0; j < tasks[i].assignees.length; j++) {
        if (tasks[i].assignees[j].assignee === userId && tasks[i]._id === id) {
          tasks[i].assignees[j].completed = tasks[i].completed = !tasks[i].assignees[j].completed;
          // tasks[i].completed = tasks[i].assignees[j].completed;
        }
      }
    }
    setTasks(tasks);
    const idx = tasks.findIndex((task) => {
      return task._id === id;
    });
    const status = await MarkTask(tasks[idx]);
    console.log(status);
  };
  useEffect(() => {
    getTasksAssignee();
  }, []);

  return (
    <Container className="auth-layout py-3" fluid>
      <div className="heading d-flex justify-content-between">
        <h3>View Tasks</h3>
      </div>
      <ul className="view-tasks list-unstyled activity-wid">
        {tasks_.map((task) => (
          <li className="activity-list" key={task._id} id={task._id}>
            <div className="activity-icon avatar-xs">
              <span className="avatar-title bg-soft-primary rounded-circle">
                <AssignmentIcon />
              </span>
            </div>
            <div className="task-details py-3">
              <div className="my-1">
                <strong className="mb-0">{task.title}</strong>
              </div>
              <div className="my-1">
                <span className="text-muted mb-0">{task.description}</span>
              </div>
              <div>
                <small className="d-flex">
                  <strong className="me-2">Assigned by: </strong>
                  <Avatar className="me-1" src={task.assignor.avatar || task.assignor.defaultAvatar} alt={task.assignor.name} sx={{ height: 15, width: 15, top: 3 }} />
                  <span className="assignor-name">{task.assignor.name}</span>
                </small>
              </div>
              <div>
                <small>
                  <strong>Assigned on:</strong> {moment(task.createdAt).format("Do MMM, YY")} <small className="text-muted">{moment(task.createdAt).format("LT")}</small>
                </small>
              </div>
              <Row>
                <Col xs={12} md={6}>
                  <small>
                    <strong>Due date:</strong> {moment(task.dueDate).format("Do MMM, YY")} <small className="text-muted">{moment(task.dueDate).format("LT")}</small>
                  </small>
                </Col>
                <Col xs={12} md={6} className="text-end">
                  {task.completed ? (
                    <Button variant="contained" className="markButton mt-sm-0 mt-2" startIcon={<IndeterminateCheckBoxIcon />} onClick={() => handleChange(task._id)}>
                      Mark as Incomplete
                    </Button>
                  ) : (
                    <Button variant="outlined" className="markButton mt-sm-0 mt-2" startIcon={<CheckCircleOutlineIcon />} onClick={() => handleChange(task._id)}>
                      Mark as Complete
                    </Button>
                  )}
                </Col>
              </Row>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Tasks;
