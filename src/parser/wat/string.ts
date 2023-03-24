import { cat } from "../combinators/cat.js";
import { rep } from "../combinators/rep.js";
import { anyChar } from "../primitives/anyChar.js";
import { char } from "../primitives/char.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { diff } from "../utils/diff.js";
import { map } from "../utils/map.js";

export function string(input: ParserInput): ParserOutput<string> {
  return map(
    cat([char('"'), rep(diff(anyChar, char('"'))), char('"')]),
    ([, splitted]) => splitted.join(""),
  )(input);
}
