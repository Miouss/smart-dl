import React from "react";

import StepsTask from "../utils/StepsTask";

import { TaskProps } from "../../../../../../types/Task";

interface Props {
  activeStep: number;
  tasks: {
    deleteFrags: TaskProps;
    deleteParts: TaskProps;
    deleteSource: TaskProps;
  };
}

export default function CancelSteps({ activeStep, tasks }: Props) {
  switch (activeStep) {
    case 1:
      return <StepsTask task={tasks.deleteFrags} />;
    case 2:
      return <StepsTask task={tasks.deleteParts} />;
    case 3:
      return <StepsTask task={tasks.deleteSource} />;
    default:
      return null;
  }
}
