import React from "react";

import StepsTask from "./Steps/StepsTask";

import { Task } from "../../../../types/Task";

interface Props {
  activeStep: number;
  videoFragsDlTask: Task;
  audioFragsDlTask: Task;
  mergingVideoPartTask: Task;
  mergingAudioPartTask: Task;
  mergingPartsTask: Task;
}

export default function StepperSteps({
  activeStep,
  videoFragsDlTask,
  audioFragsDlTask,
  mergingVideoPartTask,
  mergingAudioPartTask,
  mergingPartsTask,
}: Props) {
  switch (activeStep) {
    case 0:
      return (
        <>
          <StepsTask task={videoFragsDlTask} />
          <StepsTask task={audioFragsDlTask} />
        </>
      );
    case 1:
      return (
        <>
          <StepsTask task={mergingVideoPartTask} />
          <StepsTask task={mergingAudioPartTask} />
        </>
      );
    case 2:
      return <StepsTask task={mergingPartsTask} />;
    default:
      return null;
  }
}
