import { styled, Typography } from "@mui/material";

import {
  MUIStepIconContainerColor,
  TaskLabelActiveColor,
  TaskLabelDoneColor,
  TaskLabelWaitingColor,
} from "../../colors";

interface TaskState {
  started: number;
  active: number;
  done: number;
  component: React.ElementType;
}

export const StyledStepIconContainer = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState }) => ({
  zIndex: 1,
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  border: "solid 2px",
  backgroundColor: MUIStepIconContainerColor.bg,
  borderColor: MUIStepIconContainerColor.border,
  ...(ownerState.active && {
    borderColor: MUIStepIconContainerColor.active.border,
  }),
  ...(ownerState.completed && {
    backgroundColor: MUIStepIconContainerColor.done.bg,
    borderColor: MUIStepIconContainerColor.done.border,
  }),
}));

export const TaskLabel = styled(Typography)<TaskState>((props) => ({
  fontFamily: "Roboto Slab",
  fontStyle: props.active ? "normal" : "italic",
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "18px",
  color: props.active
    ? TaskLabelActiveColor
    : props.done
    ? TaskLabelDoneColor
    : TaskLabelWaitingColor,
}));
