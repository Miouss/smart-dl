import getWindow from "../../../index";
import merging from "../utils/Merging";

export const mergingTask = async (
  taskTitle: string,
  mergingInstruction: string[],
  startEvent: string,
  endEvent: string
) => {
  const windowWebContents = getWindow().webContents;
  console.log(taskTitle);
  windowWebContents.send(startEvent);
  await merging("ffmpeg", mergingInstruction);
  windowWebContents.send(endEvent);
};

export const deletingTask = async (
  taskTitle: string,
  mergingFile: string,
  outputPath: string,
  startEvent: string,
  endEvent: string
) => {
  const windowWebContents = getWindow().webContents;
  console.log(taskTitle);
  windowWebContents.send(startEvent);
  await merging(`${mergingFile}.bat`, [`${outputPath}`]);
  windowWebContents.send(endEvent);
};
