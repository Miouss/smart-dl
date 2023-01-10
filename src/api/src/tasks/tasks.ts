import getWindow from "../../../index";
import merging from "../utils/Merging";

export const mergingTask = (
  taskTitle: string,
  mergingInstruction: string[],
  startEvent: string,
  endEvent: string
) => {
  const windowWebContents = getWindow().webContents;

  return {
    title: taskTitle,
    task: async () => {
      windowWebContents.send(startEvent);
      await merging("ffmpeg", mergingInstruction);
      windowWebContents.send(endEvent);
    },
  };
};

export const deletingTask = (
  taskTitle: string,
  mergingFile: string,
  outputPath: string,
  startEvent: string,
  endEvent: string
) => {
  const windowWebContents = getWindow().webContents;

  return {
    title: taskTitle,
    task: async () => {
      windowWebContents.send(startEvent);
      await merging(`${mergingFile}.bat`, [`${outputPath}`]);
      windowWebContents.send(endEvent);
    },
  };
};
