import { AlertColor } from "@mui/material";

export function alertMsgOutputPath(
  outputPath: undefined |string,
  triggerState: undefined | boolean
) {
    
  return outputPath ? {
    severity: "info" as AlertColor,
    message: `Your save location is : '${outputPath}'`,
    trigger: !triggerState ?? true,
  } : {
    severity: "warning" as AlertColor,
    message: `There is no save location`,
    trigger: !triggerState ?? true,  
  };
}
