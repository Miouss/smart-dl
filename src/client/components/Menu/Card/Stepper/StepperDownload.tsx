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
  const {
    onDownloadFully,
    onDownloadingVideoFrags,
    onDownloadingAudioFrags,
    onUpdateVideoFragsSteps,
    onUpdateAudioFragsSteps,
    onMergingVideo,
    onMergingAudio,
    onDeletingFrags,
    onMergingParts,
    onDeletingParts,
  } = window.mediaAPI;

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
    onDownloadFully.starts.do(() => setActiveStep(1));
    onDownloadingVideoFrags.starts.do(action("start", setDownloadVideoFrags));
    onDownloadingVideoFrags.ends.do(action("end", setDownloadVideoFrags));

    onDownloadingAudioFrags.starts.do(action("start", setDownloadAudioFrags));

    onDownloadingAudioFrags.ends.do(
      action("end", setDownloadAudioFrags, setActiveStep, 2)
    );

    onUpdateVideoFragsSteps.do(action("update", setDownloadVideoFrags));

    onUpdateAudioFragsSteps.do(action("update", setDownloadAudioFrags));

    onMergingVideo.starts.do(action("start", setMergeVideo));

    onMergingVideo.ends.do(action("end", setMergeVideo));

    onMergingAudio.starts.do(action("start", setMergeAudio));

    onMergingAudio.ends.do(action("end", setMergeAudio));

    onDeletingFrags.starts.do(action("start", setDeleteFrags));

    onDeletingFrags.ends.do(action("end", setDeleteFrags, setActiveStep, 3));

    onMergingParts.starts.do(action("start", setMergeParts));

    onMergingParts.ends.do(action("end", setMergeParts));

    onDeletingParts.starts.do(action("start", setDeleteParts));

    onDeletingParts.ends.do(action("end", setDeleteParts, setActiveStep, 5));

    onDownloadFully.ends.do(() => {
      setActiveStep(6);
    });

    return () => {
      onDownloadFully.starts.removeAllListeners();
      onDownloadingVideoFrags.starts.removeAllListeners();
      onDownloadingVideoFrags.ends.removeAllListeners();
      onDownloadingAudioFrags.starts.removeAllListeners();
      onDownloadingAudioFrags.ends.removeAllListeners();
      onUpdateVideoFragsSteps.removeAllListeners();
      onUpdateAudioFragsSteps.removeAllListeners();
      onMergingVideo.starts.removeAllListeners();
      onMergingVideo.ends.removeAllListeners();
      onMergingAudio.starts.removeAllListeners();
      onMergingAudio.ends.removeAllListeners();
      onDeletingFrags.starts.removeAllListeners();
      onDeletingFrags.ends.removeAllListeners();
      onMergingParts.starts.removeAllListeners();
      onMergingParts.ends.removeAllListeners();
      onDeletingParts.starts.removeAllListeners();
      onDeletingParts.ends.removeAllListeners();
      onDownloadFully.ends.removeAllListeners();
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
