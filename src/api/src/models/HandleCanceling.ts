import Listr from "listr";
import { deletingTask } from "../tasks/tasks";

export default async function handleCanceling(outputPath: string) {
  const deletingList = new Listr([
    deletingTask(
      "Deleting Video & Audio Fragments",
      "del-frags-src",
      outputPath,
      "deleting-frags-starts",
      "deleting-frags-ends"
    ),
    deletingTask(
      "Deleting Video & Audio Fragments",
      "del-parts-src",
      outputPath,
      "deleting-parts-starts",
      "deleting-parts-ends"
    ),
  ]);

  await deletingList.run();
}
