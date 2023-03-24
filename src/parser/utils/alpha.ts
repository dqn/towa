import { is } from "../primitives/is";
import type { Alphabet } from "../types/Alphabet";
import type { ParserInput } from "../types/ParseInput";
import type { ParserOutput } from "../types/ParserOutput";

export function alpha(input: ParserInput): ParserOutput<Alphabet> {
  return is((c): c is Alphabet => /^[a-zA-Z]$/.test(c))(input);
}
