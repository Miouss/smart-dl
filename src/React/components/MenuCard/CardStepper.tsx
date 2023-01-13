import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";

import StepperDownloadSteps from "./Stepper/StepperDownloadSteps";
import StepperCancelSteps from "./Stepper/StepperCancelSteps";

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
      {isCanceled ? (
        <StepperCancelSteps />
      ) : (
        <StepperDownloadSteps />
      )}
    </Box>
  );
}
