import React, { useEffect, useRef, useState, useContext } from "react";
import moment from "moment";
import SimpleBar from "simplebar-react";

import "../../css/Profile/Profile.css";

import { Card, CardBody } from "reactstrap";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import TodayIcon from "@mui/icons-material/Today";
import Divider from "@mui/material/Divider";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";

const ProfileBox = ({ user }) => {
  return (
    <div className="profile-box pt-2">
      <Card style={{ position: "relative" }} className="text-center">
        <CardBody className="w-100">
          <div className="profile-image text-center">
            <div className="profileBoxImg">
              <Avatar src={user?.avatar || user?.defaultAvatar} referrerPolicy="no-referrer" alt={user?.name || 'Profile'} />
            </div>
          </div>
          <div className="name mt-3">
            <h3>{user.name}</h3>
            <small className="text-muted">{user?.username}</small>
          </div>
          <div className="period mt-3">
            <>
              <h5 className="text-muted title">{user?.title}</h5>
              <div className="date-joined">
                <p className="date-joined-text text-muted">Joined</p>
                <p>
                  <TodayIcon sx={{ fontSize: "1rem" }} /> • {moment(user?.domain?.memberSince).format("MMMM yyyy")}
                </p>
              </div>

              <Divider variant="middle" />

              <h4 className="sub-title text-center mt-2">Bio</h4>
              {user?.bio ? (
                <SimpleBar style={{ maxHeight: 120, textAlign: "left", marginBottom: 10, opacity: 0.8, textAlign: "center" }} forceVisible="y" autoHide={false}>
                  {user?.bio}
                </SimpleBar>
              ) : (
                <div className="opacity-50">
                  <HourglassEmptyRoundedIcon sx={{ fontSize: "1.75rem" }} />
                  <p style={{ fontSize: "0.7rem" }}>User hasn't added a bio</p>
                </div>
              )}

              <Divider variant="middle" />

              <h4 className="sub-title mt-2 text-center">Interests</h4>

              {user?.interests?.length ? (
                <Stack direction="row" whiteSpace="pre-wrap" className="skills">
                  {user?.interests.map((interest, idx) => {
                    return <Chip label={interest} key={idx} variant="outlined" onClick={() => console.log("Clicked")} />;
                  })}
                </Stack>
              ) : (
                <div className="opacity-50">
                  <HourglassEmptyRoundedIcon sx={{ fontSize: "1.75rem" }} />
                  <p style={{ fontSize: "0.7rem" }}>User hasn't added any interests</p>
                </div>
              )}
            </>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProfileBox;
