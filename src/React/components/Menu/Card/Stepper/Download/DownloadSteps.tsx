import React from "react";

import StepsTask from "../utils/StepsTask";

import { TaskProps } from "../../../../../../types/Task";

interface Props {
  activeStep: number;
  tasks: {
    videoFrags: TaskProps;
    audioFrags: TaskProps;
    videoPart: TaskProps;
    audioPart: TaskProps;
    parts: TaskProps;
  };
}

export default function DownloadSteps({ activeStep, tasks }: Props) {
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
