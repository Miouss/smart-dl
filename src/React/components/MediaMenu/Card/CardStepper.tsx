import React, { Dispatch, SetStateAction, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import { TaskLabel } from "../../styled/TaskLabel";

interface Task {
  title: string;
  started: boolean;
  done: boolean;
}

type Media = "Video" | "Audio";

export default function MediaMenuStepper() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const [audioFragsDlTask, setAudioFragsDlTask] = useState<Task>({
    title: "waiting to download audio fragments",
    started: false,
    done: false,
  });
  const [videoFragsDlTask, setVideoFragsDlTask] = useState<Task>({
    title: "waiting to download video fragments",
    started: false,
    done: false,
  });

  const [mergingVideoPartTask, setMergingVideoPartTask] = useState<Task>({
    title: "waiting to merge video fragments into single part",
    started: false,
    done: false,
  });
  const [mergingAudioPartTask, setMergingAudioPartTask] = useState<Task>({
    title: "waiting to merge audio fragments into single part",
    started: false,
    done: false,
  });

  const steps = [
    "Downloading Fragments",
    "Merging Fragments into Video and Audio Parts",
    "Merging Audio with Video",
    "Done",
  ];

  window.downloadAPI.onDownloadingFragsEnds(() => setActiveStep(1));
  window.downloadAPI.onMergingPartsEnds(() => setActiveStep(2));
  window.downloadAPI.onMergingEnds(() => setActiveStep(4));

  window.downloadAPI.onMergingVideoStarts(() =>
    startTask(
      setMergingVideoPartTask,
      "Merging video's fragments into single part"
    )
  );
  window.downloadAPI.onMergingAudioStarts(() =>
    startTask(
      setMergingAudioPartTask,
      "Merging audio's fragments into single part"
    )
  );

  window.downloadAPI.onMergingVideoEnds(() => endTask(setMergingVideoPartTask));
  window.downloadAPI.onMergingAudioEnds(() => endTask(setMergingAudioPartTask));

  window.downloadAPI.onUpdateDownloadSteps(
    (_: unknown, taskTitle: string, mediaType: Media) => {
      mediaType === "Audio"
        ? updateTask(setAudioFragsDlTask, taskTitle)
        : updateTask(setVideoFragsDlTask, taskTitle);
    }
  );

  window.downloadAPI.onDownloadStepsEnds((_: unknown, mediaType: Media) => {
    mediaType === "Audio"
      ? endTask(setAudioFragsDlTask)
      : endTask(setVideoFragsDlTask);
  });

  const startTask = (
    setStateOfTask: Dispatch<SetStateAction<Task>>,
    updatedTaskTitle: string | undefined = undefined
  ) => {
    setStateOfTask((task) => ({
      title: updatedTaskTitle !== undefined ? updatedTaskTitle : task.title,
      started: true,
      done: false,
    }));
  };

  const updateTask = (
    setStateOfTask: Dispatch<SetStateAction<Task>>,
    taskTitle: string
  ) => {
    setStateOfTask({
      title: taskTitle,
      started: true,
      done: false,
    });
  };

  const endTask = (setStateOfTask: Dispatch<SetStateAction<Task>>) => {
    setStateOfTask((task) => ({
      title: task.title,
      started: true,
      done: true,
    }));
  };

  const StepsStates = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <TaskLabel
              variant="h6"
              started={videoFragsDlTask.started ? 1 : 0}
              done={videoFragsDlTask.done ? 1 : 0}
            >
              
            </TaskLabel>
            <TaskLabel
              variant="h6"
              started={audioFragsDlTask.started ? 1 : 0}
              done={audioFragsDlTask.done ? 1 : 0}
            >
              
            </TaskLabel>
          </>
        );
      default:
        return (
          <>
            <TaskLabel
              variant="h6"
              started={mergingVideoPartTask.started ? 1 : 0}
              done={mergingVideoPartTask.done ? 1 : 0}
            >
              {mergingVideoPartTask.title}
            </TaskLabel>
            <TaskLabel
              variant="h6"
              started={mergingAudioPartTask.started ? 1 : 0}
              done={mergingAudioPartTask.done ? 1 : 0}
            >
              {mergingAudioPartTask.title}
            </TaskLabel>
          </>
        );
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{
                "& .MuiStepLabel-alternativeLabel": {
                  fontFamily: "Roboto Slab",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "18px",
                },

                "& .Mui-active.MuiStepLabel-alternativeLabel": {
                  color: "#F2F2F2",
                },
                "& .Mui-completed.MuiStepLabel-alternativeLabel": {
                  color: "green",
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <StepsStates />
    </Box>
  );
}
