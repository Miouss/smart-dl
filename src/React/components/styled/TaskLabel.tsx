import React from "react";
import { styled, Typography } from "@mui/material";
import {
  TaskLabelActiveColor,
  TaskLabelDoneColor,
  TaskLabelWaitingColor,
} from "../../utils/style/colors";

interface TaskState {
  started: number;
  done: number;
  component: React.ElementType;
}

export const TaskLabel = styled(Typography)<TaskState>((props) => {
  const active = props.started && !props.done;

  return {
    fontFamily: "Roboto Slab",
    fontStyle: active ? "normal" : "italic",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "18px",
    color: active
      ? TaskLabelActiveColor
      : props.done
      ? TaskLabelDoneColor
      : TaskLabelWaitingColor,
  };
});
