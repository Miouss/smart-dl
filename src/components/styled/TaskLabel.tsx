import { styled, Typography } from "@mui/material"

interface TaskState {
    started: number;
    done: number;
  }

export const TaskLabel = styled(Typography, {
    shouldForwardProp: (prop) => prop !== "variant",
  })<TaskState>((props) => {
    return {
      fontFamily: "Roboto Slab",
      fontStyle: props.started ? "normal" : "italic",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "18px",
      color: props.done ? "green" : "#F2F2F2",
    };
  });