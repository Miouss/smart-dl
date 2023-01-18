interface TaskProps {
  title: string
  started: {
    isStarted: boolean;
    title: string;
  };
  done: {
    isDone: boolean;
    title: string;
  };
}

export { TaskProps };
