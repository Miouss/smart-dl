import React from "react";

import Task from "./StepsTask/Task";

import { TaskLabel } from "../../../../../styles/components/specific/Stepper";

import { TaskProps } from "../../../../../../types/Task";

interface Props {
  task: TaskProps;
}

export default function StepsTasks({ task }: Props) {
  return (
    <TaskLabel
      component="span"
      variant="h6"
      started={task.started ? 1 : 0}
      active={task.started && !task.done ? 1 : 0}
      done={task.done ? 1 : 0}
    >
      <Task task={task} />
    </TaskLabel>
  );
}