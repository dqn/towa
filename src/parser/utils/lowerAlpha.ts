import { is } from "../primitives/is";
import type { LowerAlphabet } from "../types/LowerAlphabet";
import type { ParserInput } from "../types/ParseInput";
import type { ParserOutput } from "../types/ParserOutput";

export function lowerAlpha(input: ParserInput): ParserOutput<LowerAlphabet> {
  return is((c): c is LowerAlphabet => /^[a-z]$/.test(c))(input);
}
