import { MediaExtension } from "../types";
import { deleteFrags, deleteParts, deleteSource } from "./tasks/deleting";

export default async function cancelDownloadedFiles(
  saveLocation: string,
  vodTitle: string,
  ext: MediaExtension
) {
  await deleteFrags(saveLocation, ext);
  await deleteParts(saveLocation, ext);
  await deleteSource(saveLocation, vodTitle);
}
