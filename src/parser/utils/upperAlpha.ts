import { is } from "../primitives/is";
import type { ParserInput } from "../types/ParseInput";
import type { ParserOutput } from "../types/ParserOutput";
import type { UpperAlphabet } from "../types/UpperAlphabet";

export function upperAlpha(input: ParserInput): ParserOutput<UpperAlphabet> {
  return is((c): c is UpperAlphabet => /^[A-Z]$/.test(c))(input);
}
