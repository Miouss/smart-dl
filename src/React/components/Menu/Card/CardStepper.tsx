import React, { useEffect, useState } from "react";

import StepperDownload from "./Stepper/StepperDownload";
import StepperCancel from "./Stepper/StepperCancel";

import { Box } from "@mui/material";

export default function MediaMenuStepper() {
  const [isCanceled, setIsCanceled] = useState(false);

  useEffect(() => {
    const onCancelStarts = window.mediaAPI.onCancelStarts.do(() => {
      setIsCanceled(true);
    });

    return () => {
      onCancelStarts;

    };
  }, [isCanceled]);

  return (
    <Box sx={{ width: "100%" }}>
      <StepperCancel visible={isCanceled} />
      <StepperDownload visible={!isCanceled} />
    </Box>
  );
}
