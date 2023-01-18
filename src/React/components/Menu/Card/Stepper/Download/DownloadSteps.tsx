import React from "react";

import StepsTask from "../utils/StepsTask";

import { TaskProps } from "../../../../../../types/Task";

interface Props {
  activeStep: number;
  tasks: {
    downloadVideoFrags: TaskProps;
    downloadAudioFrags: TaskProps;
    mergeVideoFrags: TaskProps;
    mergeAudioFrags: TaskProps;
    deleteFrags: TaskProps;
    mergeParts: TaskProps;
    deleteParts: TaskProps;
  };
}

export default function DownloadSteps({ activeStep, tasks }: Props) {
  switch (activeStep) {
    case 1:
      return (
        <>
          <StepsTask task={tasks.downloadVideoFrags} />
          <StepsTask task={tasks.downloadAudioFrags} />
        </>
      );
    case 2:
      return (
        <>
          <StepsTask task={tasks.mergeVideoFrags} />
          <StepsTask task={tasks.mergeAudioFrags} />
          <StepsTask task={tasks.deleteFrags} />
        </>
      );
    case 3:
      return (
        <>
          <StepsTask task={tasks.mergeParts} />{" "}
          <StepsTask task={tasks.deleteParts} />
        </>
      );
    default:
      return null;
  }
}
