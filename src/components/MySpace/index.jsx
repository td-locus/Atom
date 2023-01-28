import React, { useEffect, useState, useContext } from "react";
import DispatchContext from "../../context/DispatchContext";
import { showLoading, hideLoading } from "../../reducer/actions";

import ProfileBox from "./ProfileBox";
import CreateEvent from "./CreateEvent";
import RecentActivity from "./RecentActivity";
import UpcomingEvents from "./UpcomingEvents";
import CreateTask from "./CreateTask";
import ViewTasks from "./ViewTasks";
import { FetchAudits, FetchUpcomingEvents, FetchEventsByMe, GetTasksAssignor, GetTasksAssignee } from "./helper/API";
import { GetRole } from "../Auth/helper/Auth";

import { useHistory } from "react-router";
import { Container, Row, Col } from "reactstrap";

import Drawer from "./Drawer";

const OnBoardModal = () => {
  return;
}

const MySpace = () => {
  const { dispatch } = useContext(DispatchContext);

  const [activities, setActivities] = useState([]);
  const [openOnBoard, setOpenOnBoard] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [tasksAssignee, setTasksAssignee] = useState([]);

  const history = useHistory();

  const fetchActivity = async () => {
    const response = await FetchAudits();
    setActivities(response?.reverse());
  };

  const fetchUpcomingEvents = async () => {
    const { response } = await FetchUpcomingEvents();
    setUpcomingEvents(response);
  };

  const fetchEventsByMe = async () => {
    const events = await FetchEventsByMe();
    setEvents(events);
  };

  const fetchRole = async () => {
    const response = await GetRole();
    setRole(response);
    dispatch(hideLoading());
  };

  const getTasksAssignor = async () => {
    const tasks = await GetTasksAssignor();
    setTasks(tasks);
  };

  const getTasksAssignee = async () => {
    const { tasks } = await GetTasksAssignee();
    setTasksAssignee(tasks);
  };

  const [role, setRole] = useState("");
  useEffect(() => {
    dispatch(showLoading());
    fetchActivity();
    fetchRole();
    fetchUpcomingEvents()
    fetchEventsByMe();
    getTasksAssignor();
    getTasksAssignee();

    const showOnBoardModal = () => {
      if (role === 'registered') {
        if (!sessionStorage.getItem('prompted')) {
          sessionStorage.setItem('prompted', true);
          setOpenOnBoard(true);
        }
      }
    }

    showOnBoardModal();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const checkRole = () => {
    if (role === "mentor" || role === "lead") return true;
    return false;
  };

  return (
    <Container fluid className="auth-layout py-3">
      <Drawer role={checkRole()} events={events} tasks={tasks} />
      <Row className="gy-3">
        <Col sm={12} md={6} xl={4}>
          <ProfileBox />
        </Col>
        {checkRole() && (
          <Col sm={12} md={6} xl={4}>
            <CreateEvent fetchActivity={fetchActivity} fetchUpcomingEvents={fetchUpcomingEvents} fetchEventsByMe={fetchEventsByMe} />
          </Col>
        )}
        {checkRole() && (
          <Col sm={12} md={6} xl={4}>
            <CreateTask getTasksAssignor={getTasksAssignor} />
          </Col>
        )}
        {!checkRole() && (
          <Col sm={12} md={6} xl={4}>
            <ViewTasks tasks={tasksAssignee} />
          </Col>
        )}
        <Col sm={12} md={6} xl={4}>
          <RecentActivity activities={activities} />
        </Col>
        <Col sm={12} md={6} xl={4}>
          <UpcomingEvents upcomingEvents={upcomingEvents} />
        </Col>
      </Row>
    </Container>
  );
};

export default MySpace;
