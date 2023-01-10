import execa from "execa";

export default async function merging(command: string, option: Array<string>) {
  await execa(command, option, {
    cwd: "./src/api/processing/",
    shell: true,
  });
}
