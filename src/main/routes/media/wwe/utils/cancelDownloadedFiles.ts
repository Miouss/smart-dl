import {
  deleteFrags,
  deleteParts,
  deleteSource,
} from "./tasks/deleting";

export default async function cancelDownloadedFiles(
  saveLocation: string,
  vodTitle: string
) {
  await deleteFrags(saveLocation);
  await deleteParts(saveLocation);
  await deleteSource(saveLocation, vodTitle);
}
