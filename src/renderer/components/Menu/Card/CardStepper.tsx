import React, { useEffect, useState } from "react";

import StepperDownload from "./Stepper/StepperDownload";
import StepperCancel from "./Stepper/StepperCancel";

import { Box } from "@mui/material";

export default function MediaMenuStepper() {
  const [isCanceled, setIsCanceled] = useState(false);

  useCancelEvent(isCanceled, setIsCanceled);

  return (
    <Box sx={{ width: "100%" }}>
      <StepperCancel visible={isCanceled} />
      <StepperDownload visible={!isCanceled} />
    </Box>
  );
}

function useCancelEvent(
  isCanceled: boolean,
  setIsCanceled: React.Dispatch<React.SetStateAction<boolean>>
) {
  const { onCancel } = window.mediaAPI;

  useEffect(() => {
    onCancel.starts.do(() => {
      setIsCanceled(true);
    });
  }, [isCanceled]);
}
