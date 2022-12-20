import React from "react";

import { Card, CardBody } from "reactstrap";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";

function Techstacks({ user }) {
  return (
    <div className="techstacks-box pt-2">
      <Card style={{ position: "relative" }} className="p-3">
        <CardBody>
          <h4 className="title">Tech Stacks</h4>
          <Stack direction="row" whiteSpace="pre-wrap" className="skills">
            {!user?.stacks?.length ? ( // If no tech techstacks, then display para else show techstacks
              <div className="mt-3 opacity-50 text-center">
                <HourglassEmptyRoundedIcon sx={{ fontSize: "1.75rem" }} />
                <p style={{ fontSize: "0.7rem" }}>User hasn't added any technologies</p>
              </div>
            ) : (
              user?.stacks?.map((interest, idx) => {
                return (
                  <Chip
                    label={interest}
                    key={idx}
                    variant="outlined"
                    onClick={() => {
                      console.log("clicked");
                    }}
                    // sx={{color: "#2596BE", borderColor: "#2596BE", backgroundColor: "#2596BE40"}}
                  />
                );
              })
            )}
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}

export default Techstacks;
