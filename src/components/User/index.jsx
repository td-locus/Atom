import React, { useEffect, useState, useContext } from "react";
import DispatchContext from "../../context/DispatchContext";
import ShareIcon from '@mui/icons-material/Share';
import { Tooltip } from "@mui/material";

import ProfileBox from "./ProfileBox";
import Techstacks from "./Techstacks";
import Skills from "./Skills";
import College from "./College";
import Contact from "./Contact";
import "../../css/Profile/ProfileCommon.css";

import { showLoading, hideLoading, showFlashMessage } from "../../reducer/actions";

import { Container, Row, Col } from "reactstrap";

import { FetchUser } from "./helper/API";
import { useParams } from "react-router-dom";
import Meta from "./Meta";

const User = () => {
  const { dispatch } = useContext(DispatchContext);
  const params = useParams();
  const [user, setUser] = useState({});
  const [count, setCount] = useState(0);
  useEffect(() => {
    dispatch(showLoading());
    const fetchUser = async () => {
      try {
        const user = await FetchUser(params.username);
        console.log(user);
        setUser(user);
        setCount(count + 1);
        dispatch(hideLoading());
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const handleShareUserProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    dispatch(showFlashMessage('info', 'Profile link copied to clipboard'))
  }

  return (
    <>
      <Meta user={user} />
      <Container fluid className="auth-layout py-3">
        {
          count > 0 && <Row className="gy-3">
            <Col sm={12} md={6} xl={4}>
              <ProfileBox user={user} />
            </Col>
            <Col sm={12} md={6} xl={4}>
              <Row>
                <Techstacks user={user} />
              </Row>
              <Row>
                <Skills user={user} />
              </Row>
            </Col>
            <Col sm={12} md={6} xl={4}>
              <Row>
                <College user={user} />
              </Row>
              <Row>
                <Contact user={user} />
              </Row>
            </Col>
          </Row>
        }
        {
          count > 0 && <Tooltip title='Share Profile' className="share-icon-tooltip">
            <ShareIcon className="share-icon" onClick={handleShareUserProfile} />
          </Tooltip>
        }
      </Container>
    </>
  );
};

export default User;
