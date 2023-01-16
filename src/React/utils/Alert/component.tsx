import React from "react";
import { Alert, Box } from "@mui/material";
import { AlertMsg } from "../../../types/AlertMsg";

interface Props {
  alertMsg: AlertMsg;
}

export function TemporyAlert({ alertMsg }: Props) {
  if (alertMsg) {
    return <Alert severity={alertMsg.severity}>{alertMsg.message}</Alert>;
  } else {
    return <Box height="48px"></Box>;
  }
}
