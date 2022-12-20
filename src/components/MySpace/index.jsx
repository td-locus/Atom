import React, { useEffect, useState, useContext } from "react";
import DispatchContext from "../../context/DispatchContext";
import { showLoading, hideLoading } from "../../reducer/actions";

import ProfileBox from "./ProfileBox";
import CreateEvent from "./CreateEvent";
import RecentActivity from "./RecentActivity";
import UpcomingEvents from "./UpcomingEvents";
import CreateTask from "./CreateTask";
import ViewTasks from "./ViewTasks";
import { FetchAudits, FetchProfileCompleted, FetchUpcomingEvents, FetchEventsByMe, GetTasksAssignor, GetTasksAssignee } from "./helper/API";
import { GetRole } from "../Auth/helper/Auth";

import { useHistory } from "react-router";
import { Container, Row, Col } from "reactstrap";
import Box from "@mui/material/Box";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import Drawer from "./Drawer";

import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CircularProgressWithLabel({ value }) {
  return (
    <Box className="modalProfile text-center">
      <div style={{ width: 100, height: 100, margin: "auto" }}>
        <CircularProgressbarWithChildren
          value={value}
          background
          backgroundPadding={3}
          styles={buildStyles({
            backgroundColor: "var(--primary)",
            textColor: "#fff",
            pathColor: "#fff",
            trailColor: "transparent",
          })}
        >
          <img style={{ width: 40, marginTop: -5 }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" />
          <div style={{ fontSize: 10, marginTop: -5, color: "white" }}>
            <strong>{Math.round(value)}%</strong> mate
          </div>
        </CircularProgressbarWithChildren>
      </div>
      <Box>
        <FormatListBulletedIcon className="listIcon" />
        <strong className="text-uppercase fw-bold">Complete Your Profile</strong>
        <div className="text-muted font-smaller">
          <em>Fill out the details now</em>
        </div>
      </Box>
    </Box>
  );
}

const MySpace = () => {
  const { dispatch } = useContext(DispatchContext);

  const [activities, setActivities] = useState([]);
  const [open, setOpen] = useState(false);
  const [percentageCompleted, setPercentageCompleted] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [tasksAssignee, setTasksAssignee] = useState([]);

  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

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

    fetchUpcomingEvents();

    fetchEventsByMe();

    getTasksAssignor();

    getTasksAssignee();

    const showModal = async () => {
      const percentage = await FetchProfileCompleted();
      if (percentage < 90) {
        setOpen(true);
        setPercentageCompleted(percentage);
      }
    };
    if (!localStorage.getItem("count")) localStorage.setItem("count", 0);
    else localStorage.setItem("count", parseInt(localStorage.getItem("count")) + 1);
    if (parseInt(localStorage.getItem("count")) === 0) {
      showModal();
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  const checkRole = () => {
    if (role === "mentor" || role === "lead") return true;
    return false;
  };

  return (
    <Container fluid className="auth-layout py-3">
      <Dialog open={open} TransitionComponent={Transition} maxWidth="sm" fullWidth={true} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <DialogContent>
          <CircularProgressWithLabel value={percentageCompleted} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            Dismiss
          </Button>
          <Button onClick={() => history.push("/my-details")} variant="contained">
            Complete Now
          </Button>
        </DialogActions>
      </Dialog>

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
