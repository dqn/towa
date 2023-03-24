import { cat } from "../combinators/cat";
import { char } from "../primitives/char";
import { ParserInput } from "../types/ParseInput";
import { ParserOutput } from "../types/ParserOutput";
import { map } from "../utils/map";
import { str } from "../utils/str";
import { whitespace } from "../utils/whitespace";
import { ValueType, valueType } from "./valueType";

export type Result = {
  type: ValueType;
};

export function result(input: ParserInput): ParserOutput<Result> {
  return map(
    cat([char("("), str("result"), whitespace, valueType, char(")")]),
    ([, , , type]) => ({ type }),
  )(input);
}
