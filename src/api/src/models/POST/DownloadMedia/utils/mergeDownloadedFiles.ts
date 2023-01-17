import {
  mergeVideoFrags,
  mergeAudioFrags,
  mergeVideoWithAudio,
} from "./tasks/merging";
import { deleteFragsFiles, deletePartsFiles } from "./tasks/deleting";

export default async function mergeDownloadedFiles(
  vodTitle: string,
  outputPath: string
) {
  await mergeVideoFrags(outputPath);
  await mergeAudioFrags(outputPath);
  await deleteFragsFiles(outputPath);
  await mergeVideoWithAudio(outputPath, vodTitle);
  await deletePartsFiles(outputPath);
}
