import type { ParserInput } from "../types/ParseInput";
import type { ParserOutput } from "../types/ParserOutput";

export function eof(input: ParserInput): ParserOutput<null> {
  if (input.length === 0) {
    return {
      success: true,
      data: null,
      rest: [],
    };
  }

  return {
    success: false,
  };
}
