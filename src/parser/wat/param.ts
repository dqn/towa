import { cat } from "../combinators/cat";
import { char } from "../primitives/char";
import { ParserInput } from "../types/ParseInput";
import { ParserOutput } from "../types/ParserOutput";
import { map } from "../utils/map";
import { str } from "../utils/str";
import { whitespace } from "../utils/whitespace";
import { ValueType, valueType } from "./valueType";
import { variable } from "./variable";

export type Param = {
  type: ValueType;
  name: string;
};

export function param(input: ParserInput): ParserOutput<Param> {
  return map(
    cat([
      char("("),
      str("param"),
      whitespace,
      variable,
      whitespace,
      valueType,
      char(")"),
    ]),
    ([, , , name, , type]) => ({
      type,
      name,
    }),
  )(input);
}
