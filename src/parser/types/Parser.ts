import type { ParserInput } from "./ParseInput";
import type { ParserOutput } from "./ParserOutput";

export type Parser<T> = (input: ParserInput) => ParserOutput<T>;
