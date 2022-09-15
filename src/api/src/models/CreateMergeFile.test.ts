import createMergeFile from "./CreateMergeFile";
import fsPromises from "fs/promises";

type MediaExtension = "ts" | "aac";

const outputPath = "./src/api/src/testData/downloadVodPlaylist/testOuput";
let extension: MediaExtension;

describe("CreateMergeFile", () => {
  it("should create the correct video merge file", async () => {
    extension = "ts";

    const videoUrlList = [];

    for (let i = 0; i < 37; i++) {
      videoUrlList.push(`./src/api/src/testData/${i}.ts`);
    }

    await createMergeFile(
      "listVideoTest",
      videoUrlList,
      outputPath,
      extension,
      true
    );

    const testMergeFileContent = await fsPromises.readFile(
      "src/api/src/testData/downloadVodPlaylist/testOuput/listVideoTest.txt",
      { encoding: "utf8" }
    );

    let correctMergeFileContent = "";

    for (let i = 0; i < 37; i++) {
      correctMergeFileContent += `file '${outputPath}/${i}.${extension}'\n`;
    }

    expect(testMergeFileContent).toMatch(correctMergeFileContent);
  });

  it("should create the correct audio merge file", async () => {
    extension = "aac";

    const videoUrlList = [];

    for (let i = 0; i < 37; i++) {
      videoUrlList.push(`./src/api/src/testData/${i}.aac`);
    }

    await createMergeFile(
      "listAudioTest",
      videoUrlList,
      "./src/api/src/testData/downloadVodPlaylist/testOuput",
      "aac",
      true
    );

    const testMergeFileContent = await fsPromises.readFile(
      "src/api/src/testData/downloadVodPlaylist/testOuput/listAudioTest.txt",
      { encoding: "utf8" }
    );

    let correctMergeFileContent = "";

    for (let i = 0; i < 37; i++) {
      correctMergeFileContent += `file '${outputPath}/${i}.${extension}'\n`;
    }

    expect(testMergeFileContent).toMatch(correctMergeFileContent);
  });
});
