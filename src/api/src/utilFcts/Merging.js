import execa from "execa";

export default async function merging(command, option) {
  await execa(command, option, {
    cwd: "./src/api/processing/",
    shell: true,
  });
}
