import { styled } from "@mui/material/styles";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { MUIStepConnectorColor, MUIStepIconContainerColor, MUIStepLabelColor, MUIStepLabelIconColor } from "../../utils/style/colors";

export const StyledStepConnector = styled(StepConnector)({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 24,
    },
    [`&.${stepConnectorClasses.active} .${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: MUIStepConnectorColor.active,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: MUIStepConnectorColor.done,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor: MUIStepConnectorColor.waiting,
      borderRadius: 1,
    },
  });

export  const StyledStepIconContainer = styled("div")<{
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

export const StepLabelSx = {
  "& .MuiStepLabel-alternativeLabel": {
    color: MUIStepLabelIconColor.waiting
  },
  "& .MuiStepLabel-alternativeLabel.Mui-active": {
    color: MUIStepLabelIconColor.active,
  },
  "& .MuiStepLabel-alternativeLabel.Mui-completed": {
    color: MUIStepLabelIconColor.done,
  },

  ".MuiStepLabel-label": {
    fontFamily: "Roboto Slab",
    fontStyle: "normal",
    fontWeight: "400 !important",
    fontSize: "14px",
    lineHeight: "18px",
    color: `${MUIStepLabelColor} !important`,
  },
}