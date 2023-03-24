import { cat } from "../combinators/cat";
import { rep } from "../combinators/rep";
import { anyChar } from "../primitives/anyChar";
import { char } from "../primitives/char";
import { ParserInput } from "../types/ParseInput";
import { ParserOutput } from "../types/ParserOutput";
import { diff } from "../utils/diff";
import { map } from "../utils/map";

export function string(input: ParserInput): ParserOutput<string> {
  return map(
    cat([char('"'), rep(diff(anyChar, char('"'))), char('"')]),
    ([, splitted]) => splitted.join(""),
  )(input);
}
