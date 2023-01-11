import React, { useEffect, useState } from "react";

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
    setIsCanceled(true); 
    setActiveStep(1);
  });

  useEffect(() => {
    const onDownloadingFragsEnds = window.downloadAPI.onDownloadingFragsEnds(() => setActiveStep(1));
    const onMergingPartsEnds = window.downloadAPI.onMergingPartsEnds(() => setActiveStep(2));
    window.downloadAPI.onMergingEnds(() => setActiveStep(4));
  
    const onDeletingFragsEnds = window.downloadAPI.onDeletingFragsEnds(() => {
      if(isCanceled){
        setActiveStep(2)
      }
    });
  
    const onDeletingPartsEnds = window.downloadAPI.onDeletingPartsEnds(() => {
      if(isCanceled){
        setActiveStep(4)
      }
    });
  
    const onCancelStarts = window.downloadAPI.onCancelStarts(() => {
      setIsCanceled(true); 
      setActiveStep(1);
    });

    return () => {
      onDownloadingFragsEnds;
      onMergingPartsEnds;
      onDeletingFragsEnds;
      onDeletingPartsEnds;
      onCancelStarts
    }
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {isCanceled ? (
        <StepperCancelSteps activeStep={activeStep}  />
      ) : (
        <StepperDownloadSteps activeStep={activeStep} />
      )}
    </Box>
  );
}
