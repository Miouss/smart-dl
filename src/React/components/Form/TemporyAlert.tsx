import React from "react";
import { Alert, Box } from "@mui/material";
import { AlertMsg } from "../../../types/AlertMsg";

interface Props {
  alertMsg: AlertMsg;
}

export default function TemporyAlert({ alertMsg }: Props) {
  const AlertStyle = { width: "fit-content", height: "fit-content" }
  const ReservedBoxStyle = {height: 48 };

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
