import React, { useState } from "react";

import { Box } from "@mui/material";

import StepperDownloadSteps from "./Stepper/StepperDownloadSteps";
import StepperCancelSteps from "./Stepper/StepperCancelSteps";

export default function MediaMenuStepper() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isCanceled, setIsCanceled] = useState(false);

  window.downloadAPI.onDownloadingFragsEnds(() => setActiveStep(1));
  window.downloadAPI.onMergingPartsEnds(() => setActiveStep(2));
  window.downloadAPI.onMergingEnds(() => setActiveStep(4));

  window.downloadAPI.onDeletingFragsEnds(() => {
    if(isCanceled){
      setActiveStep(2)
    }
  });

  window.downloadAPI.onDeletingPartsEnds(() => {
    if(isCanceled){
      setActiveStep(4)
    }
  });

  window.downloadAPI.onCancelStarts(() => {
    setIsCanceled(true)
    setActiveStep(1);
  });

  return (
    <Box sx={{ width: "100%" }}>
      {isCanceled ? (
        <StepperCancelSteps activeStep={activeStep} />
      ) : (
        <StepperDownloadSteps activeStep={activeStep} />
      )}
    </Box>
  );
}
