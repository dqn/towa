import { is } from "../primitives/is";
import type { Digit } from "../types/Digit";
import type { ParserInput } from "../types/ParseInput";
import type { ParserOutput } from "../types/ParserOutput";

export function digit(input: ParserInput): ParserOutput<Digit> {
  return is((c): c is Digit => /^\d$/.test(c))(input);
}
