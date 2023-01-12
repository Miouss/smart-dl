import React from "react";
import { Alert, AlertColor, Box } from "@mui/material";
import { AlertStyle, ReservedBoxStyle } from "../styled/AppStyle";

interface AlertMsg {
  severity: AlertColor;
  message: string;
}

interface Props {
  alertMsg: AlertMsg;
}

export default function TemporyAlert({ alertMsg }: Props) {
  if (alertMsg) {
    return (
      <Alert severity={alertMsg.severity} sx={AlertStyle}>
        {alertMsg.message}
      </Alert>
    );
  } else {
    return <Box sx={ReservedBoxStyle}></Box>;
  }
}
