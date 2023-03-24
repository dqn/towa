import { or } from "../combinators/or";
import { rep } from "../combinators/rep";
import type { ParserInput } from "../types/ParseInput";
import type { ParserOutput } from "../types/ParserOutput";
import { map } from "./map";
import { char } from "../primitives/char";

export function whitespace(input: ParserInput): ParserOutput<null> {
  return map(rep(or([..."\t\n\r "].map(char))), () => null)(input);
}
