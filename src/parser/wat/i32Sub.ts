import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { map } from "../utils/map.js";
import { str } from "../utils/str.js";

export type I32Sub = {
  type: "i32.sub";
};

export function i32Sub(input: ParserInput): ParserOutput<I32Sub> {
  return map(str("i32.sub"), (type) => ({ type }))(input);
}
