import { unwrap } from "../../utils/unwrap";
import type { ParserInput } from "../types/ParseInput";
import type { ParserOutput } from "../types/ParserOutput";

export function anyChar(input: ParserInput): ParserOutput<string> {
  if (input.length === 0) {
    return { success: false };
  }

  const [data, ...rest] = input;

  return {
    success: true,
    data: unwrap(data, "data"),
    rest,
  };
}
