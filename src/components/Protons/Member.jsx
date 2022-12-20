import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
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
  const roles = Object.keys(data.roles);
  const role = data.roles[roles[roles.length - 1]];
  return (
    <Card className="member__card py-3">
      <CardBody>
        <Col className="d-flex flex-column align-items-center justify-content-center">
          <div className="text-center">
            <Avatar alt={data.name} src={data.avatar ? data.avatar : data.defaultAvatar} sx={{ width: 80, height: 80 }} />
          </div>
          <Row className="mt-1">
            <div className="name" style={{ whiteSpace: "nowrap" }}>
              <Box 
                component="div" 
                sx={{ cursor: "pointer", maxWidth: data.name.length > 25 ? "85%" : "100%", textOverflow: "ellipsis", overflow: "hidden", margin: "auto" }}
                onClick={() => {history.push(`/users/${data?.username}`)}}
              >
                <Tooltip title={data.name} arrow placement="top-start">
                  <span style={{ fontSize: "1.2rem" }}>{data.name}</span>
                </Tooltip>
                <div className="text-capitalize text-center domain">
                  {
                    data?.domain?.domainPrimary && <small>{data?.domain?.domainPrimary}</small>
                  }
                </div>
                <div className="text-capitalize text-center domain text-muted">
                  <small>{role}</small>
                </div>
              </Box>
            </div>
          </Row>
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
