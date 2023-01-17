import {
  deleteFragsFiles,
  deletePartsFiles,
  deleteFullFile,
} from "../../../../utils/Merging";

export default async function handleCanceling(
  outputPath: string,
  vodTitle: string
) {
  await deleteFragsFiles(outputPath);
  await deletePartsFiles(outputPath);
  await deleteFullFile(outputPath, vodTitle);
}
