import { cat } from "../combinators/cat.js";
import { char } from "../primitives/char.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { map } from "../utils/map.js";
import { str } from "../utils/str.js";
import { whitespace } from "../utils/whitespace.js";
import { ValueType, valueType } from "./valueType.js";

export type Result = {
  type: ValueType;
};

export function result(input: ParserInput): ParserOutput<Result> {
  return map(
    cat([char("("), str("result"), whitespace, valueType, char(")")]),
    ([, , , type]) => ({ type }),
  )(input);
}
