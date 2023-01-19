import { Dispatch, SetStateAction } from "react";

import type { TaskProps } from "../../../../../../types/Task";

const start = (setter: Dispatch<SetStateAction<TaskProps>>) => {
  setter((prevState: TaskProps) => ({
    title: prevState.started.title,
    started: {
      isStarted: true,
      title: prevState.started.title,
    },
    done: prevState.done,
  }));
};

const update = (
  setter: Dispatch<SetStateAction<TaskProps>>,
  taskTitle: string
) => {
  setter((prevState: TaskProps) => ({
    title: taskTitle,
    started: prevState.started,
    done: prevState.done,
  }));
};

const end = (setter: Dispatch<SetStateAction<TaskProps>>) => {
  setter((prevState: TaskProps) => ({
    title: prevState.done.title,
    started: prevState.started,
    done: {
      isDone: true,
      title: prevState.done.title,
    },
  }));
};

type Command = "start" | "end" | "update";

export function createTask(
  waitingTitle: string,
  startedTitle: string,
  doneTitle: string
) {
  return {
    title: waitingTitle,
    started: {
      isStarted: false,
      title: startedTitle,
    },
    done: {
      isDone: false,
      title: doneTitle,
    },
  };
}

export function action(
  command: Command,
  setTask: Dispatch<SetStateAction<TaskProps>>,
  setActiveStep?: Dispatch<SetStateAction<number>>,
  activeStep?: number
) {
  switch (command) {
    case "start":
      return () => {
        if (setActiveStep) setActiveStep(activeStep);
        start(setTask);
      };
    case "end":
      return () => {
        end(setTask);
        if (setActiveStep) setActiveStep(activeStep);
      };
    case "update":
      return (taskTitle: string) => {
        update(setTask, taskTitle);
      };
  }
}
