import type { ParserInput } from "../types/ParseInput";
import type { ParserOutput } from "../types/ParserOutput";
import { anyChar } from "./anyChar";

export function is<T extends string>(
  f: (c: string) => c is T,
): (input: ParserInput) => ParserOutput<T> {
  return (input) => {
    const r = anyChar(input);

    if (!r.success) {
      return r;
    }

    if (!f(r.data)) {
      return {
        success: false,
      };
    }

    return {
      success: true,
      data: r.data,
      rest: r.rest,
    };
  };
}
