import React from "react";
import { Avatar, Box, Stack, Chip, Tooltip, Button } from "@mui/material/";
// import Skeleton from "@mui/material/Skeleton";
import { Card, CardBody, Row, Col } from "reactstrap";

import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PublicIcon from "@mui/icons-material/Public";

const Domain = ({ domain }) => {
  return (
    <Card className="domain__card">
      <CardBody>
        <Row className="d-flex align-items-center justify-content-between">
          <Col className="domain__image" md={4}>
            <img alt="domain" src={domain?.image} />
          </Col>
          <Col className="domain__info" md={8}>
            <Box>
              <div className="name" style={{ whiteSpace: "nowrap" }}>
                <Box component="div" sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                  <h3 className="domain__name">{domain?.name}</h3>
                  <Tooltip title={domain.lead[0]?.name} arrow placement="top-start">
                    <div className="colorPrimary d-flex domain__lead">
                      <Avatar alt={domain.lead[0].name} src={domain.lead[0].avatar || domain.lead[0].defaultAvatar} sx={{ width: 25, height: 25 }} />
                      <div className="owner ps-2">
                        <strong>{domain.lead[0].name}</strong>
                      </div>
                    </div>
                  </Tooltip>
                </Box>
              </div>
              {/* <Box component="div" className="">
                <Stack direction="row" spacing={1} className="domain__stack text-primary text-center d-flex align-items-center justify-content-around">
                  {domain?.lead?.skills.length > 0 &&
                    domain?.lead.skills.map((skill) => {
                      return <Chip label={skill} />;
                    })}
                </Stack>
              </Box>*/}
            </Box>
            <Row className="domain__content colorPrimary w-100 mt-2">
              <h4 className="w-100">{domain?.desc}</h4>
            </Row>
            <Box className="domain__cta d-flex justify-content-between align-items-center mt-2">
              {/* <Col className="domain__socials text-primary">
                <InstagramIcon />
                <TwitterIcon />
                <LinkedInIcon />
                <PublicIcon />
              </Col> */}
              {/* <Box>
                <Button variant="contained">View Projects</Button>
              </Box> */}
            </Box>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Domain;
