import { cat } from "../combinators/cat";
import { or } from "../combinators/or";
import { rep } from "../combinators/rep";
import { char } from "../primitives/char";
import { ParserInput } from "../types/ParseInput";
import { ParserOutput } from "../types/ParserOutput";
import { alpha } from "../utils/alpha";
import { digit } from "../utils/digit";
import { map } from "../utils/map";

export function variable(input: ParserInput): ParserOutput<string> {
  return map(
    cat([char("$"), alpha, rep(or([alpha, digit]))]),
    ([, head, splitted]) => head + splitted.join(""),
  )(input);
}
