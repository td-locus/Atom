import React from "react";

import { Card, CardBody } from "reactstrap";
import Stack from "@mui/material/Stack";

import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PublicIcon from "@mui/icons-material/Public";
import GitHubIcon from "@mui/icons-material/GitHub";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";

function Contact({ user }) {
  return (
    <div className="contact-box">
      <Card style={{ position: "relative" }} className="p-3">
        <CardBody>
          <h4 className="title">Let's Connect</h4>
          <Stack direction="column" className="socialLinks">
            {user?.links?.instagram?.length > 0 && (
              <a href={`https://instagram.com/${user?.links?.instagram}`} target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
                <p>{user?.links?.instagram}</p>
              </a>
            )}
            {user?.links?.github?.length > 0 && (
              <a href={`https://github.com/${user?.links?.github}`} target="_blank" rel="noopener noreferrer">
                <GitHubIcon />
                <p>{user?.links?.github}</p>
              </a>
            )}
            {user?.links?.linkedIn?.length > 0 && (
              <a href={`https://linkedin.com/in/${user?.links?.linkedIn}`} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon />
                <p>{user?.links?.linkedIn}</p>
              </a>
            )}
            {user?.website?.length > 0 && (
              <a href={user?.website} target="_blank" rel="noopener noreferrer">
                <PublicIcon />
                <p>{user?.website}</p>
              </a>
            )}
          </Stack>
          {!user.links && !user.website && (
            <div className="mt-3 opacity-50 text-center">
              <HourglassEmptyRoundedIcon sx={{ fontSize: "1.75rem" }} />
              <p style={{ fontSize: "0.7rem" }}>User hasn't added any links</p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default Contact;
