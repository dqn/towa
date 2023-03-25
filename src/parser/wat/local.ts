import { cat } from "../combinators/cat.js";
import { char } from "../primitives/char.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { map } from "../utils/map.js";
import { opt } from "../utils/opt.js";
import { str } from "../utils/str.js";
import { whitespace } from "../utils/whitespace.js";
import { ValueType, valueType } from "./valueType.js";
import { variable } from "./variable.js";

export type Local = {
  type: ValueType;
  name: null | string;
};

export function local(input: ParserInput): ParserOutput<Local> {
  return map(
    cat([
      char("("),
      whitespace,
      str("local"),
      whitespace,
      opt(cat([variable, whitespace])),
      valueType,
      whitespace,
      char(")"),
    ]),
    ([, , , , maybeNameWithWs, type]) => ({
      type,
      name: maybeNameWithWs.status === "some" ? maybeNameWithWs.value[0] : null,
    }),
  )(input);
}
