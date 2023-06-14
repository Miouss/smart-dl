import React from "react";
import { Alert, Box, AlertColor } from "@mui/material";
import { AlertMsg } from "../../types/AlertMsg";

interface Props {
  alertMsg: AlertMsg;
}

export function TemporyAlert({ alertMsg }: Props) {
  return alertMsg ? (
    <Alert severity={alertMsg.severity}>{alertMsg.message}</Alert>
  ) : (
    <Box height="48px"></Box>
  );
}

export function infoAlert(message: string) {
  return createAlert("info", message);
}

export function warningAlert(message: string) {
  return createAlert("warning", message);
}

export function errorAlert(message: string) {
  return createAlert("error", message);
}

function createAlert(severity: AlertColor, message: string) {
  return {
    severity: severity,
    message: message,
  };
}
