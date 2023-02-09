import React, { useEffect, useState } from "react";

import DownloadSteps from "./StepperDownload/DownloadSteps";

import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DifferenceIcon from "@mui/icons-material/Difference";
import MovieIcon from "@mui/icons-material/Movie";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import StepperCustom from "./utils/StepperCustom";
import { action, createTask } from "./utils/task";

import type { TaskProps } from "../../../../../types/Task";

interface Props {
  visible: boolean;
}

export default function StepperDownload({ visible }: Props) {
  const api = window.mediaAPI;

  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    "Media Download Started",
    "Downloading Fragments",
    "Merging Fragments",
    "Merging Audio with Video",
    "Done",
  ];

  const icons: { [index: string]: React.ReactElement } = {
    1: <SimCardDownloadIcon />,
    2: <FileCopyIcon />,
    3: <DifferenceIcon />,
    4: <MovieIcon />,
    5: <ThumbUpIcon />,
  };

  const [downloadAudioFrags, setDownloadAudioFrags] = useState<TaskProps>(
    createTask(
      "waiting to download audio fragments",
      "downloading audio fragments",
      "audio fragments had been downloaded successfully"
    )
  );

  const [downloadVideoFrags, setDownloadVideoFrags] = useState<TaskProps>(
    createTask(
      "waiting to download video fragments",
      "downloading video fragments",
      "video fragments had been downloaded successfully"
    )
  );

  const [mergeVideoFrags, setMergeVideo] = useState<TaskProps>(
    createTask(
      "waiting to merge video fragments into single part",
      "merging video fragments into single part",
      "video fragments had been merged into single part successfully"
    )
  );

  const [mergeAudioFrags, setMergeAudio] = useState<TaskProps>(
    createTask(
      "waiting to merge audio fragments into single part",
      "merging audio fragments into single part",
      "audio fragments had been merged into single part successfully"
    )
  );

  const [mergeParts, setMergeParts] = useState<TaskProps>(
    createTask(
      "waiting to merge video and audio parts into MP4 file",
      "merging video and audio parts into MP4 file",
      "video and audio parts had been merged into MP4 file successfully"
    )
  );

  const [deleteFrags, setDeleteFrags] = useState<TaskProps>(
    createTask(
      "waiting to delete media's downloaded fragments",
      "deleting media's downloaded fragments",
      "media's downloaded fragments had been deleted successfully"
    )
  );

  const [deleteParts, setDeleteParts] = useState<TaskProps>(
    createTask(
      "waiting to delete media's downloaded parts",
      "deleting media's downloaded parts",
      "media's downloaded parts had been deleted successfully"
    )
  );

  const tasks = {
    downloadVideoFrags,
    downloadAudioFrags,
    mergeVideoFrags,
    mergeAudioFrags,
    deleteFrags,
    mergeParts,
    deleteParts,
  };

  useEffect(() => {
    api.onDownloadFullyStarts.do(() => setActiveStep(1));
    api.onDownloadingVideoFragsStarts.do(
      action("start", setDownloadVideoFrags)
    );
    api.onDownloadingVideoFragsEnds.do(
      action("end", setDownloadVideoFrags)
    );

    api.onDownloadingAudioFragsStarts.do(
      action("start", setDownloadAudioFrags)
    );

    api.onDownloadingAudioFragsEnds.do(
      action("end", setDownloadAudioFrags, setActiveStep, 2)
    );

    api.onUpdateVideoFragsSteps.do(
      action("update", setDownloadVideoFrags)
    );

    api.onUpdateAudioFragsSteps.do(
      action("update", setDownloadAudioFrags)
    );

    api.onMergingVideoStarts.do(action("start", setMergeVideo));

    api.onMergingVideoEnds.do(action("end", setMergeVideo));

    api.onMergingAudioStarts.do(action("start", setMergeAudio));

    api.onMergingAudioEnds.do(action("end", setMergeAudio));

    api.onDeletingFragsStarts.do(action("start", setDeleteFrags));

    api.onDeletingFragsEnds.do(
      action("end", setDeleteFrags, setActiveStep, 3)
    );

    api.onMergingPartsStarts.do(action("start", setMergeParts));

    api.onMergingPartsEnds.do(action("end", setMergeParts));

    api.onDeletingPartsStarts.do(action("start", setDeleteParts));

    api.onDeletingPartsEnds.do(
      action("end", setDeleteParts, setActiveStep, 5)
    );

    api.onDownloadFullyEnds.do(() => {
      setActiveStep(6);
    });

    return () => {
      api.onDownloadFullyStarts.removeAllListeners();
      api.onDownloadingVideoFragsStarts.removeAllListeners();
      api.onDownloadingVideoFragsEnds.removeAllListeners();
      api.onDownloadingAudioFragsStarts.removeAllListeners();
      api.onDownloadingAudioFragsEnds.removeAllListeners();
      api.onUpdateVideoFragsSteps.removeAllListeners();
      api.onUpdateAudioFragsSteps.removeAllListeners();
      api.onMergingVideoStarts.removeAllListeners();
      api.onMergingVideoEnds.removeAllListeners();
      api.onMergingAudioStarts.removeAllListeners();
      api.onMergingAudioEnds.removeAllListeners();
      api.onDeletingFragsStarts.removeAllListeners();
      api.onDeletingFragsEnds.removeAllListeners();
      api.onMergingPartsStarts.removeAllListeners();
      api.onMergingPartsEnds.removeAllListeners();
      api.onDeletingPartsStarts.removeAllListeners();
      api.onDeletingPartsEnds.removeAllListeners();
      api.onDownloadFullyEnds.removeAllListeners();
    };
  }, [visible]);

  return (
    <StepperCustom
      visible={visible}
      steps={steps}
      icons={icons}
      activeStep={activeStep}
      tasks={<DownloadSteps activeStep={activeStep} tasks={{ ...tasks }} />}
    />
  );
}
