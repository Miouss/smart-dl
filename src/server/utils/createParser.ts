import { Parser } from "m3u8-parser";

export function createParser(data: string) {
  const parser = new Parser();
  parser.push(data);
  parser.end();

  return parser;
}
