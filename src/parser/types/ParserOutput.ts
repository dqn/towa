import type { ParseFail } from "./ParseFail";
import type { ParseSuccess } from "./ParseSuccess";

export type ParserOutput<T> = ParseSuccess<T> | ParseFail;
