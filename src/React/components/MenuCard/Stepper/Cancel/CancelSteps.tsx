import React from "react";

import StepsTask from "../Steps/StepsTask";

import { Task } from "../../../../../types/Task";

interface Props {
  activeStep: number;
  tasks: {
    mediaFrags: Task;
    mediaParts: Task;
  };
}

export default function CancelSteps({ activeStep, tasks }: Props) {
  switch (activeStep) {
    case 0:
      return (
        <>
          <StepsTask task={tasks.mediaFrags} />
        </>
      );
    case 1:
      return (
        <>
          <StepsTask task={tasks.mediaParts} />
        </>
      );
    default:
      return null;
  }
}
