import { cat } from "../combinators/cat.js";
import { char } from "../primitives/char.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { map } from "../utils/map.js";
import { str } from "../utils/str.js";
import { whitespace } from "../utils/whitespace.js";
import { identifier } from "./identifier.js";
import { int } from "./int.js";
import { ValueType, valueType } from "./valueType.js";

export type Declaration = {
  kind: "declaration";
  name: string;
  type: ValueType;
  value: number;
};

export function declaration(input: ParserInput): ParserOutput<Declaration> {
  return map(
    cat([
      str("const"),
      whitespace,
      identifier,
      whitespace,
      char(":"),
      whitespace,
      valueType,
      whitespace,
      char("="),
      whitespace,
      int,
      whitespace,
      char(";"),
    ]),
    ([, , name, , , , type, , , , value]): Declaration => ({
      kind: "declaration",
      name,
      type,
      value,
    }),
  )(input);
}
