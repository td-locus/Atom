import React, { useEffect, useRef, useState, useContext } from "react";
import StateContext from "../../context/StateContext";
import "../../css/MySpace/MySpace.css";

import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Skeleton, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PublicIcon from "@mui/icons-material/Public";
import GitHubIcon from "@mui/icons-material/GitHub";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";

import { FetchInterests } from "./helper/API";
import { getSocial } from "../MyDetails/helper/API";
import { useImmer } from "use-immer";

const ProfileBox = () => {
  const { state } = useContext(StateContext);
  const history = useHistory();
  const [skeleton, setSkeleton] = useState(true);
  const [interests, setInterests] = useState([]);
  const [website, setWebsite] = useState("");
  const [social, setSocial] = useImmer({
    github: "",
    linkedIn: "",
    instagram: "",
  });
  const avatar = useRef(null);
  const fetchInterests = async () => {
    const { response } = await getSocial();
    setSocial((draft) => {
      draft.github = response.github || "";
      draft.linkedIn = response.linkedIn || "";
      draft.instagram = response.instagram || "";
    });
    const { interests, website } = await FetchInterests();
    setInterests(interests);
    setWebsite(website);
  };
  useEffect(() => {
    fetchInterests();
  }, []);
  useEffect(() => {
    const _avatar = new Image();
    _avatar.src = state.user.avatar || state.user.defaultAvatar;
    _avatar.onload = function () {
      setSkeleton(false);
      const avatarDiv = avatar.current;
      if (avatarDiv) {
        const _img = avatarDiv.children[0];
        _img.src = this.src;
      }
    };
  }, [state.user]);
  return (
    <div className="profile-box pt-2">
      <Card style={{ position: "relative" }} className="text-center">
        <CardBody>
          <Chip
            avatar={
              <Avatar>
                <EditIcon style={{ fontSize: "13px" }} />
              </Avatar>
            }
            label="Edit Profile"
            className="edit-profile"
            onClick={() => {
              history.push("/my-details");
            }}
          />
          <Chip
            avatar={
              <Avatar>
                <RemoveRedEyeRoundedIcon style={{ fontSize: "13px" }} />
              </Avatar>
            }
            label="View Profile"
            className="view-profile"
            onClick={() => {
              history.push("/users/" + state.user.username);
            }}
          />

          <div className="profile-image text-center">
            {skeleton ? (
              <Skeleton variant="circular" width={150} height={150} ref={avatar} />
            ) : (
              <div className="profileBoxImg">
                <Avatar src={state.user.avatar || state.user.defaultAvatar} ref={avatar} referrerPolicy="no-referrer" alt={state.user.name} />
              </div>
            )}
          </div>
          <div className="name mt-3">
            <h3>{state.user.name}</h3>
            <small className="text-muted">{state.user.username}</small>
          </div>
          <div className="period mt-3">
            <React.Fragment>
              <h5 className="text-muted title">{state.user.title}</h5>
              <Stack direction="row" className="skills">
                {interests.map((interest, idx) => {
                  return <Chip label={interest} key={idx} variant="outlined" onClick={() => history.push("/my-details")} />;
                })}
              </Stack>
              <Stack direction="row" className="socialLinks">
                {social.instagram.length > 0 && (
                  <a href={`https://instagram.com/${social.instagram}`} target="_blank" rel="noopener noreferrer">
                    <InstagramIcon />
                  </a>
                )}
                {social.github.length > 0 && (
                  <a href={`https://github.com/${social.github}`} target="_blank" rel="noopener noreferrer">
                    <GitHubIcon />
                  </a>
                )}
                {social.linkedIn.length > 0 && (
                  <a href={`https://linkedin.com/in/${social.linkedIn}`} target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon />
                  </a>
                )}
                {website.length > 0 && (
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    <PublicIcon />
                  </a>
                )}
              </Stack>
            </React.Fragment>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProfileBox;
