import React from "react";

import StepsTask from "./Steps/StepsTask";

import { Task } from "../../../../types/Task";

interface Props {
  activeStep: number;
  tasks: {
    videoFrags: Task;
    audioFrags: Task;
    videoPart: Task;
    audioPart: Task;
    parts: Task;
  };
}

export default function StepperSteps({ activeStep, tasks }: Props) {
  switch (activeStep) {
    case 0:
      return (
        <>
          <StepsTask task={tasks.videoFrags} />
          <StepsTask task={tasks.audioFrags} />
        </>
      );
    case 1:
      return (
        <>
          <StepsTask task={tasks.videoPart} />
          <StepsTask task={tasks.audioPart} />
        </>
      );
    case 2:
      return <StepsTask task={tasks.parts} />;
    default:
      return null;
  }
}
