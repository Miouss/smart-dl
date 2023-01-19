import { mergeVideo, mergeAudio, mergeParts } from "./tasks/merging";
import { deleteFrags, deleteParts } from "./tasks/deleting";

export default async function mergeDownloadedFiles(
  vodTitle: string,
  saveLocation: string
) {
  await mergeVideo(saveLocation);
  await mergeAudio(saveLocation);
  await deleteFrags(saveLocation);
  await mergeParts(saveLocation, vodTitle);
  await deleteParts(saveLocation);
}
