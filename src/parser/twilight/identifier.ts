import { cat } from "../combinators/cat.js";
import { or } from "../combinators/or.js";
import { rep } from "../combinators/rep.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { alpha } from "../utils/alpha.js";
import { digit } from "../utils/digit.js";
import { map } from "../utils/map.js";

export function identifier(input: ParserInput): ParserOutput<string> {
  return map(
    cat([alpha, rep(or([alpha, digit]))]),
    ([head, splitted]) => head + splitted.join(""),
  )(input);
}
