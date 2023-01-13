import React from "react";

import { TaskLabel } from "../../../styled/TaskLabel";
import TaskState from "./Task/TaskState";

import { Task } from "../../../../../types/Task";

interface Props {
  task: Task;
}

export default function StepsTasks({ task }: Props) {
  return (
    <TaskLabel
      component="span"
      variant="h6"
      started={task.started ? 1 : 0}
      done={task.done ? 1 : 0}
    >
      <TaskState task={task} />
    </TaskLabel>
  );
}
