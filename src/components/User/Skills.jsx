import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";

import { Card, CardBody } from "reactstrap";

function Skills({ user }) {
  const [skill, setSkill] = useState("soft");

  const handleSkill = (event, selectedSkill) => {
    setSkill(selectedSkill);
  };

  return (
    <div className="skills-box">
      <Card style={{ position: "relative" }} className="text-center p-3">
        <CardBody>
          <TabContext value={skill}>
            <TabList onChange={handleSkill} aria-label="Skill Selection" centered>
              <Tab label="Soft Skills" value="soft" />
              <Tab label="Hard Skills" value="hard" />
            </TabList>
          </TabContext>
          {skill === "soft" && (
            <Stack direction="row" whiteSpace="pre-wrap" className="skills">
              {user?.skillSet?.soft?.length > 0 ? (
                user?.skillSet?.soft?.map((set, idx) => <Chip label={set} key={idx} variant="outlined" />)
              ) : (
                <div className="mt-3 opacity-50">
                  <HourglassEmptyRoundedIcon sx={{ fontSize: "1.75rem" }} />
                  <p style={{ fontSize: "0.7rem" }}>User hasn't added any soft skills</p>
                </div>
              )}
            </Stack>
          )}
          {skill === "hard" && (
            <Stack direction="row" whiteSpace="pre-wrap" className="skills">
              {user?.skillSet?.hard?.length > 0 ? (
                user?.skillSet?.hard?.map((set, idx) => <Chip label={set} key={idx} variant="outlined" />)
              ) : (
                <div className="mt-3 opacity-50">
                  <HourglassEmptyRoundedIcon sx={{ fontSize: "1.75rem" }} />
                  <p style={{ fontSize: "0.7rem" }}>User hasn't added any hard skills</p>
                </div>
              )}
            </Stack>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default Skills;
