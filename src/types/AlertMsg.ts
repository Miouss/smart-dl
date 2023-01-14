import { AlertColor } from "@mui/material";

export interface AlertMsg {
    severity: AlertColor;
    message: string;
    trigger?: boolean;
  }