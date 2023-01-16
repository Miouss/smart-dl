import React, { useEffect, useState } from "react";

import StepperDownloadSteps from "./Stepper/StepperDownload";
import StepperCancelSteps from "./Stepper/StepperCancel";

import { Box } from "@mui/material";

export default function MediaMenuStepper() {
  const [isCanceled, setIsCanceled] = useState(false);

  useEffect(() => {
    const onCancelStarts = window.downloadAPI.onCancelStarts(() => {
      setIsCanceled(true);
    });

    return () => {
      onCancelStarts;
    };
  }, [isCanceled]);

  return (
    <Box sx={{ width: "100%" }}>
      {isCanceled ? <StepperCancelSteps /> : <StepperDownloadSteps />}
    </Box>
  );
}
