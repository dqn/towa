import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { str } from "../utils/str.js";

export type ValueType = "i32";

export function valueType(input: ParserInput): ParserOutput<ValueType> {
  return str("i32")(input);
}
