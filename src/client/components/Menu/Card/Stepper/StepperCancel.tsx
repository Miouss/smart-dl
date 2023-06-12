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
  const { onCancel, onDeletingFrags, onDeletingParts, onDeletingSource } =
    window.mediaAPI;

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
    onCancel.starts.do(() => {
      setActiveStep(1);
    });

    onDeletingFrags.starts.do(
      action("start", setDeleteFrags, setActiveStep, 2)
    );
    onDeletingFrags.ends.do(action("end", setDeleteFrags));

    onDeletingParts.starts.do(
      action("start", setDeleteParts, setActiveStep, 3)
    );
    onDeletingParts.ends.do(action("end", setDeleteParts));

    onDeletingSource.starts.do(
      action("start", setDeleteSource, setActiveStep, 4)
    );
    onDeletingSource.ends.do(action("end", setDeleteSource));

    onCancel.ends.do(() => {
      setActiveStep(5);
    });

    return () => {
      onCancel.starts.removeAllListeners();
      onDeletingFrags.starts.removeAllListeners();
      onDeletingFrags.ends.removeAllListeners();
      onDeletingParts.starts.removeAllListeners();
      onDeletingParts.ends.removeAllListeners();
      onDeletingSource.starts.removeAllListeners();
      onDeletingSource.ends.removeAllListeners();
      onCancel.ends.removeAllListeners();
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
