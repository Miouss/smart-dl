import Listr from "listr";
import { deletingTask } from "../tasks/tasks";

export default async function handleCanceling(outputPath: string) {
  const deletingList = new Listr([
    deletingTask(
      "Deleting Video & Audio Fragments",
      "del-frag-src",
      outputPath,
      "deleting-frags-starts",
      "deleting-frags-ends"
    ),
    deletingTask(
      "Deleting Video & Audio Fragments",
      "del-frag-src",
      outputPath,
      "deleting-frags-starts",
      "deleting-frags-ends"
    ),
  ]);

  await deletingList.run();
}
