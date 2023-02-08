import { promises } from "fs";

import { PROCESSING_FOLDER } from "../../../../constants/constants";

export default async function saveNbFiles(nbfiles: number) {
  await promises.writeFile(`${PROCESSING_FOLDER}/number.txt`, `${nbfiles}`, {
    flag: "w",
  });
}
