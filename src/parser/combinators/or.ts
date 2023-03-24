import type { ParserInput } from "../types/ParseInput";
import type { Parser } from "../types/Parser";
import type { ParserOutput } from "../types/ParserOutput";

export function or<T>(
  ps: readonly Parser<T>[],
): (input: ParserInput) => ParserOutput<T> {
  return (input) => {
    for (const p of ps) {
      const r = p(input);

      if (r.success) {
        return r;
      }
    }

    return {
      success: false,
    };
  };
}
