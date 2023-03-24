import { cat } from "../combinators/cat.js";
import { char } from "../primitives/char.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { map } from "../utils/map.js";
import { str } from "../utils/str.js";
import { whitespace } from "../utils/whitespace.js";
import { string } from "./string.js";
import { variable } from "./variable.js";

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
