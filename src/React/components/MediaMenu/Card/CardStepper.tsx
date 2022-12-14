import React, { Dispatch, SetStateAction, useState } from "react";
import { Box, Stack } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import StepperSteps from "./Stepper/StepperSteps";

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

  const [mergingPartsTask, setMergingPartsTask] = useState<Task>({
    title: "waiting to merge video and audio parts into mp4 file",
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

  window.downloadAPI.onMergingVideoEnds(() =>
    endTask(
      setMergingVideoPartTask,
      "Video's fragments had been merged into single part successfully"
    )
  );
  window.downloadAPI.onMergingAudioEnds(() =>
    endTask(
      setMergingAudioPartTask,
      "Audio's fragments had been merged into single part successfully"
    )
  );

  window.downloadAPI.onMergingPartsStarts(() =>
    startTask(
      setMergingPartsTask,
      "Merging video and audio parts into MP4 file"
    )
  );
  window.downloadAPI.onMergingPartsEnds(() =>
    endTask(setMergingPartsTask, "Video and audio parts merged sucessfully")
  );

  window.downloadAPI.onUpdateDownloadSteps(
    (_: unknown, taskTitle: string, mediaType: Media) => {
      mediaType === "Audio"
        ? updateTask(setAudioFragsDlTask, taskTitle)
        : updateTask(setVideoFragsDlTask, taskTitle);
    }
  );

  window.downloadAPI.onDownloadStepsEnds((_: unknown, mediaType: Media) => {
    mediaType === "Audio"
      ? endTask(
          setAudioFragsDlTask,
          "Audio's fragments had been downloaded successfully"
        )
      : endTask(
          setVideoFragsDlTask,
          "Video's fragments had been downloaded successfully"
        );
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

  const endTask = (
    setStateOfTask: Dispatch<SetStateAction<Task>>,
    updatedTaskTitle: string | undefined = undefined
  ) => {
    setStateOfTask((task) => ({
      title: updatedTaskTitle !== undefined ? updatedTaskTitle : task.title,
      started: true,
      done: true,
    }));
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

      <Stack direction={"column"} marginTop={"1rem"} marginBottom={"1rem"}>
        <StepperSteps
          activeStep={activeStep}
          videoFragsDlTask={videoFragsDlTask}
          audioFragsDlTask={audioFragsDlTask}
          mergingVideoPartTask={mergingVideoPartTask}
          mergingAudioPartTask={mergingAudioPartTask}
          mergingPartsTask={mergingPartsTask}
        />
      </Stack>
    </Box>
  );
}
