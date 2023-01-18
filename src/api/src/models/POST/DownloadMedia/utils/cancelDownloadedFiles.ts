import {
  deleteFrags,
  deleteParts,
  deleteSource,
} from "./tasks/deleting";

export default async function cancelDownloadedFiles(
  outputPath: string,
  vodTitle: string
) {
  await deleteFrags(outputPath);
  await deleteParts(outputPath);
  await deleteSource(outputPath, vodTitle);
}
