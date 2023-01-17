import {
  deleteFragsFiles,
  deletePartsFiles,
  deleteFullFile,
} from "./tasks/deleting";

export default async function handleCanceling(
  outputPath: string,
  vodTitle: string
) {
  await deleteFragsFiles(outputPath);
  await deletePartsFiles(outputPath);
  await deleteFullFile(outputPath, vodTitle);
}
