import { AlertColor } from "@mui/material";

export function alertMsgOutputPath(
  outputPath: undefined | string,
  triggerState: undefined | boolean
) {
  return outputPath
    ? infoAlert(`Your save location is : '${outputPath}'`, triggerState)
    : warningAlert("There is no save location", triggerState);
}

export function alertMsgAccount(
  username: undefined | string,
  triggerState: undefined | boolean
) {
  return username
    ? infoAlert(`The account named ${username} will be use`, triggerState)
    : warningAlert(`There is no account saved`, triggerState);
}


/* Utils */

function createAlert(severity: AlertColor, message: string, triggerState: undefined | boolean) {
  return {
    severity: severity,
    message: message,
    trigger: !triggerState ?? true,
  };
}

function infoAlert(message: string, triggerState: undefined | boolean) {
  return  createAlert("info", message, triggerState);
}

function warningAlert(message: string, triggerState: undefined | boolean) {
  return createAlert("warning", message, triggerState);
}
