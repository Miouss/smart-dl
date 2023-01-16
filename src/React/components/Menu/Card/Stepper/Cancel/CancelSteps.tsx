import React from "react";

import StepsTask from "../utils/StepsTask";

import { TaskProps } from "../../../../../../types/Task";

interface Props {
  activeStep: number;
  tasks: {
    mediaFrags: TaskProps;
    mediaParts: TaskProps;
  };
}

export default function CancelSteps({ activeStep, tasks }: Props) {
  switch (activeStep) {
    case 0:
      return <StepsTask task={tasks.mediaFrags} />;
    case 1:
      return <StepsTask task={tasks.mediaParts} />;
    default:
      return null;
  }
}
