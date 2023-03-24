import { cat } from "../combinators/cat";
import { not } from "../combinators/not";
import type { ParserInput } from "../types/ParseInput";
import type { Parser } from "../types/Parser";
import type { ParserOutput } from "../types/ParserOutput";
import { map } from "./map";

export function diff<T, U>(
  p: Parser<T>,
  q: Parser<U>,
): (input: ParserInput) => ParserOutput<T> {
  return map(cat([not(q), p]), ([, r]) => r);
}
