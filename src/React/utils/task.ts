import { Dispatch, SetStateAction } from "react";

import { Task } from "../../types/Task";

const start = (
  setter: Dispatch<SetStateAction<Task>>,
  updatedTaskTitle: string | undefined = undefined
) => {
  setter((task: Task) => ({
    title: updatedTaskTitle !== undefined ? updatedTaskTitle : task.title,
    started: true,
    done: false,
  }));
};

const update = (setter: Dispatch<SetStateAction<Task>>, taskTitle: string) => {
  setter({
    title: taskTitle,
    started: true,
    done: false,
  });
};

const end = (
  setter: Dispatch<SetStateAction<Task>>,
  updatedTaskTitle: string | undefined = undefined
) => {
  setter((task: Task) => ({
    title: updatedTaskTitle !== undefined ? updatedTaskTitle : task.title,
    started: true,
    done: true,
  }));
};

export const task = { start, update, end };
