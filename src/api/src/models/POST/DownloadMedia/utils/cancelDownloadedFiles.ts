import {
  deleteFragsFiles,
  deletePartsFiles,
  deleteFullFile,
} from "./tasks/deleting";

export default async function cancelDownloadedFiles(
  outputPath: string,
  vodTitle: string
) {
  await deleteFragsFiles(outputPath);
  await deletePartsFiles(outputPath);
  await deleteFullFile(outputPath, vodTitle);
}
