import { styled } from "@mui/material/styles";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

export const StyledStepConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 24,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: "#2e7d32",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: "#2e7d32",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  }));

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
    backgroundColor: "#333333",
    borderColor: "white",
    ...(ownerState.active && {
      borderColor: "#2e7d32",
    }),
    ...(ownerState.completed && {
      borderColor: "#2e7d32",
      backgroundColor: "green",
    }),
  }));

export const StepLabelSx = {
  "& .MuiStepLabel-alternativeLabel": {
    fontFamily: "Roboto Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "18px",
    color: "white"
  },

  "& .Mui-active.MuiStepLabel-alternativeLabel": {
    color: "white",
  },
  "& .Mui-completed.MuiStepLabel-alternativeLabel": {
    color: "white",
  },
}