import type { ParserInput } from "../types/ParseInput";
import type { ParserOutput } from "../types/ParserOutput";
import { anyChar } from "./anyChar";

export function char<T extends string>(
  c: T,
): (input: ParserInput) => ParserOutput<T> {
  return (input) => {
    const r = anyChar(input);

    if (!r.success) {
      return r;
    }

    if (r.data !== c) {
      return {
        success: false,
      };
    }

    return {
      success: true,
      data: c,
      rest: r.rest,
    };
  };
}
