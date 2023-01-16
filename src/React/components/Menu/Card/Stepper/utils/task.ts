import { Dispatch, SetStateAction } from "react";

import { TaskProps } from "../../../../../../types/Task";

const start = (
  setter: Dispatch<SetStateAction<TaskProps>>,
  updatedTaskTitle: string | undefined = undefined
) => {
  setter((task: TaskProps) => ({
    title: updatedTaskTitle !== undefined ? updatedTaskTitle : task.title,
    started: true,
    done: false,
  }));
};

const update = (
  setter: Dispatch<SetStateAction<TaskProps>>,
  taskTitle: string
) => {
  setter({
    title: taskTitle,
    started: true,
    done: false,
  });
};

const end = (
  setter: Dispatch<SetStateAction<TaskProps>>,
  updatedTaskTitle: string | undefined = undefined
) => {
  setter((task: TaskProps) => ({
    title: updatedTaskTitle !== undefined ? updatedTaskTitle : task.title,
    started: true,
    done: true,
  }));
};

export const task = { start, update, end };
