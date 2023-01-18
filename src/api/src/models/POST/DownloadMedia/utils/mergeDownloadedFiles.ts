import { mergeVideo, mergeAudio, mergeParts } from "./tasks/merging";
import { deleteFrags, deleteParts } from "./tasks/deleting";

export default async function mergeDownloadedFiles(
  vodTitle: string,
  outputPath: string
) {
  await mergeVideo(outputPath);
  await mergeAudio(outputPath);
  await deleteFrags(outputPath);
  await mergeParts(outputPath, vodTitle);
  await deleteParts(outputPath);
}
