import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { map } from "../utils/map.js";
import { str } from "../utils/str.js";

export type I32Add = {
  type: "i32.add";
};

export function i32Add(input: ParserInput): ParserOutput<I32Add> {
  return map(str("i32.add"), (type) => ({ type }))(input);
}
