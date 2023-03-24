import { cat } from "../combinators/cat";
import { char } from "../primitives/char";
import { ParserInput } from "../types/ParseInput";
import { ParserOutput } from "../types/ParserOutput";
import { map } from "../utils/map";
import { str } from "../utils/str";
import { whitespace } from "../utils/whitespace";
import { string } from "./string";
import { variable } from "./variable";

export type Export = {
  name: string;
  target: string;
};

export function _export(input: ParserInput): ParserOutput<Export> {
  return map(
    cat([
      char("("),
      str("export"),
      whitespace,
      string,
      whitespace,
      char("("),
      str("func"),
      whitespace,
      variable,
      char(")"),
      char(")"),
    ]),
    ([, , , name, , , , , target]) => ({
      name,
      target,
    }),
  )(input);
}
