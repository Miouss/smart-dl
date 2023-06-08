import React from "react";

import { Stack, Box, CircularProgress } from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import DoneIcon from "@mui/icons-material/Done";

import { TaskProps } from "../../../../../../../types/Task";

interface Props {
  task: TaskProps;
}

export default function Task({ task }: Props) {
  return (
    <>
      <Stack direction={"row"} marginLeft={"3rem"} spacing={"0.5rem"}>
        <Box>
          {task.done.isDone ? (
            <DoneIcon fontSize="small" />
          ) : task.started.isStarted ? (
            <CircularProgress size="1rem" />
          ) : (
            <HourglassEmptyIcon fontSize="small" />
          )}
        </Box>
        <Box paddingTop={"0.4rem"}>{task.title}</Box>
      </Stack>
    </>
  );
}
