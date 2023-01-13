import { mergingTask, deletingTask } from "../tasks/tasks";

export default async function handleMerging(
  vodTitle: string,
  outputPath: string
) {
  const mergingVideoFrags = [
    "-y",
    "-safe",
    "0",
    "-f",
    "concat",
    "-i",
    "listVideo.txt",
    "-c",
    "copy",
    `${outputPath}\\output.ts`,
  ];

  const mergingAudioFrags = [
    "-y",
    "-safe",
    "0",
    "-f",
    "concat",
    "-i",
    "listAudio.txt",
    "-c",
    "copy",
    `${outputPath}\\output.aac`,
  ];

  const mergingVideoWithAudio = [
    "-y",
    "-i",
    `${outputPath}\\output.ts`,
    "-i",
    `${outputPath}\\output.aac`,
    "-c",
    "copy",
    `"${outputPath}\\${vodTitle
      // eslint-disable-next-line no-useless-escape
      .replace(/[\/]/g, "-")
      // eslint-disable-next-line no-useless-escape
      .replace(/[\/\\:*?"<>]/g, "")}".mp4`,
  ];

try{
  await mergingTask(
    "Merging Video Fragments",
    mergingVideoFrags,
    "merging-video-starts",
    "merging-video-ends"
  );
  await mergingTask(
    "Merging Audio Fragments",
    mergingAudioFrags,
    "merging-audio-starts",
    "merging-audio-ends"
  );
  await deletingTask(
    "Deleting Video & Audio Fragments",
    "del-frags-src",
    outputPath,
    "deleting-frags-starts",
    "deleting-frags-ends"
  );
  await mergingTask(
    "Merging Video with Audio",
    mergingVideoWithAudio,
    "merging-parts-starts",
    "merging-parts-ends"
  );
  await deletingTask(
    "Deleting Video and Audio Parts",
    "del-parts-src",
    outputPath,
    "deleting-parts-starts",
    "deleting-parts-ends"
  );
}catch(err){
  //
}
}
