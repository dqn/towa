import { ParserInput } from "../types/ParseInput";
import { ParserOutput } from "../types/ParserOutput";
import { map } from "../utils/map";
import { str } from "../utils/str";

export type I32Add = {
  type: "i32.add";
};

export function i32Add(input: ParserInput): ParserOutput<I32Add> {
  return map(str("i32.add"), (type) => ({ type }))(input);
}
