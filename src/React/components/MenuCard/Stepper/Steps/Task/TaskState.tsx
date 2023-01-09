import React from "react";

import { Stack, Box, CircularProgress } from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import DoneIcon from "@mui/icons-material/Done";
import { Task } from "../../../../../../types/Task";

interface Props {
  task: Task;
}

export default function TasksState({ task }: Props) {
  return (
    <>
      <Stack direction={"row"} marginLeft={"3rem"} spacing={"0.5rem"}>
        <Box>
          {task.done ? (
            <DoneIcon fontSize="small" />
          ) : task.started ? (
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
