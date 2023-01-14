import React from "react";
import { styled, Typography } from "@mui/material";

interface TaskState {
  started: number;
  done: number;
  component: React.ElementType 
}

export const TaskLabel = styled(Typography)<TaskState>((props) => {
  return {
    fontFamily: "Roboto Slab",
    fontStyle: props.started && !props.done ? "normal" : "italic",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "18px",
    color: props.done ? "green" : "white",
  };
});
