import type { ParserInput } from "./ParseInput";

export type ParseSuccess<T> = {
  success: true;
  data: T;
  rest: ParserInput;
};
