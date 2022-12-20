import React from "react";

import { Avatar, Box, Stack, Chip } from "@mui/material/";
// import Box from "@mui/material/Box";
// import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import { useHistory } from "react-router-dom";

import { Card, CardBody, Row, Col } from "reactstrap";

import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PublicIcon from "@mui/icons-material/Public";
import GitHubIcon from "@mui/icons-material/GitHub";

const Member = ({ data }) => {
  const history = useHistory();
  const date = new Date();
  const currentYear = date.getFullYear();
  const rolesArr = Object.keys(data.roles);
  return (
    <Card className="member__card py-3">
      <CardBody>
        <Col className="g-2 d-flex flex-column align-items-center">
          <div>
            <Avatar alt={data.name} src={data.avatar ? data.avatar : data.defaultAvatar} sx={{ width: 150, height: 150 }} />
          </div>
          <Row className="mt-2 text-center">
            <div className="name" style={{ width: "100%", whiteSpace: "nowrap" }}>
              <Box component="div" sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                <Tooltip title={data.name} arrow placement="top-start">
                  <h5 onClick={() => {history.push(`/users/${data.username}`)}} style={{cursor: "pointer",}}>{data.name}</h5>
                </Tooltip>
                <div className="title text-muted">{data.title || "Mentor"}</div>
                <div className="period">
                  <small>
                    {rolesArr[0]} - {rolesArr[rolesArr.length - 1] == currentYear ? "Present" : rolesArr[rolesArr.length - 1]}
                  </small>
                </div>
              </Box>
            </div>
          </Row>
          {/* <Row className="mt-4 d-flex align-items-center">
            <Stack direction="row" spacing={1} className="member__domains d-flex justify-content-evenly">
              <Chip label="Web" />
              <Chip label="Graphic" />
              <Chip label="Illustration" />
            </Stack>
          </Row> */}
          <Row className="mt-4 d-flex align-items-center w-100">
            <Box component="div" className="member__socials text-primary d-flex justify-content-around">
              {data.links?.instagram.length > 0 && (
                <a href={`https://instagram.com/${data.links?.instagram}`} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon />
                </a>
              )}
              {data.links?.github.length > 0 && (
                <a href={`https://github.com/${data.links?.github}`} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon />
                </a>
              )}
              {data.links?.linkedIn.length > 0 && (
                <a href={`https://linkedin.com/in/${data.links?.linkedIn}`} target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon />
                </a>
              )}
              {data.website?.length > 0 && (
                <a href={data.website} target="_blank" rel="noopener noreferrer">
                  <PublicIcon />
                </a>
              )}
            </Box>
          </Row>
        </Col>
      </CardBody>
    </Card>
  );
};

export default Member;
