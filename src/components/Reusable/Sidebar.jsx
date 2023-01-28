import React, { useEffect, useRef, useContext, useState } from "react";
import DispatchContext from "../../context/DispatchContext";
import StateContext from "../../context/StateContext";
import { showLoading, hideLoading, showFlashMessage, logout } from "../../reducer/actions";

import "../../css/Reusable/Sidebar.css";

import { Link, useLocation } from "react-router-dom";
import { LogoutHelper } from "../Auth/helper/Auth";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import logo from "../../images/logo.png";

const NavLink = (props) => {
  const location = useLocation();
  const isActive = location.pathname === props.to;
  const className = isActive ? "active" : "";
  return (
    <Link className={className} to={props.to} onClick={props.onClick}>
      {props.children}
    </Link>
  );
};

const Sidebar = () => {
  const { dispatch } = useContext(DispatchContext);
  const { state } = useContext(StateContext);

  const sidebar_ = useRef(null);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    let sidebar = sidebar_.current;
    const authLayout = document.querySelector(".auth-layout");
    if (authLayout)
      authLayout.addEventListener("click", (e) => {
        if (e.target !== sidebar) {
          if (sidebar.classList.contains("open")) {
            setOpen(false);
          }
        }
      });
  });

  const toggleSidebar = () => {
    if (open) {
      setOpen(false);
    }
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
  };

  const [loaded, setLoaded] = useState(false);
  const avatar = useRef();
  useEffect(() => {
    const _avatar = new Image();
    _avatar.src = state.user.avatar || state.user.defaultAvatar;
    _avatar.onload = function () {
      setLoaded(false);
      const avatarDiv = avatar.current;
      if (avatarDiv) {
        const _img = avatarDiv.children[0];
        if (_img) _img.src = this.src;
      }
    };
  }, [state.user]);

  const Logout = async () => {
    handleClose();
    dispatch(showLoading());
    await LogoutHelper();
    dispatch(logout());
    dispatch(hideLoading());
    dispatch(showFlashMessage("success", "Logged out successfully!"));
  };

  const [dialog, setDialog] = useState(false);
  const handleClose = () => setDialog(false);
  return (
    <>
      <Dialog open={dialog} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Are you sure you want to logout?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={Logout}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
      <div className={"sidebar " + (open && "open")} ref={sidebar_}>
        <div className="logo-details">
          <img src={logo} alt="logo" />
          <div className="logo_name">Atom</div>
          <i className={"bx " + (open ? "bx-menu-alt-right" : "bx-menu")} id="btn" onClick={() => setOpen(!open)}></i>
        </div>
        <ul className="nav-list">
          <li>
            <NavLink onClick={toggleSidebar} to="/my-space">
              <i className="bx bx-home-alt"></i>
              <span className="links_name">My Space</span>
            </NavLink>
            <span className="tooltip">My Space</span>
          </li>
          {state.user.role === 'registered' && <li>
            <NavLink onClick={toggleSidebar} to="/onboard">
              <i className='bx bxs-coffee'></i>
              <span className="links_name">On Boarding</span>
            </NavLink>
            <span className="tooltip">On Boarding</span>
          </li>}
          <li>
            <NavLink onClick={toggleSidebar} to="/wps">
              <i className="bx bx-podcast"></i>
              <span className="links_name">WPS</span>
            </NavLink>
            <span className="tooltip">WPS</span>
          </li>
          {state.user.role !== 'registered' && <li>
            <NavLink onClick={toggleSidebar} to="/molecules">
              <i className="bx bx-desktop"></i>
              <span className="links_name">Molecules</span>
            </NavLink>
            <span className="tooltip">Molecules</span>
          </li>}
          {state.user.role !== 'registered' && <li>
            <NavLink onClick={toggleSidebar} to="/electrons">
              <i className="bx bxs-user-badge"></i>
              <span className="links_name">Electrons</span>
            </NavLink>
            <span className="tooltip">Electrons</span>
          </li>}
          {state.user.role !== 'registered' && <li>
            <NavLink onClick={toggleSidebar} to="/protons">
              <i className="bx bxs-user-circle"></i>

              <span className="links_name">Protons</span>
            </NavLink>
            <span className="tooltip">Protons</span>
          </li>}
          {state.user.role !== 'registered' && <li>
            <NavLink onClick={toggleSidebar} to="/nucleus">
              <i className="bx bx-user-pin"></i>
              <span className="links_name">Nucleus</span>
            </NavLink>
            <span className="tooltip">Nucleus</span>
          </li>}
          <li>
            <NavLink onClick={toggleSidebar} to="/planets">
              <i className="bx bx-planet"></i>
              <span className="links_name">Planets</span>
            </NavLink>
            <span className="tooltip">Planets</span>
          </li>
          <li>
            <a href="https://github.com/td-locus" target="_blank" rel="noreferrer">
              <i className="bx bxl-github"></i>
              <span className="links_name">Fork</span>
            </a>
            <span className="tooltip">Fork</span>
          </li>
          <li className="profile">
            <div className="profile-details">
              {loaded ? (
                <Skeleton variant="circular" width={40} height={40} ref={avatar} />
              ) : (
                <Avatar alt={state.user.name} src={state.user.avatar || state.user.defaultAvatar} ref={avatar} sx={{ width: 40, height: 40 }} />
              )}
              <div className="name_job ">
                <div className="name" style={{ width: 140 }}>
                  <Box component="div" sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                    <Tooltip title={state.user.name} arrow placement="top-start">
                      <span>{state.user.name}</span>
                    </Tooltip>
                  </Box>
                </div>
                <div className="job" style={{ width: 140 }}>
                  <Box component="div" sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                    <Tooltip title={state.user.title || ""} arrow placement="top-start">
                      <span>{state.user.title}</span>
                    </Tooltip>
                  </Box>
                </div>
              </div>
            </div>
            <Tooltip title="Logout" arrow>
              <i className="bx bx-log-out" id="log_out" onClick={() => setDialog(true)}></i>
            </Tooltip>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
