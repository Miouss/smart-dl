import React, { useEffect, useState } from "react";

import { Stack } from "@mui/material";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import CancelSteps from "./Cancel/CancelSteps";
import { StyledStepConnector, StepLabelSx } from "../../styled/Stepper";
import { customizedStepIcon } from "../../../utils/stepper";

import { Task } from "../../../../types/Task";
import { task } from "../../../utils/task";

interface Props {
  activeStep: number;
}

export default function StepperSteps({ activeStep }: Props) {
  const steps = [
    "Download Canceled",
    "Deleting Media's Fragments",
    "Deleting Media's Parts",
    "Done",
  ];

  const icons: { [index: string]: React.ReactElement } = {
    1: <CancelIcon />,
    2: <DeleteForeverIcon />,
    3: <DeleteForeverIcon />,
    4: <ThumbUpIcon />,
  };

  const [mediaFrags, setMediaFrags] = useState<Task>({
    title: "waiting to delete media fragments",
    started: false,
    done: false,
  });

  const [mediaParts, setMediaParts] = useState<Task>({
    title: "waiting to delete media parts",
    started: false,
    done: false,
  });

  const delete_ = {
    mediaFrags,
    mediaParts,
  };

  useEffect(() => {
    const DeletingFragsStartsEvent = window.downloadAPI.onDeletingFragsStarts(
      () => task.start(setMediaFrags, "Deleting downloaded media's fragments")
    );

    const DeletingFragsEndsEvent = window.downloadAPI.onDeletingFragsEnds(() =>
      task.end(setMediaFrags, "Media's fragments had been deleted successfully")
    );

    const DeletingPartsStartsEvent = window.downloadAPI.onDeletingPartsStarts(
      () => task.start(setMediaParts, "Deleting merged media's parts")
    );

    const DeletingPartsEndsEvent = window.downloadAPI.onDeletingPartsEnds(() =>
      task.end(
        setMediaParts,
        "Media's merged parts had been deleted successfully"
      )
    );

    return () => {
      DeletingFragsStartsEvent;
      DeletingFragsEndsEvent;
      DeletingPartsStartsEvent;
      DeletingPartsEndsEvent;
    };
  });

  return (
    <>
      <Stepper
        activeStep={activeStep}
        connector={<StyledStepConnector />}
        alternativeLabel
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={(props) => customizedStepIcon(icons, props)}
              sx={StepLabelSx}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Stack direction={"column"} marginTop={"1rem"} marginBottom={"1rem"}>
        <CancelSteps activeStep={activeStep} tasks={{ ...delete_ }} />
      </Stack>
    </>
  );
}
