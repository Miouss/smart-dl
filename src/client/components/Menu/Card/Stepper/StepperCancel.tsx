import React, { useEffect, useState } from "react";

import CancelSteps from "./StepperCancel/CancelSteps";

import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import StepperCustom from "./utils/StepperCustom";
import { action, createTask } from "./utils/task";

import type { TaskProps } from "../../../../../types/Task";

interface Props {
  visible: boolean;
}

export default function StepperCancel({ visible }: Props) {
  const api = window.mediaAPI;

  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    "Download Canceled",
    "Deleting Media's Fragments",
    "Deleting Media's Parts",
    "Deleting Media's Source",
    "Done",
  ];

  const icons: { [index: string]: React.ReactElement } = {
    1: <CancelIcon />,
    2: <DeleteForeverIcon />,
    3: <DeleteForeverIcon />,
    4: <DeleteForeverIcon />,
    5: <ThumbUpIcon />,
  };

  const [deleteFrags, setDeleteFrags] = useState<TaskProps>(
    createTask(
      "waiting to delete media fragments",
      "deleting media fragments",
      "media fragments had been deleted successfully"
    )
  );

  const [deleteParts, setDeleteParts] = useState<TaskProps>(
    createTask(
      "waiting to delete media parts",
      "deleting media parts",
      "media parts had been deleted successfully"
    )
  );

  const [deleteSource, setDeleteSource] = useState<TaskProps>(
    createTask(
      "waiting to delete media source",
      "deleting media source",
      "media source had been deleted successfully"
    )
  );

  const tasks = {
    deleteFrags,
    deleteParts,
    deleteSource,
  };

  useEffect(() => {
    api.onCancelStarts.do(() => {
      setActiveStep(1);
    });

    api.onDeletingFragsStarts.do(
      action("start", setDeleteFrags, setActiveStep, 2)
    );
    api.onDeletingFragsEnds.do(action("end", setDeleteFrags));

    api.onDeletingPartsStarts.do(
      action("start", setDeleteParts, setActiveStep, 3)
    );
    api.onDeletingPartsEnds.do(action("end", setDeleteParts));

    api.onDeletingSourceStarts.do(
      action("start", setDeleteSource, setActiveStep, 4)
    );
    api.onDeletingSourceEnds.do(action("end", setDeleteSource));

    api.onCancelEnds.do(() => {
      setActiveStep(5);
    });

    return () => {
      api.onCancelStarts.removeAllListeners();
      api.onDeletingFragsStarts.removeAllListeners();
      api.onDeletingFragsEnds.removeAllListeners();
      api.onDeletingPartsStarts.removeAllListeners();
      api.onDeletingPartsEnds.removeAllListeners();
      api.onDeletingSourceStarts.removeAllListeners();
      api.onDeletingSourceEnds.removeAllListeners();
      api.onCancelEnds.removeAllListeners();
    };
  }, []);

  return (
    <StepperCustom
      visible={visible}
      steps={steps}
      icons={icons}
      activeStep={activeStep}
      tasks={<CancelSteps activeStep={activeStep} tasks={{ ...tasks }} />}
    />
  );
}
