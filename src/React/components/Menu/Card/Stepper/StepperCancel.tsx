import React, { useEffect, useState } from "react";

import CancelSteps from "./Cancel/CancelSteps";

import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import StepperCustom from "./utils/StepperCustom";
import { task } from "./utils/task";

import { TaskProps } from "../../../../../types/Task";

export default function StepperSteps() {
  const [activeStep, setActiveStep] = useState<number>(0);

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

  const [mediaFrags, setMediaFrags] = useState<TaskProps>({
    title: "waiting to delete media fragments",
    started: false,
    done: false,
  });

  const [mediaParts, setMediaParts] = useState<TaskProps>({
    title: "waiting to delete media parts",
    started: false,
    done: false,
  });

  const delete_ = {
    mediaFrags,
    mediaParts,
  };
  useEffect(() => {
    const onDeletingFragsStarts = window.downloadAPI.onDeletingFragsStarts(() =>
      task.start(setMediaFrags, "Deleting downloaded media's fragments")
    );

    const onDeletingFragsEnds = window.downloadAPI.onDeletingFragsEnds(() =>
      task.end(setMediaFrags, "Media's fragments had been deleted successfully")
    );

    const onDeletingPartsStarts = window.downloadAPI.onDeletingPartsStarts(() =>
      task.start(setMediaParts, "Deleting merged media's parts")
    );

    const onDeletingPartsEnds = window.downloadAPI.onDeletingPartsEnds(() =>
      task.end(
        setMediaParts,
        "Media's merged parts had been deleted successfully"
      )
    );

    return () => {
      onDeletingFragsStarts;
      onDeletingFragsEnds;
      onDeletingPartsStarts;
      onDeletingPartsEnds;
    };
  }, []);

  useEffect(() => {
    const onCancelStarts = window.downloadAPI.onCancelStarts(() => {
      setActiveStep(1);
    });

    const onDeletingFragsEnds = window.downloadAPI.onDeletingFragsEnds(() => {
      setActiveStep(2);
    });

    const onDeletingPartsEnds = window.downloadAPI.onDeletingPartsEnds(() => {
      setActiveStep(3);
    });

    const onCancelEnds = window.downloadAPI.onCancelEnds(() => {
      setActiveStep(4);
    });

    return () => {
      onCancelStarts;
      onDeletingFragsEnds;
      onDeletingPartsEnds;
      onCancelEnds;
    };
  }, []);

  return (
    <StepperCustom
      steps={steps}
      icons={icons}
      activeStep={activeStep}
      tasks={<CancelSteps activeStep={activeStep} tasks={{ ...delete_ }} />}
    />
  );
}
