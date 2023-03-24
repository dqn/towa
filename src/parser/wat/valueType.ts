import { ParserInput } from "../types/ParseInput";
import { ParserOutput } from "../types/ParserOutput";
import { str } from "../utils/str";

export type ValueType = "i32";

export function valueType(input: ParserInput): ParserOutput<ValueType> {
  return str("i32")(input);
}
