import { rep } from "../combinators/rep";
import type { Option } from "../types/Option";
import type { ParserInput } from "../types/ParseInput";
import type { Parser } from "../types/Parser";
import type { ParserOutput } from "../types/ParserOutput";

export function opt<T>(
  p: Parser<T>,
): (input: ParserInput) => ParserOutput<Option<T>> {
  return (input) => {
    const r = rep(p, 0, 1)(input);

    if (!r.success) {
      return r;
    }

    return {
      success: true,
      data:
        r.data.length === 0
          ? { status: "none" }
          : { status: "some", value: r.data[0] as T },
      rest: r.rest,
    };
  };
}
